# Type correction
type = (obj) ->
  if obj == undefined or obj == null
    return String obj
  classToType = new Object
  for name in "Boolean Number String Function Array Date RegExp".split(" ")
    classToType["[object " + name + "]"] = name.toLowerCase()
  myClass = Object.prototype.toString.call obj
  if myClass of classToType
    return classToType[myClass]
  return "object"

# Base class
class XML

  constructor: (@tag, @content...) ->
    @isXMLObject = true
    @selfclose = off
    @attributes = null
    
    for index, arg of @content
      if type(arg) is 'object' and 'isXMLObject' not of arg
        @attributes = arg
        @content.splice index,1

    if @tag[-1..] is '/'
      @selfclose = on
      @tag = @tag[..-2]
      @content = ''
    # Attributes
    if not @attributes
      @attributes = {}    

    @refresh()

  refresh: ->
    @create_property key, value for key, value of @attributes
    @create_tag c.tag, c for c in @content when type(c) is 'object'

  append: (obj, index) ->
    @content.splice index ? @content.length, 0, obj
    @refresh()

  remove: (index, ammount) ->
    @content.splice index, ammount ? 1
    @refresh()

  text: (str) ->
    if not str
      @content
    else if str
      @content = [str]

  create_property: (key, value) ->
    @[key] = (v) ->
      if v
        @attributes[key] = v
      else if not v
        @attributes[key]

  create_tag: (tag, xml_object) ->
    if tag of @
      if type(@[tag]) is 'array'
        @[tag].push xml_object
      else
        @[tag] = [@[tag], xml_object]
    else if tag not of @
      @[tag] = xml_object

  _convert_attributes: ->
    values = for key, value of @attributes
      value = if type(value) is 'array' then value.join " " else value
      if value then "#{key}=\"#{value}\"" else key
    # Remove ugly spacing
    values.splice 0, 0, ""
    @converted_attributes = if @attributes then "#{values.join " "}" else ""

  _convert_content: ->
    contents = for c in @content
      if type(c) is 'object' then c.xml() else c
    @converted_content = contents.join ' '

  xml: ->
    # Transform attributes
    @_convert_attributes()
    @_convert_content()
    # Render
    if @selfclose is on
      "<#{@tag}#{@converted_attributes}/>"
    else if @selfclose is off
      "<#{@tag}#{@converted_attributes}>#{@converted_content}</#{@tag}>"

class _A extends XML
  constructor: (args...) ->
    super "a", args...

A = (args...)->
  new _A args...

class _ABBR extends XML
  constructor: (args...) ->
    super "abbr", args...

ABBR = (args...)->
  new _ABBR args...

class _ACRONYM extends XML
  constructor: (args...) ->
    super "acronym", args...

ACRONYM = (args...)->
  new _ACRONYM args...

class _ADDRESS extends XML
  constructor: (args...) ->
    super "address", args...

ADDRESS = (args...)->
  new _ADDRESS args...

class _APPLET extends XML
  constructor: (args...) ->
    super "applet", args...

APPLET = (args...)->
  new _APPLET args...

class _AREA extends XML
  constructor: (args...) ->
    super "area/", args...

AREA = (args...)->
  new _AREA args...

class _ARTICLE extends XML
  constructor: (args...) ->
    super "article", args...

ARTICLE = (args...)->
  new _ARTICLE args...

class _ASIDE extends XML
  constructor: (args...) ->
    super "aside", args...

ASIDE = (args...)->
  new _ASIDE args...

class _AUDIO extends XML
  constructor: (args...) ->
    super "audio", args...

AUDIO = (args...)->
  new _AUDIO args...

class _B extends XML
  constructor: (args...) ->
    super "b", args...

B = (args...)->
  new _B args...

class _BASE extends XML
  constructor: (args...) ->
    super "base/", args...

BASE = (args...)->
  new _BASE args...

class _BASEFONT extends XML
  constructor: (args...) ->
    super "basefont", args...

BASEFONT = (args...)->
  new _BASEFONT args...

class _BDI extends XML
  constructor: (args...) ->
    super "bdi", args...

