class XML
  constructor: (@tag, @content, @attributes) ->
    @selfclose = off
    if @tag[-1..] is '/'
      @selfclose = on
      @tag = @tag[..-2]
    @_convert_attributes attributes

  _convert_attributes: ->
    values = for key, value of @attributes
      "#{key}=\"#{value}\""
    @converted_attributes = " " + values.join " "

  append: (value) ->
    @content += value

  xml: ->
    if @selfclose is on
      "<#{@tag}#{@converted_attributes}/>"
    else if @selfclose is off
      "<#{@tag}#{@converted_attributes}>#{@content}</#{@tag}>"

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

alert new IMG({src: 'minha/imagem'}).xml()