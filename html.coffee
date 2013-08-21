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

  #constructor: (@tag, @attributes, @content...) ->
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

    @create_property key, value for key, value of @attributes
    @create_tag c.tag, c for c in @content when type(c) is 'object'

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
    @converted_attributes = if @attributes then " #{values.join " "}" else ""

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

# Now the child classes
class _HTML extends XML
  constructor: (args...) ->
    super "html", args...

class _HEAD extends XML
  constructor: (args...) ->
    super "head", args...

class _BODY extends XML
  constructor: (args...) ->
    super "body", args...

class _DIV extends XML
  constructor: (args...) ->
    super "div", args...

class _H1 extends XML
  constructor: (args...) ->
    super "h1", args...

class _H2 extends XML
  constructor: (args...) ->
    super "h2", args...

class _H3 extends XML
  constructor: (args...) ->
    super "h3", args...

class _H4 extends XML
  constructor: (args...) ->
    super "h4", args...

class _H5 extends XML
  constructor: (args...) ->
    super "h5", args...

class _UL extends XML
  constructor: (args...) ->
    super "ul", args...

class _LI extends XML
  constructor: (args...) ->
    super "li", args...

class _A extends XML
  constructor: (args...) ->
    super "a", args...

class _P extends XML
  constructor: (args...) ->
    super "p", args...

class _B extends XML
  constructor: (args...) ->
    super "b", args...

class _SPAN extends XML
  constructor: (args...) ->
    super "span", args...

class _SMALL extends XML
  constructor: (args...) ->
    super "small", args...

class _IMG extends XML
  constructor: (args...) ->
    super "img/", args...

class _TR extends XML
  constructor: (args...) ->
    super "tr", args...

class _TD extends XML
  constructor: (args...) ->
    super "td", args...

class _LEGEND extends XML
  constructor: (args...) ->
    super "legend", args...

class _FIELDSET extends XML
  constructor: (args...) ->
    super "fieldset", args...

class _LABEL extends XML
  constructor: (args...) ->
    super "label", args...

class _INPUT extends XML
  constructor: (args...) ->
    super "input/", args...

class _TEXTAREA extends XML
  constructor: (args...) ->
    super "textarea", args...

# Now the child functions
HTML = (args...)->
  new _HTML args...

HEAD = (args...)->
  new _HEAD args...

BODY = (args...)->
  new _BODY args...

DIV = (args...)->
  new _DIV args...

H1 = (args...)->
  new _H1 args...

H2 = (args...)->
  new _H2 args...

H3 = (args...)->
  new _H3 args...

H4 = (args...)->
  new _H4 args...

H5 = (args...)->
  new _H5 args...

UL = (args...)->
  new _UL args...

LI = (args...)->
  new _LI args...

A = (args...)->
  new _A args...

P = (args...)->
  new _P args...

B = (args...)->
  new _B args...

SPAN = (args...)->
  new _SPAN args...

SMALL = (args...)->
  new _SMALL args...

IMG = (args...)->
  new _IMG args...

TR = (args...)->
  new _TR args...

TD = (args...)->
  new _TD args...

LEGEND = (args...)->
  new _LEGEND args...

FIELDSET = (args...)->
  new _FIELDSET args...

LABEL = (args...)->
  new _LABEL args...

INPUT = (args...)->
  new _INPUT args...

TEXTAREA = (args...)->
  new _TEXTAREA args...
