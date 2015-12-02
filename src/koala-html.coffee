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
  else if 'callee' of obj
    return String 'arguments'
  return "object"

# Borrowed from Underscore and converted using http://js2.coffee/
_has = (obj, key) ->
  obj != null and Object.hasOwnProperty.call(obj, key)
_isArguments = (obj) ->
  _has obj, 'callee'
_isArray = (obj)->
  Object().toString.call(obj) == '[object Array]'
MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
isArrayLike = (collection) ->
  length = collection and collection.length
  typeof length == 'number' and length >= 0 and length <= MAX_ARRAY_INDEX
flatten = (input, shallow, strict, startIndex) ->
  output = []
  idx = 0
  i = startIndex or 0
  length = input and input.length
  while i < length
    value = input[i]
    if isArrayLike(value) and (_isArray(value) or _isArguments(value))
      if !shallow
        value = flatten(value, shallow, strict)
      j = 0
      len = value.length
      output.length += len
      while j < len
        output[idx++] = value[j++]
    else if !strict
      output[idx++] = value
    i++
  output

# Base class
class XML

  constructor: (@tag, @content...) ->
    @isXMLObject = true
    @selfclose = off
    @attributes = null
    @tags = []

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
    @content = flatten @content
    @create_property key, value for key, value of @attributes
    @clear_tags()
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

  clear_tags: () ->
    for tag in @tags
      delete @[tag]
    @tags = []

  create_tag: (tag, xml_object) ->
    if tag of @
      if type(@[tag]) is 'array'
        @[tag].push xml_object if xml_object not in @[tag]
      else
        @[tag] = [@[tag], xml_object]
    else if tag not of @
      @[tag] = xml_object
      @tags.push tag

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

# GENERATED TAGS

K = {}

class _A extends XML
  constructor: (args...) ->
    super "a", args...

K.A = (args...)->
  new _A args...

class _ABBR extends XML
  constructor: (args...) ->
    super "abbr", args...

K.ABBR = (args...)->
  new _ABBR args...

class _ACRONYM extends XML
  constructor: (args...) ->
    super "acronym", args...

K.ACRONYM = (args...)->
  new _ACRONYM args...

class _ADDRESS extends XML
  constructor: (args...) ->
    super "address", args...

K.ADDRESS = (args...)->
  new _ADDRESS args...

class _APPLET extends XML
  constructor: (args...) ->
    super "applet", args...

K.APPLET = (args...)->
  new _APPLET args...

class _AREA extends XML
  constructor: (args...) ->
    super "area/", args...

K.AREA = (args...)->
  new _AREA args...

class _ARTICLE extends XML
  constructor: (args...) ->
    super "article", args...

K.ARTICLE = (args...)->
  new _ARTICLE args...

class _ASIDE extends XML
  constructor: (args...) ->
    super "aside", args...

K.ASIDE = (args...)->
  new _ASIDE args...

class _AUDIO extends XML
  constructor: (args...) ->
    super "audio", args...

K.AUDIO = (args...)->
  new _AUDIO args...

class _B extends XML
  constructor: (args...) ->
    super "b", args...

K.B = (args...)->
  new _B args...

class _BASE extends XML
  constructor: (args...) ->
    super "base/", args...

K.BASE = (args...)->
  new _BASE args...

class _BASEFONT extends XML
  constructor: (args...) ->
    super "basefont", args...

K.BASEFONT = (args...)->
  new _BASEFONT args...

class _BDI extends XML
  constructor: (args...) ->
    super "bdi", args...

K.BDI = (args...)->
  new _BDI args...

class _BDO extends XML
  constructor: (args...) ->
    super "bdo", args...

K.BDO = (args...)->
  new _BDO args...

class _BGSOUND extends XML
  constructor: (args...) ->
    super "bgsound", args...

K.BGSOUND = (args...)->
  new _BGSOUND args...

class _BIG extends XML
  constructor: (args...) ->
    super "big", args...

K.BIG = (args...)->
  new _BIG args...

class _BLINK extends XML
  constructor: (args...) ->
    super "blink", args...

K.BLINK = (args...)->
  new _BLINK args...