BDI = (args...)->
  new _BDI args...

class _BDO extends XML
  constructor: (args...) ->
    super "bdo", args...

BDO = (args...)->
  new _BDO args...

class _BGSOUND extends XML
  constructor: (args...) ->
    super "bgsound", args...

BGSOUND = (args...)->
  new _BGSOUND args...

class _BIG extends XML
  constructor: (args...) ->
    super "big", args...

BIG = (args...)->
  new _BIG args...

class _BLINK extends XML
  constructor: (args...) ->
    super "blink", args...

BLINK = (args...)->
  new _BLINK args...

class _BLOCKQUOTE extends XML
  constructor: (args...) ->
    super "blockquote", args...

BLOCKQUOTE = (args...)->
  new _BLOCKQUOTE args...

class _BODY extends XML
  constructor: (args...) ->
    super "body", args...

BODY = (args...)->
  new _BODY args...

class _BR extends XML
  constructor: (args...) ->
    super "br/", args...

BR = (args...)->
  new _BR args...

class _BUTTON extends XML
  constructor: (args...) ->
    super "button", args...

BUTTON = (args...)->
  new _BUTTON args...

class _CANVAS extends XML
  constructor: (args...) ->
    super "canvas", args...

CANVAS = (args...)->
  new _CANVAS args...

class _CAPTION extends XML
  constructor: (args...) ->
    super "caption", args...

CAPTION = (args...)->
  new _CAPTION args...

class _CENTER extends XML
  constructor: (args...) ->
    super "center", args...

CENTER = (args...)->
  new _CENTER args...

class _CITE extends XML
  constructor: (args...) ->
    super "cite", args...

CITE = (args...)->
  new _CITE args...

class _CODE extends XML
  constructor: (args...) ->
    super "code", args...

CODE = (args...)->
  new _CODE args...

class _COL extends XML
  constructor: (args...) ->
    super "col/", args...

COL = (args...)->
  new _COL args...

class _COLGROUP extends XML
  constructor: (args...) ->
    super "colgroup", args...

COLGROUP = (args...)->
  new _COLGROUP args...

class _CONTENT extends XML
  constructor: (args...) ->
    super "content", args...

CONTENT = (args...)->
  new _CONTENT args...

class _DATA extends XML
  constructor: (args...) ->
    super "data", args...

DATA = (args...)->
  new _DATA args...

class _DATALIST extends XML
  constructor: (args...) ->
    super "datalist", args...

DATALIST = (args...)->
  new _DATALIST args...

class _DD extends XML
  constructor: (args...) ->
    super "dd", args...

DD = (args...)->
  new _DD args...

class _DECORATOR extends XML
  constructor: (args...) ->
    super "decorator", args...

DECORATOR = (args...)->
  new _DECORATOR args...

class _DEL extends XML
  constructor: (args...) ->
    super "del", args...

DEL = (args...)->
  new _DEL args...

class _DETAILS extends XML
  constructor: (args...) ->
    super "details", args...

DETAILS = (args...)->
  new _DETAILS args...

class _DFN extends XML
  constructor: (args...) ->
    super "dfn", args...

DFN = (args...)->
  new _DFN args...

class _DIR extends XML
  constructor: (args...) ->
    super "dir", args...

DIR = (args...)->
  new _DIR args...

class _DIV extends XML
  constructor: (args...) ->
    super "div", args...

DIV = (args...)->
  new _DIV args...

class _DL extends XML
  constructor: (args...) ->
    super "dl", args...

DL = (args...)->
  new _DL args...

class _DT extends XML
  constructor: (args...) ->
    super "dt", args...

DT = (args...)->
  new _DT args...

class _ELEMENT extends XML
  constructor: (args...) ->
    super "element", args...

ELEMENT = (args...)->
  new _ELEMENT args...

class _EM extends XML
  constructor: (args...) ->
    super "em", args...

EM = (args...)->
  new _EM args...

class _EMBED extends XML
  constructor: (args...) ->
    super "embed/", args...

EMBED = (args...)->
  new _EMBED args...

class _FIELDSET extends XML
  constructor: (args...) ->
    super "fieldset", args...

