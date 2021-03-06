"""
Miscellaneous functions for Sefaria.
"""
from HTMLParser import HTMLParser
import re


# also at JaggedArray.depth().  Still needed?
def list_depth(x, deep=False):
    """
    returns 1 for [], 2 for [[]], etc.
    :parm x - a list
    :param deep - whether or not to count a level when not all elements in
    that level are lists.
    e.g. [[], ""] has a list depth of 1 with depth=False, 2 with depth=True
    """
    if isinstance(x, int):
        return 0
    elif len(x) > 0 and (deep or all(map(lambda y: isinstance(y, list), x))):
        return 1 + max([list_depth(y, deep=deep) for y in x])
    else:
        return 1

# Moving to JaggedArray.flattenToArray()
def flatten_jagged_array(jagged):
    """
    Returns a 1D list of each terminal element in a jagged array.
    """
    flat = []
    for el in jagged:
        if isinstance(el, list):
            flat = flat + flatten_jagged_array(el)
        else:
            flat.append(el)

    return flat


def is_text_empty(text):
    """
    Returns true if a jagged array 'test' is emtpy or contains
    only "" or 0.
    """
    text = flatten_jagged_array(text)

    text = [t if t != 0 else "" for t in text]
    return not len("".join(text))


def rtrim_jagged_string_array(ja):
    """
    Returns a jagged string array corresponding to ja with any
    trailing Falsey values in any subsection removed.
    """
    if not isinstance(ja, list):
        return ja
    while len(ja) and not ja[-1]:
        ja.pop() # Remove any trailing Falsey values ("", 0, False)
    return [rtrim_jagged_string_array(j) for j in ja]


def union(a, b):
    """ return the union of two lists """
    return list(set(a) | set(b))


class MLStripper(HTMLParser):
    def __init__(self):
        self.reset()
        self.fed = []
    def handle_data(self, d):
        self.fed.append(d)
    def get_data(self):
        return ' '.join(self.fed)


def strip_tags(html):
    """
    Returns the text of html with tags stripped.
    Customized to insert a space between adjacent tags after stripping.
    """
    html = html or ""
    s = MLStripper()
    s.feed(html)
    return s.get_data()


def text_preview(en, he):
    """
    Returns a jagged array terminating in dicts like {'he': '', 'en': ''} which offers preview
    text merging what's available in jagged string arrays 'en' and 'he'.
    """
    n_chars = 80
    en = [en] if isinstance(en, basestring) else [""] if en == [] or not isinstance(en, list) else en
    he = [he] if isinstance(he, basestring) else [""] if he == [] or not isinstance(he, list) else he

    def preview(section):
        """Returns a preview string for list section"""
        section =[s for s in section if isinstance(s, basestring)]
        section = " ".join(map(unicode, section))
        return strip_tags(section[:n_chars]).strip()

    if not any(isinstance(x, list) for x in en + he):
        return {'en': preview(en), 'he': preview(he)}
    else:
        zipped = map(None, en, he)
        return [text_preview(x[0], x[1]) for x in zipped]


def string_overlap(text1, text2):
    """
    Returns the number of characters that the end of text1 overlaps the beginning of text2.
    https://neil.fraser.name/news/2010/11/04/
    """
    # Cache the text lengths to prevent multiple calls.
    text1_length = len(text1)
    text2_length = len(text2)
    # Eliminate the null case.
    if text1_length == 0 or text2_length == 0:
        return 0
    # Truncate the longer string.
    if text1_length > text2_length:
        text1 = text1[-text2_length:]
    elif text1_length < text2_length:
        text2 = text2[:text1_length]
    # Quick check for the worst case.
    if text1 == text2:
        return min(text1_length, text2_length)
 
    # Start by looking for a single character match
    # and increase length until no match is found.
    best = 0
    length = 1
    while True:
        pattern = text1[-length:]
        found = text2.find(pattern)
        if found == -1:
            return best
        length += found
        if text1[-length:] == text2[:length]:
            best = length
            length += 1


def td_format(td_object):
    """
    Turn a timedelta object into a nicely formatted string.
    """
    seconds = int(td_object.total_seconds())
    periods = [
            ('year',        60*60*24*365),
            ('month',       60*60*24*30),
            ('day',         60*60*24),
            ('hour',        60*60),
            ('minute',      60),
            ('second',      1)
            ]

    strings=[]
    for period_name,period_seconds in periods:
            if seconds > period_seconds:
                    period_value , seconds = divmod(seconds,period_seconds)
                    if period_value == 1:
                            strings.append("%s %s" % (period_value, period_name))
                    else:
                            strings.append("%s %ss" % (period_value, period_name))

    return ", ".join(strings)


def replace_using_regex(regex, query, old, new, endline=None):
    """
    This is an enhancement of str.replace(). It will only call str.replace if the regex has
    been found, thus allowing replacement of tags that may serve multiple or ambiguous functions.
    Should there be a need, an endline parameter can be added which will be appended to the end of
    the string
    :param regex: A regular expression. Will be compiled locally.
    :param query: The input string to be examined.
    :param old: The text to be replaced.
    :param new: The text that will be inserted instead of 'old'.
    :param endline: An optional argument that can be appended to the end of the string.
    :return: A new string with 'old' replaced by 'new'.
    """

    # compile regex and search
    reg = re.compile(regex)
    result = re.search(reg, query)
    if result:

        # get all instances of match
        matches = re.findall(reg, query)
        for match in matches:
            temp = match.replace(old, new)
            query = query.replace(match, temp)
        if endline is not None:
            query.replace(u'\n', endline+u'\n')
    return query


def count_by_regex(some_file, regex):
    """
    After OCR, text files are returned with many tags, the meaning of which may not be clear or ambiguous.
    Even if the meaning of each tag is known it can be useful to know how many times each tag appears, as
    errors may have arisen during the scanning and OCR. By using a regular expression to search, entire
    documents can be scanned quickly and efficiently.

    :param some_file: A file to be scanned.
    :param regex: The regex to be used
    :return: A dictionary where the keys are all the strings that match the regex and the values are the
    number of times each one appears.
    """

    # instantiate a dictionary to hold results
    result = {}

    # compile regex
    reg = re.compile(regex)

    # loop through file
    for line in some_file:

        # search for regex
        found = re.findall(reg, line)

        # count instances found
        for item in found:
            if item not in result:
                result[item] = 1
            else:
                result[item] += 1
    return result