class _BLOCKQUOTE extends XML
  constructor: (args...) ->
    super "blockquote", args...

K.BLOCKQUOTE = (args...)->
  new _BLOCKQUOTE args...

class _BODY extends XML
  constructor: (args...) ->
    super "body", args...

K.BODY = (args...)->
  new _BODY args...

class _BR extends XML
  constructor: (args...) ->
    super "br/", args...

K.BR = (args...)->
  new _BR args...

class _BUTTON extends XML
  constructor: (args...) ->
    super "button", args...

K.BUTTON = (args...)->
  new _BUTTON args...

class _CANVAS extends XML
  constructor: (args...) ->
    super "canvas", args...

K.CANVAS = (args...)->
  new _CANVAS args...

class _CAPTION extends XML
  constructor: (args...) ->
    super "caption", args...

K.CAPTION = (args...)->
  new _CAPTION args...

class _CENTER extends XML
  constructor: (args...) ->
    super "center", args...

K.CENTER = (args...)->
  new _CENTER args...

class _CITE extends XML
  constructor: (args...) ->
    super "cite", args...

K.CITE = (args...)->
  new _CITE args...

class _CODE extends XML
  constructor: (args...) ->
    super "code", args...

K.CODE = (args...)->
  new _CODE args...

class _COL extends XML
  constructor: (args...) ->
    super "col/", args...

K.COL = (args...)->
  new _COL args...

class _COLGROUP extends XML
  constructor: (args...) ->
    super "colgroup", args...

K.COLGROUP = (args...)->
  new _COLGROUP args...

class _CONTENT extends XML
  constructor: (args...) ->
    super "content", args...

K.CONTENT = (args...)->
  new _CONTENT args...

class _DATA extends XML
  constructor: (args...) ->
    super "data", args...

K.DATA = (args...)->
  new _DATA args...

class _DATALIST extends XML
  constructor: (args...) ->
    super "datalist", args...

K.DATALIST = (args...)->
  new _DATALIST args...

class _DD extends XML
  constructor: (args...) ->
    super "dd", args...

K.DD = (args...)->
  new _DD args...

class _DECORATOR extends XML
  constructor: (args...) ->
    super "decorator", args...

K.DECORATOR = (args...)->
  new _DECORATOR args...

class _DEL extends XML
  constructor: (args...) ->
    super "del", args...

K.DEL = (args...)->
  new _DEL args...

class _DETAILS extends XML
  constructor: (args...) ->
    super "details", args...

K.DETAILS = (args...)->
  new _DETAILS args...

class _DFN extends XML
  constructor: (args...) ->
    super "dfn", args...

K.DFN = (args...)->
  new _DFN args...

class _DIR extends XML
  constructor: (args...) ->
    super "dir", args...

K.DIR = (args...)->
  new _DIR args...

class _DIV extends XML
  constructor: (args...) ->
    super "div", args...

K.DIV = (args...)->
  new _DIV args...

class _DL extends XML
  constructor: (args...) ->
    super "dl", args...

K.DL = (args...)->
  new _DL args...

class _DT extends XML
  constructor: (args...) ->
    super "dt", args...

K.DT = (args...)->
  new _DT args...

class _ELEMENT extends XML
  constructor: (args...) ->
    super "element", args...

K.ELEMENT = (args...)->
  new _ELEMENT args...

class _EM extends XML
  constructor: (args...) ->
    super "em", args...

K.EM = (args...)->
  new _EM args...

class _EMBED extends XML
  constructor: (args...) ->
    super "embed/", args...

K.EMBED = (args...)->
  new _EMBED args...

class _FIELDSET extends XML
  constructor: (args...) ->
    super "fieldset", args...

K.FIELDSET = (args...)->
  new _FIELDSET args...

class _FIGCAPTION extends XML
  constructor: (args...) ->
    super "figcaption", args...

K.FIGCAPTION = (args...)->
  new _FIGCAPTION args...

class _FIGURE extends XML
  constructor: (args...) ->
    super "figure", args...

K.FIGURE = (args...)->
  new _FIGURE args...