FIELDSET = (args...)->
  new _FIELDSET args...

class _FIGCAPTION extends XML
  constructor: (args...) ->
    super "figcaption", args...

FIGCAPTION = (args...)->
  new _FIGCAPTION args...

class _FIGURE extends XML
  constructor: (args...) ->
    super "figure", args...

FIGURE = (args...)->
  new _FIGURE args...

class _FONT extends XML
  constructor: (args...) ->
    super "font", args...

FONT = (args...)->
  new _FONT args...

class _FOOTER extends XML
  constructor: (args...) ->
    super "footer", args...

FOOTER = (args...)->
  new _FOOTER args...

class _FORM extends XML
  constructor: (args...) ->
    super "form", args...

FORM = (args...)->
  new _FORM args...

class _FRAME extends XML
  constructor: (args...) ->
    super "frame", args...

FRAME = (args...)->
  new _FRAME args...

class _FRAMESET extends XML
  constructor: (args...) ->
    super "frameset", args...

FRAMESET = (args...)->
  new _FRAMESET args...

class _H1 extends XML
  constructor: (args...) ->
    super "h1", args...

H1 = (args...)->
  new _H1 args...

class _H2 extends XML
  constructor: (args...) ->
    super "h2", args...

H2 = (args...)->
  new _H2 args...

class _H3 extends XML
  constructor: (args...) ->
    super "h3", args...

H3 = (args...)->
  new _H3 args...

class _H4 extends XML
  constructor: (args...) ->
    super "h4", args...

H4 = (args...)->
  new _H4 args...

class _H5 extends XML
  constructor: (args...) ->
    super "h5", args...

H5 = (args...)->
  new _H5 args...

class _H6 extends XML
  constructor: (args...) ->
    super "h6", args...

H6 = (args...)->
  new _H6 args...

class _HEAD extends XML
  constructor: (args...) ->
    super "head", args...

HEAD = (args...)->
  new _HEAD args...

class _HEADER extends XML
  constructor: (args...) ->
    super "header", args...

HEADER = (args...)->
  new _HEADER args...

class _HGROUP extends XML
  constructor: (args...) ->
    super "hgroup", args...

HGROUP = (args...)->
  new _HGROUP args...

class _HR extends XML
  constructor: (args...) ->
    super "hr/", args...

HR = (args...)->
  new _HR args...

class _HTML extends XML
  constructor: (args...) ->
    super "html", args...

HTML = (args...)->
  new _HTML args...

class _I extends XML
  constructor: (args...) ->
    super "i", args...

I = (args...)->
  new _I args...

class _IFRAME extends XML
  constructor: (args...) ->
    super "iframe", args...

IFRAME = (args...)->
  new _IFRAME args...

class _IMG extends XML
  constructor: (args...) ->
    super "img/", args...

IMG = (args...)->
  new _IMG args...

class _INPUT extends XML
  constructor: (args...) ->
    super "input/", args...

INPUT = (args...)->
  new _INPUT args...

class _INS extends XML
  constructor: (args...) ->
    super "ins", args...

INS = (args...)->
  new _INS args...

class _ISINDEX extends XML
  constructor: (args...) ->
    super "isindex", args...

ISINDEX = (args...)->
  new _ISINDEX args...

class _KBD extends XML
  constructor: (args...) ->
    super "kbd", args...

KBD = (args...)->
  new _KBD args...

class _KEYGEN extends XML
  constructor: (args...) ->
    super "keygen/", args...

KEYGEN = (args...)->
  new _KEYGEN args...

class _LABEL extends XML
  constructor: (args...) ->
    super "label", args...

LABEL = (args...)->
  new _LABEL args...

class _LEGEND extends XML
  constructor: (args...) ->
    super "legend", args...

LEGEND = (args...)->
  new _LEGEND args...

class _LI extends XML
  constructor: (args...) ->
    super "li", args...

LI = (args...)->
  new _LI args...

class _LINK extends XML
  constructor: (args...) ->
    super "link/", args...

LINK = (args...)->
  new _LINK args...

class _LISTING extends XML
  constructor: (args...) ->
    super "listing", args...

