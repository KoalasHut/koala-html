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
  constructor: (@tag, @attributes, @content...) ->
    @selfclose = off
    if @tag[-1..] is '/'
      @selfclose = on
      @tag = @tag[..-2]
      @content = ''
    # Attributes
    if not @attributes
      @attributes = {}

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
      "<#{@tag}#{@converted_attributes}/>;"
    else if @selfclose is off
      "<#{@tag}#{@converted_attributes}>#{@converted_content}</#{@tag}>"

# Now the childs

class DIV extends XML
  constructor: (args...) ->
    super "div", args...

class H1 extends XML
  constructor: (args...) ->
    super "h1", args...

class H2 extends XML
  constructor: (args...) ->
    super "h2", args...

class H3 extends XML
  constructor: (args...) ->
    super "h3", args...

class H4 extends XML
  constructor: (args...) ->
    super "h4", args...

class H5 extends XML
  constructor: (args...) ->
    super "h5", args...

class UL extends XML
  constructor: (args...) ->
    super "ul", args...

class LI extends XML
  constructor: (args...) ->
    super "li", args...

class A extends XML
  constructor: (args...) ->
    super "a", args...

class P extends XML
  constructor: (args...) ->
    super "p", args...

class SPAN extends XML
  constructor: (args...) ->
    super "span", args...

class SMALL extends XML
  constructor: (args...) ->
    super "small", args...

class IMG extends XML
  constructor: (args...) ->
    super "img/", args...

class TR extends XML
  constructor: (args...) ->
    super "tr", args...

class TD extends XML
  constructor: (args...) ->
    super "td", args...