class _FONT extends XML
  constructor: (args...) ->
    super "font", args...

K.FONT = (args...)->
  new _FONT args...

class _FOOTER extends XML
  constructor: (args...) ->
    super "footer", args...

K.FOOTER = (args...)->
  new _FOOTER args...

class _FORM extends XML
  constructor: (args...) ->
    super "form", args...

K.FORM = (args...)->
  new _FORM args...

class _FRAME extends XML
  constructor: (args...) ->
    super "frame", args...

K.FRAME = (args...)->
  new _FRAME args...

class _FRAMESET extends XML
  constructor: (args...) ->
    super "frameset", args...

K.FRAMESET = (args...)->
  new _FRAMESET args...

class _H1 extends XML
  constructor: (args...) ->
    super "h1", args...

K.H1 = (args...)->
  new _H1 args...

class _H2 extends XML
  constructor: (args...) ->
    super "h2", args...

K.H2 = (args...)->
  new _H2 args...

class _H3 extends XML
  constructor: (args...) ->
    super "h3", args...

K.H3 = (args...)->
  new _H3 args...

class _H4 extends XML
  constructor: (args...) ->
    super "h4", args...

K.H4 = (args...)->
  new _H4 args...

class _H5 extends XML
  constructor: (args...) ->
    super "h5", args...

K.H5 = (args...)->
  new _H5 args...

class _H6 extends XML
  constructor: (args...) ->
    super "h6", args...

K.H6 = (args...)->
  new _H6 args...

class _HEAD extends XML
  constructor: (args...) ->
    super "head", args...

K.HEAD = (args...)->
  new _HEAD args...

class _HEADER extends XML
  constructor: (args...) ->
    super "header", args...

K.HEADER = (args...)->
  new _HEADER args...

class _HGROUP extends XML
  constructor: (args...) ->
    super "hgroup", args...

K.HGROUP = (args...)->
  new _HGROUP args...

class _HR extends XML
  constructor: (args...) ->
    super "hr/", args...

K.HR = (args...)->
  new _HR args...

class _HTML extends XML
  constructor: (args...) ->
    super "html", args...

K.HTML = (args...)->
  new _HTML args...

class _I extends XML
  constructor: (args...) ->
    super "i", args...

K.I = (args...)->
  new _I args...

class _IFRAME extends XML
  constructor: (args...) ->
    super "iframe", args...

K.IFRAME = (args...)->
  new _IFRAME args...

class _IMG extends XML
  constructor: (args...) ->
    super "img/", args...

K.IMG = (args...)->
  new _IMG args...

class _INPUT extends XML
  constructor: (args...) ->
    super "input/", args...

K.INPUT = (args...)->
  new _INPUT args...

class _INS extends XML
  constructor: (args...) ->
    super "ins", args...

K.INS = (args...)->
  new _INS args...

class _ISINDEX extends XML
  constructor: (args...) ->
    super "isindex", args...

K.ISINDEX = (args...)->
  new _ISINDEX args...

class _KBD extends XML
  constructor: (args...) ->
    super "kbd", args...

K.KBD = (args...)->
  new _KBD args...

class _KEYGEN extends XML
  constructor: (args...) ->
    super "keygen/", args...

K.KEYGEN = (args...)->
  new _KEYGEN args...

class _LABEL extends XML
  constructor: (args...) ->
    super "label", args...

K.LABEL = (args...)->
  new _LABEL args...

class _LEGEND extends XML
  constructor: (args...) ->
    super "legend", args...

K.LEGEND = (args...)->
  new _LEGEND args...

class _LI extends XML
  constructor: (args...) ->
    super "li", args...

K.LI = (args...)->
  new _LI args...

class _LINK extends XML
  constructor: (args...) ->
    super "link/", args...

K.LINK = (args...)->
  new _LINK args...

class _LISTING extends XML
  constructor: (args...) ->
    super "listing", args...

K.LISTING = (args...)->
  new _LISTING args...

class _MAIN extends XML
  constructor: (args...) ->
    super "main", args...

K.MAIN = (args...)->
  new _MAIN args...

class _MAP extends XML
  constructor: (args...) ->
    super "map", args...

