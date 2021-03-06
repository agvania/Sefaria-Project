"""
Djagno Context Processors, for decorating all HTTP request with common data.
"""
import json
from datetime import datetime

from django.template.loader import render_to_string

from sefaria.settings import *
from sefaria.model import library
from sefaria.model.user_profile import UserProfile
from sefaria.utils import calendars
from reader.views import render_react_component


def global_settings(request):
    return {
        "SEARCH_URL":             SEARCH_HOST,
        "SEARCH_INDEX_NAME":      SEARCH_INDEX_NAME,
        "GOOGLE_ANALYTICS_CODE":  GOOGLE_ANALYTICS_CODE,
        "MIXPANEL_CODE":          MIXPANEL_CODE,
        "DEBUG":                  DEBUG,
        "OFFLINE":                OFFLINE,
        "GLOBAL_WARNING":         GLOBAL_WARNING,
        "GLOBAL_WARNING_MESSAGE": GLOBAL_WARNING_MESSAGE,
        "S2":                     not request.COOKIES.get('s1', False),
        #"USE_VARNISH":            USE_VARNISH,
        #"VARNISH_ADDR":           VARNISH_ADDR,
        #"USE_VARNISH_ESI":        USE_VARNISH_ESI
        }


def titles_json(request):
    return {"titlesJSON": library.get_text_titles_json()}


def toc(request):
    return {"toc": library.get_toc(), "toc_json": library.get_toc_json()}


def embed_page(request):
    return {"EMBED": "embed" in request.GET}


def language_settings(request):

    # CONTENT
    # Pull language setting from cookie or Accept-Lanugage header or default to english
    content = request.COOKIES.get('contentLang') or request.LANGUAGE_CODE or 'english'
    # URL parameter trumps cookie
    content = request.GET.get("lang", content)
    content = "bilingual" if content in ("bi", "he-en", "en-he") else content
    content = 'hebrew' if content in ('he', 'he-il') else content
    content = "english" if content in ('en') else content
    # Don't allow languages other than what we currently handle
    content = 'english' if content not in ('english', 'hebrew', 'bilingual') else content

    # INTERFACE
    interface = None
    if request.user.is_authenticated():
        profile = UserProfile(id=request.user.id)
        interface = profile.settings["interface_language"] if "interface_language" in profile.settings else None 
    if not interface: 
        # Pull language setting from cookie or Accept-Lanugage header or default to english
        interface = request.COOKIES.get('interfaceLang') or request.LANGUAGE_CODE or 'english'
        interface = 'hebrew' if interface in ('he', 'he-il') else interface
        # Don't allow languages other than what we currently handle
        interface = 'english' if interface not in ('english', 'hebrew') else interface

    return {"contentLang": content, "interfaceLang": interface}


def notifications(request):
    if not request.user.is_authenticated():
        if request.COOKIES.get("_ga", None) and not request.COOKIES.get("welcomeToS2LoggedOut", None):
            # Welcome returning visitors only to the new Sefaria. TODO this should be removed after some time.
            interrupting_message_json = json.dumps({
                "name": "welcomeToS2LoggedOut",
                "html": render_to_string("messages/welcomeToS2LoggedOut.html")
            })
        else:
            interrupting_message_json = "null"
        return {"interrupting_message_json": interrupting_message_json}
    
    profile = UserProfile(id=request.user.id)
    notifications = profile.recent_notifications()
    notifications_json = "[" + ",".join([n.to_JSON() for n in notifications]) + "]"
    interrupting_message = profile.interrupting_message()
    if interrupting_message:
        interrupting_message_json = json.dumps({"name": interrupting_message, "html": render_to_string("messages/%s.html" % interrupting_message)})
    else:
        interrupting_message_json = "null"
    return {
                "notifications": notifications, 
                "notifications_json": notifications_json,
                "notifications_html": notifications.to_HTML(),
                "notifications_count": profile.unread_notification_count(),
                "interrupting_message_json": interrupting_message_json,
            }


LOGGED_OUT_HEADER = None
LOGGED_IN_HEADER  = None
def header_html(request):
    """
    Uses React to prerender a logged in and and logged out header for use in pages that extend `base.html`.
    Cached in memory -- restarting Django is necessary for catch any HTML changes to header.
    """
    if request.path == "/data.js":
        return {}
    global LOGGED_OUT_HEADER, LOGGED_IN_HEADER
    if USE_NODE:
        LOGGED_OUT_HEADER = LOGGED_OUT_HEADER or render_react_component("ReaderApp", {"headerMode": True, "loggedIn": False})
        LOGGED_IN_HEADER = LOGGED_IN_HEADER or render_react_component("ReaderApp", {"headerMode": True, "loggedIn": True})
    else:
        LOGGED_OUT_HEADER = ""
        LOGGED_IN_HEADER = ""
    return {
        "logged_in_header": LOGGED_IN_HEADER,
        "logged_out_header": LOGGED_OUT_HEADER,
    }


def calendar_links(request):
    parasha  = calendars.this_weeks_parasha(datetime.now())
    daf      = calendars.daf_yomi(datetime.now())
    
    parasha_link  = "<a href='/%s'>%s: %s</a>" % (parasha["ref"], parasha["parasha"], parasha["ref"])
    haftara_link  = " ".join(["<a href='/%s'>%s</a>" % (h, h) for h in parasha["haftara"]])
    daf_yomi_link = "<a href='/%s'>%s</a>" % (daf["url"], daf["name"])

    return {
                "parasha_link":  parasha_link, 
                "haftara_link":  haftara_link,
                "daf_yomi_link": daf_yomi_link,
                "parasha_ref":   parasha["ref"],
                "parasha_name":  parasha["parasha"],
                "haftara_ref":   parasha["haftara"][0],
                "daf_yomi_ref":  daf["url"]
            }