LISTING = (args...)->
  new _LISTING args...

class _MAIN extends XML
  constructor: (args...) ->
    super "main", args...

MAIN = (args...)->
  new _MAIN args...

class _MAP extends XML
  constructor: (args...) ->
    super "map", args...

MAP = (args...)->
  new _MAP args...

class _MARK extends XML
  constructor: (args...) ->
    super "mark", args...

MARK = (args...)->
  new _MARK args...

class _MARQUEE extends XML
  constructor: (args...) ->
    super "marquee", args...

MARQUEE = (args...)->
  new _MARQUEE args...

class _MENU extends XML
  constructor: (args...) ->
    super "menu", args...

MENU = (args...)->
  new _MENU args...

class _MENUITEM extends XML
  constructor: (args...) ->
    super "menuitem", args...

MENUITEM = (args...)->
  new _MENUITEM args...

class _META extends XML
  constructor: (args...) ->
    super "meta/", args...

META = (args...)->
  new _META args...

class _METER extends XML
  constructor: (args...) ->
    super "meter", args...

METER = (args...)->
  new _METER args...

class _NAV extends XML
  constructor: (args...) ->
    super "nav", args...

NAV = (args...)->
  new _NAV args...

class _NOBR extends XML
  constructor: (args...) ->
    super "nobr", args...

NOBR = (args...)->
  new _NOBR args...

class _NOFRAMES extends XML
  constructor: (args...) ->
    super "noframes", args...

NOFRAMES = (args...)->
  new _NOFRAMES args...

class _NOSCRIPT extends XML
  constructor: (args...) ->
    super "noscript", args...

NOSCRIPT = (args...)->
  new _NOSCRIPT args...

class _OBJECT extends XML
  constructor: (args...) ->
    super "object", args...

OBJECT = (args...)->
  new _OBJECT args...

class _OL extends XML
  constructor: (args...) ->
    super "ol", args...

OL = (args...)->
  new _OL args...

class _OPTGROUP extends XML
  constructor: (args...) ->
    super "optgroup", args...

OPTGROUP = (args...)->
  new _OPTGROUP args...

class _OPTION extends XML
  constructor: (args...) ->
    super "option", args...

OPTION = (args...)->
  new _OPTION args...

class _OUTPUT extends XML
  constructor: (args...) ->
    super "output", args...

OUTPUT = (args...)->
  new _OUTPUT args...

class _P extends XML
  constructor: (args...) ->
    super "p", args...

P = (args...)->
  new _P args...

class _PARAM extends XML
  constructor: (args...) ->
    super "param/", args...

PARAM = (args...)->
  new _PARAM args...

class _PLAINTEXT extends XML
  constructor: (args...) ->
    super "plaintext", args...

PLAINTEXT = (args...)->
  new _PLAINTEXT args...

class _PRE extends XML
  constructor: (args...) ->
    super "pre", args...

PRE = (args...)->
  new _PRE args...

class _PROGRESS extends XML
  constructor: (args...) ->
    super "progress", args...

PROGRESS = (args...)->
  new _PROGRESS args...

class _Q extends XML
  constructor: (args...) ->
    super "q", args...

Q = (args...)->
  new _Q args...

class _RP extends XML
  constructor: (args...) ->
    super "rp", args...

RP = (args...)->
  new _RP args...

class _RT extends XML
  constructor: (args...) ->
    super "rt", args...

RT = (args...)->
  new _RT args...

class _RUBY extends XML
  constructor: (args...) ->
    super "ruby", args...

RUBY = (args...)->
  new _RUBY args...

class _S extends XML
  constructor: (args...) ->
    super "s", args...

S = (args...)->
  new _S args...

class _SAMP extends XML
  constructor: (args...) ->
    super "samp", args...

SAMP = (args...)->
  new _SAMP args...

class _SCRIPT extends XML
  constructor: (args...) ->
    super "script", args...

SCRIPT = (args...)->
  new _SCRIPT args...

class _SECTION extends XML
  constructor: (args...) ->
    super "section", args...

SECTION = (args...)->
  new _SECTION args...