K.MAP = (args...)->
  new _MAP args...

class _MARK extends XML
  constructor: (args...) ->
    super "mark", args...

K.MARK = (args...)->
  new _MARK args...

class _MARQUEE extends XML
  constructor: (args...) ->
    super "marquee", args...

K.MARQUEE = (args...)->
  new _MARQUEE args...

class _MENU extends XML
  constructor: (args...) ->
    super "menu", args...

K.MENU = (args...)->
  new _MENU args...

class _MENUITEM extends XML
  constructor: (args...) ->
    super "menuitem", args...

K.MENUITEM = (args...)->
  new _MENUITEM args...

class _META extends XML
  constructor: (args...) ->
    super "meta/", args...

K.META = (args...)->
  new _META args...

class _METER extends XML
  constructor: (args...) ->
    super "meter", args...

K.METER = (args...)->
  new _METER args...

class _NAV extends XML
  constructor: (args...) ->
    super "nav", args...

K.NAV = (args...)->
  new _NAV args...

class _NOBR extends XML
  constructor: (args...) ->
    super "nobr", args...

K.NOBR = (args...)->
  new _NOBR args...

class _NOFRAMES extends XML
  constructor: (args...) ->
    super "noframes", args...

K.NOFRAMES = (args...)->
  new _NOFRAMES args...

class _NOSCRIPT extends XML
  constructor: (args...) ->
    super "noscript", args...

K.NOSCRIPT = (args...)->
  new _NOSCRIPT args...

class _OBJECT extends XML
  constructor: (args...) ->
    super "object", args...

K.OBJECT = (args...)->
  new _OBJECT args...

class _OL extends XML
  constructor: (args...) ->
    super "ol", args...

K.OL = (args...)->
  new _OL args...

class _OPTGROUP extends XML
  constructor: (args...) ->
    super "optgroup", args...

K.OPTGROUP = (args...)->
  new _OPTGROUP args...

class _OPTION extends XML
  constructor: (args...) ->
    super "option", args...

K.OPTION = (args...)->
  new _OPTION args...

class _OUTPUT extends XML
  constructor: (args...) ->
    super "output", args...

K.OUTPUT = (args...)->
  new _OUTPUT args...

class _P extends XML
  constructor: (args...) ->
    super "p", args...

K.P = (args...)->
  new _P args...

class _PARAM extends XML
  constructor: (args...) ->
    super "param/", args...

K.PARAM = (args...)->
  new _PARAM args...

class _PLAINTEXT extends XML
  constructor: (args...) ->
    super "plaintext", args...

K.PLAINTEXT = (args...)->
  new _PLAINTEXT args...

class _PRE extends XML
  constructor: (args...) ->
    super "pre", args...

K.PRE = (args...)->
  new _PRE args...

class _PROGRESS extends XML
  constructor: (args...) ->
    super "progress", args...

K.PROGRESS = (args...)->
  new _PROGRESS args...

class _Q extends XML
  constructor: (args...) ->
    super "q", args...

K.Q = (args...)->
  new _Q args...

class _RP extends XML
  constructor: (args...) ->
    super "rp", args...

K.RP = (args...)->
  new _RP args...

class _RT extends XML
  constructor: (args...) ->
    super "rt", args...

K.RT = (args...)->
  new _RT args...

class _RUBY extends XML
  constructor: (args...) ->
    super "ruby", args...

K.RUBY = (args...)->
  new _RUBY args...

class _S extends XML
  constructor: (args...) ->
    super "s", args...

K.S = (args...)->
  new _S args...

class _SAMP extends XML
  constructor: (args...) ->
    super "samp", args...

K.SAMP = (args...)->
  new _SAMP args...

class _SCRIPT extends XML
  constructor: (args...) ->
    super "script", args...

K.SCRIPT = (args...)->
  new _SCRIPT args...

class _SECTION extends XML
  constructor: (args...) ->
    super "section", args...

K.SECTION = (args...)->
  new _SECTION args...

class _SELECT extends XML
  constructor: (args...) ->
    super "select", args...

K.SELECT = (args...)->
  new _SELECT args...

