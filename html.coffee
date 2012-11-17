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
  constructor: (@tag, @content, @attributes) ->
    @selfclose = off
    if @tag[-1..] is '/'
      @selfclose = on
      @tag = @tag[..-2]
    @_convert_attributes()
    @_convert_content()

  _convert_attributes: ->
    values = for key, value of @attributes
      "#{key}=\"#{value}\""
    @converted_attributes = if @attributes then " #{values.join " "}" else ""

  _convert_content: ->
    @converted_content = if type(@content) is 'object' then @content.xml() else @content

  xml: ->
    if @selfclose is on
      "<#{@tag}#{@converted_attributes}/>"
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
    super "img/", null, args...