class _SELECT extends XML
  constructor: (args...) ->
    super "select", args...

SELECT = (args...)->
  new _SELECT args...

class _SHADOW extends XML
  constructor: (args...) ->
    super "shadow", args...

SHADOW = (args...)->
  new _SHADOW args...

class _SMALL extends XML
  constructor: (args...) ->
    super "small", args...

SMALL = (args...)->
  new _SMALL args...

class _SOURCE extends XML
  constructor: (args...) ->
    super "source/", args...

SOURCE = (args...)->
  new _SOURCE args...

class _SPACER extends XML
  constructor: (args...) ->
    super "spacer", args...

SPACER = (args...)->
  new _SPACER args...

class _SPAN extends XML
  constructor: (args...) ->
    super "span", args...

SPAN = (args...)->
  new _SPAN args...

class _STRIKE extends XML
  constructor: (args...) ->
    super "strike", args...

STRIKE = (args...)->
  new _STRIKE args...

class _STRONG extends XML
  constructor: (args...) ->
    super "strong", args...

STRONG = (args...)->
  new _STRONG args...

class _STYLE extends XML
  constructor: (args...) ->
    super "style", args...

STYLE = (args...)->
  new _STYLE args...

class _SUB extends XML
  constructor: (args...) ->
    super "sub", args...

SUB = (args...)->
  new _SUB args...

class _SUMMARY extends XML
  constructor: (args...) ->
    super "summary", args...

SUMMARY = (args...)->
  new _SUMMARY args...

class _SUP extends XML
  constructor: (args...) ->
    super "sup", args...

SUP = (args...)->
  new _SUP args...

class _TABLE extends XML
  constructor: (args...) ->
    super "table", args...

TABLE = (args...)->
  new _TABLE args...

class _TBODY extends XML
  constructor: (args...) ->
    super "tbody", args...

TBODY = (args...)->
  new _TBODY args...

class _TD extends XML
  constructor: (args...) ->
    super "td", args...

TD = (args...)->
  new _TD args...

class _TEMPLATE extends XML
  constructor: (args...) ->
    super "template", args...

TEMPLATE = (args...)->
  new _TEMPLATE args...

class _TEXTAREA extends XML
  constructor: (args...) ->
    super "textarea", args...

TEXTAREA = (args...)->
  new _TEXTAREA args...

class _TFOOT extends XML
  constructor: (args...) ->
    super "tfoot", args...

TFOOT = (args...)->
  new _TFOOT args...

class _TH extends XML
  constructor: (args...) ->
    super "th", args...

TH = (args...)->
  new _TH args...

class _THEAD extends XML
  constructor: (args...) ->
    super "thead", args...

THEAD = (args...)->
  new _THEAD args...

class _TIME extends XML
  constructor: (args...) ->
    super "time", args...

TIME = (args...)->
  new _TIME args...

class _TITLE extends XML
  constructor: (args...) ->
    super "title", args...

TITLE = (args...)->
  new _TITLE args...

class _TR extends XML
  constructor: (args...) ->
    super "tr", args...

TR = (args...)->
  new _TR args...

class _TRACK extends XML
  constructor: (args...) ->
    super "track/", args...

TRACK = (args...)->
  new _TRACK args...

class _TT extends XML
  constructor: (args...) ->
    super "tt", args...

TT = (args...)->
  new _TT args...

class _U extends XML
  constructor: (args...) ->
    super "u", args...

U = (args...)->
  new _U args...

class _UL extends XML
  constructor: (args...) ->
    super "ul", args...

UL = (args...)->
  new _UL args...

class _VAR extends XML
  constructor: (args...) ->
    super "var", args...

VAR = (args...)->
  new _VAR args...

class _VIDEO extends XML
  constructor: (args...) ->
    super "video", args...

VIDEO = (args...)->
  new _VIDEO args...

class _WBR extends XML
  constructor: (args...) ->
    super "wbr/", args...

WBR = (args...)->
  new _WBR args...

class _XMP extends XML
  constructor: (args...) ->
    super "xmp", args...

XMP = (args...)->
  new _XMP args...