class _SHADOW extends XML
  constructor: (args...) ->
    super "shadow", args...

K.SHADOW = (args...)->
  new _SHADOW args...

class _SMALL extends XML
  constructor: (args...) ->
    super "small", args...

K.SMALL = (args...)->
  new _SMALL args...

class _SOURCE extends XML
  constructor: (args...) ->
    super "source/", args...

K.SOURCE = (args...)->
  new _SOURCE args...

class _SPACER extends XML
  constructor: (args...) ->
    super "spacer", args...

K.SPACER = (args...)->
  new _SPACER args...

class _SPAN extends XML
  constructor: (args...) ->
    super "span", args...

K.SPAN = (args...)->
  new _SPAN args...

class _STRIKE extends XML
  constructor: (args...) ->
    super "strike", args...

K.STRIKE = (args...)->
  new _STRIKE args...

class _STRONG extends XML
  constructor: (args...) ->
    super "strong", args...

K.STRONG = (args...)->
  new _STRONG args...

class _STYLE extends XML
  constructor: (args...) ->
    super "style", args...

K.STYLE = (args...)->
  new _STYLE args...

class _SUB extends XML
  constructor: (args...) ->
    super "sub", args...

K.SUB = (args...)->
  new _SUB args...

class _SUMMARY extends XML
  constructor: (args...) ->
    super "summary", args...

K.SUMMARY = (args...)->
  new _SUMMARY args...

class _SUP extends XML
  constructor: (args...) ->
    super "sup", args...

K.SUP = (args...)->
  new _SUP args...

class _TABLE extends XML
  constructor: (args...) ->
    super "table", args...

K.TABLE = (args...)->
  new _TABLE args...

class _TBODY extends XML
  constructor: (args...) ->
    super "tbody", args...

K.TBODY = (args...)->
  new _TBODY args...

class _TD extends XML
  constructor: (args...) ->
    super "td", args...

K.TD = (args...)->
  new _TD args...

class _TEMPLATE extends XML
  constructor: (args...) ->
    super "template", args...

K.TEMPLATE = (args...)->
  new _TEMPLATE args...

class _TEXTAREA extends XML
  constructor: (args...) ->
    super "textarea", args...

K.TEXTAREA = (args...)->
  new _TEXTAREA args...

class _TFOOT extends XML
  constructor: (args...) ->
    super "tfoot", args...

K.TFOOT = (args...)->
  new _TFOOT args...

class _TH extends XML
  constructor: (args...) ->
    super "th", args...

K.TH = (args...)->
  new _TH args...

class _THEAD extends XML
  constructor: (args...) ->
    super "thead", args...

K.THEAD = (args...)->
  new _THEAD args...

class _TIME extends XML
  constructor: (args...) ->
    super "time", args...

K.TIME = (args...)->
  new _TIME args...

class _TITLE extends XML
  constructor: (args...) ->
    super "title", args...

K.TITLE = (args...)->
  new _TITLE args...

class _TR extends XML
  constructor: (args...) ->
    super "tr", args...

K.TR = (args...)->
  new _TR args...

class _TRACK extends XML
  constructor: (args...) ->
    super "track/", args...

K.TRACK = (args...)->
  new _TRACK args...

class _TT extends XML
  constructor: (args...) ->
    super "tt", args...

K.TT = (args...)->
  new _TT args...

class _U extends XML
  constructor: (args...) ->
    super "u", args...

K.U = (args...)->
  new _U args...

class _UL extends XML
  constructor: (args...) ->
    super "ul", args...

K.UL = (args...)->
  new _UL args...

class _VAR extends XML
  constructor: (args...) ->
    super "var", args...

K.VAR = (args...)->
  new _VAR args...

class _VIDEO extends XML
  constructor: (args...) ->
    super "video", args...

K.VIDEO = (args...)->
  new _VIDEO args...

class _WBR extends XML
  constructor: (args...) ->
    super "wbr/", args...

K.WBR = (args...)->
  new _WBR args...

class _XMP extends XML
  constructor: (args...) ->
    super "xmp", args...

K.XMP = (args...)->
  new _XMP args...
