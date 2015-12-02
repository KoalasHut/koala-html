var K, MAX_ARRAY_INDEX, XML, _A, _ABBR, _ACRONYM, _ADDRESS, _APPLET, _AREA, _ARTICLE, _ASIDE, _AUDIO, _B, _BASE, _BASEFONT, _BDI, _BDO, _BGSOUND, _BIG, _BLINK, _BLOCKQUOTE, _BODY, _BR, _BUTTON, _CANVAS, _CAPTION, _CENTER, _CITE, _CODE, _COL, _COLGROUP, _CONTENT, _DATA, _DATALIST, _DD, _DECORATOR, _DEL, _DETAILS, _DFN, _DIR, _DIV, _DL, _DT, _ELEMENT, _EM, _EMBED, _FIELDSET, _FIGCAPTION, _FIGURE, _FONT, _FOOTER, _FORM, _FRAME, _FRAMESET, _H1, _H2, _H3, _H4, _H5, _H6, _HEAD, _HEADER, _HGROUP, _HR, _HTML, _I, _IFRAME, _IMG, _INPUT, _INS, _ISINDEX, _KBD, _KEYGEN, _LABEL, _LEGEND, _LI, _LINK, _LISTING, _MAIN, _MAP, _MARK, _MARQUEE, _MENU, _MENUITEM, _META, _METER, _NAV, _NOBR, _NOFRAMES, _NOSCRIPT, _OBJECT, _OL, _OPTGROUP, _OPTION, _OUTPUT, _P, _PARAM, _PLAINTEXT, _PRE, _PROGRESS, _Q, _RP, _RT, _RUBY, _S, _SAMP, _SCRIPT, _SECTION, _SELECT, _SHADOW, _SMALL, _SOURCE, _SPACER, _SPAN, _STRIKE, _STRONG, _STYLE, _SUB, _SUMMARY, _SUP, _TABLE, _TBODY, _TD, _TEMPLATE, _TEXTAREA, _TFOOT, _TH, _THEAD, _TIME, _TITLE, _TR, _TRACK, _TT, _U, _UL, _VAR, _VIDEO, _WBR, _XMP, _has, _isArguments, _isArray, flatten, isArrayLike, type,
  slice = [].slice,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

type = function(obj) {
  var classToType, k, len1, myClass, name, ref;
  if (obj === void 0 || obj === null) {
    return String(obj);
  }
  classToType = new Object;
  ref = "Boolean Number String Function Array Date RegExp".split(" ");
  for (k = 0, len1 = ref.length; k < len1; k++) {
    name = ref[k];
    classToType["[object " + name + "]"] = name.toLowerCase();
  }
  myClass = Object.prototype.toString.call(obj);
  if (myClass in classToType) {
    return classToType[myClass];
  } else if ('callee' in obj) {
    return String('arguments');
  }
  return "object";
};

_has = function(obj, key) {
  return obj !== null && Object.hasOwnProperty.call(obj, key);
};

_isArguments = function(obj) {
  return _has(obj, 'callee');
};

_isArray = function(obj) {
  return Object().toString.call(obj) === '[object Array]';
};

MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

isArrayLike = function(collection) {
  var length;
  length = collection && collection.length;
  return typeof length === 'number' && length >= 0 && length <= MAX_ARRAY_INDEX;
};

flatten = function(input, shallow, strict, startIndex) {
  var i, idx, j, len, length, output, value;
  output = [];
  idx = 0;
  i = startIndex || 0;
  length = input && input.length;
  while (i < length) {
    value = input[i];
    if (isArrayLike(value) && (_isArray(value) || _isArguments(value))) {
      if (!shallow) {
        value = flatten(value, shallow, strict);
      }
      j = 0;
      len = value.length;
      output.length += len;
      while (j < len) {
        output[idx++] = value[j++];
      }
    } else if (!strict) {
      output[idx++] = value;
    }
    i++;
  }
  return output;
};

XML = (function() {
  function XML() {
    var arg, content, index, ref, tag1;
    tag1 = arguments[0], content = 2 <= arguments.length ? slice.call(arguments, 1) : [];
    this.tag = tag1;
    this.content = content;
    this.isXMLObject = true;
    this.selfclose = false;
    this.attributes = null;
    this.tags = [];
    ref = this.content;
    for (index in ref) {
      arg = ref[index];
      if (type(arg) === 'object' && !('isXMLObject' in arg)) {
        this.attributes = arg;
        this.content.splice(index, 1);
      }
    }
    if (this.tag.slice(-1) === '/') {
      this.selfclose = true;
      this.tag = this.tag.slice(0, -1);
      this.content = '';
    }
    if (!this.attributes) {
      this.attributes = {};
    }
    this.refresh();
  }

  XML.prototype.refresh = function() {
    var c, k, key, len1, ref, ref1, results, value;
    this.content = flatten(this.content);
    ref = this.attributes;
    for (key in ref) {
      value = ref[key];
      this.create_property(key, value);
    }
    this.clear_tags();
    ref1 = this.content;
    results = [];
    for (k = 0, len1 = ref1.length; k < len1; k++) {
      c = ref1[k];
      if (type(c) === 'object') {
        results.push(this.create_tag(c.tag, c));
      }
    }
    return results;
  };

  XML.prototype.append = function(obj, index) {
    this.content.splice(index != null ? index : this.content.length, 0, obj);
    return this.refresh();
  };

  XML.prototype.remove = function(index, ammount) {
    this.content.splice(index, ammount != null ? ammount : 1);
    return this.refresh();
  };

  XML.prototype.text = function(str) {
    if (!str) {
      return this.content;
    } else if (str) {
      return this.content = [str];
    }
  };

  XML.prototype.create_property = function(key, value) {
    return this[key] = function(v) {
      if (v) {
        return this.attributes[key] = v;
      } else if (!v) {
        return this.attributes[key];
      }
    };
  };

  XML.prototype.clear_tags = function() {
    var k, len1, ref, tag;
    ref = this.tags;
    for (k = 0, len1 = ref.length; k < len1; k++) {
      tag = ref[k];
      delete this[tag];
    }
    return this.tags = [];
  };

  XML.prototype.create_tag = function(tag, xml_object) {
    if (tag in this) {
      if (type(this[tag]) === 'array') {
        if (indexOf.call(this[tag], xml_object) < 0) {
          return this[tag].push(xml_object);
        }
      } else {
        return this[tag] = [this[tag], xml_object];
      }
    } else if (!(tag in this)) {
      this[tag] = xml_object;
      return this.tags.push(tag);
    }
  };

  XML.prototype._convert_attributes = function() {
    var key, value, values;
    values = (function() {
      var ref, results;
      ref = this.attributes;
      results = [];
      for (key in ref) {
        value = ref[key];
        value = type(value) === 'array' ? value.join(" ") : value;
        if (value) {
          results.push(key + "=\"" + value + "\"");
        } else {
          results.push(key);
        }
      }
      return results;
    }).call(this);
    values.splice(0, 0, "");
    return this.converted_attributes = this.attributes ? "" + (values.join(" ")) : "";
  };

  XML.prototype._convert_content = function() {
    var c, contents;
    contents = (function() {
      var k, len1, ref, results;
      ref = this.content;
      results = [];
      for (k = 0, len1 = ref.length; k < len1; k++) {
        c = ref[k];
        if (type(c) === 'object') {
          results.push(c.xml());
        } else {
          results.push(c);
        }
      }
      return results;
    }).call(this);
    return this.converted_content = contents.join(' ');
  };

  XML.prototype.xml = function() {
    this._convert_attributes();
    this._convert_content();
    if (this.selfclose === true) {
      return "<" + this.tag + this.converted_attributes + "/>";
    } else if (this.selfclose === false) {
      return "<" + this.tag + this.converted_attributes + ">" + this.converted_content + "</" + this.tag + ">";
    }
  };

  return XML;

})();

K = {};

_A = (function(superClass) {
  extend(_A, superClass);

  function _A() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _A.__super__.constructor.apply(this, ["a"].concat(slice.call(args)));
  }

  return _A;

})(XML);

K.A = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_A, args, function(){});
};

_ABBR = (function(superClass) {
  extend(_ABBR, superClass);

  function _ABBR() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _ABBR.__super__.constructor.apply(this, ["abbr"].concat(slice.call(args)));
  }

  return _ABBR;

})(XML);

K.ABBR = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_ABBR, args, function(){});
};

_ACRONYM = (function(superClass) {
  extend(_ACRONYM, superClass);

  function _ACRONYM() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _ACRONYM.__super__.constructor.apply(this, ["acronym"].concat(slice.call(args)));
  }

  return _ACRONYM;

})(XML);

K.ACRONYM = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_ACRONYM, args, function(){});
};

_ADDRESS = (function(superClass) {
  extend(_ADDRESS, superClass);

  function _ADDRESS() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _ADDRESS.__super__.constructor.apply(this, ["address"].concat(slice.call(args)));
  }

  return _ADDRESS;

})(XML);

K.ADDRESS = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_ADDRESS, args, function(){});
};

_APPLET = (function(superClass) {
  extend(_APPLET, superClass);

  function _APPLET() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _APPLET.__super__.constructor.apply(this, ["applet"].concat(slice.call(args)));
  }

  return _APPLET;

})(XML);

K.APPLET = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_APPLET, args, function(){});
};

_AREA = (function(superClass) {
  extend(_AREA, superClass);

  function _AREA() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _AREA.__super__.constructor.apply(this, ["area/"].concat(slice.call(args)));
  }

  return _AREA;

})(XML);

K.AREA = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_AREA, args, function(){});
};

_ARTICLE = (function(superClass) {
  extend(_ARTICLE, superClass);

  function _ARTICLE() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _ARTICLE.__super__.constructor.apply(this, ["article"].concat(slice.call(args)));
  }

  return _ARTICLE;

})(XML);

K.ARTICLE = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_ARTICLE, args, function(){});
};

_ASIDE = (function(superClass) {
  extend(_ASIDE, superClass);

  function _ASIDE() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _ASIDE.__super__.constructor.apply(this, ["aside"].concat(slice.call(args)));
  }

  return _ASIDE;

})(XML);

K.ASIDE = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_ASIDE, args, function(){});
};

_AUDIO = (function(superClass) {
  extend(_AUDIO, superClass);

  function _AUDIO() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _AUDIO.__super__.constructor.apply(this, ["audio"].concat(slice.call(args)));
  }

  return _AUDIO;

})(XML);

K.AUDIO = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_AUDIO, args, function(){});
};

_B = (function(superClass) {
  extend(_B, superClass);

  function _B() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _B.__super__.constructor.apply(this, ["b"].concat(slice.call(args)));
  }

  return _B;

})(XML);

K.B = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_B, args, function(){});
};

_BASE = (function(superClass) {
  extend(_BASE, superClass);

  function _BASE() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _BASE.__super__.constructor.apply(this, ["base/"].concat(slice.call(args)));
  }

  return _BASE;

})(XML);

K.BASE = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_BASE, args, function(){});
};

_BASEFONT = (function(superClass) {
  extend(_BASEFONT, superClass);

  function _BASEFONT() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _BASEFONT.__super__.constructor.apply(this, ["basefont"].concat(slice.call(args)));
  }

  return _BASEFONT;

})(XML);

K.BASEFONT = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_BASEFONT, args, function(){});
};

_BDI = (function(superClass) {
  extend(_BDI, superClass);

  function _BDI() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _BDI.__super__.constructor.apply(this, ["bdi"].concat(slice.call(args)));
  }

  return _BDI;

})(XML);

K.BDI = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_BDI, args, function(){});
};

_BDO = (function(superClass) {
  extend(_BDO, superClass);

  function _BDO() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _BDO.__super__.constructor.apply(this, ["bdo"].concat(slice.call(args)));
  }

  return _BDO;

})(XML);

K.BDO = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_BDO, args, function(){});
};

_BGSOUND = (function(superClass) {
  extend(_BGSOUND, superClass);

  function _BGSOUND() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _BGSOUND.__super__.constructor.apply(this, ["bgsound"].concat(slice.call(args)));
  }

  return _BGSOUND;

})(XML);

K.BGSOUND = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_BGSOUND, args, function(){});
};

_BIG = (function(superClass) {
  extend(_BIG, superClass);

  function _BIG() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _BIG.__super__.constructor.apply(this, ["big"].concat(slice.call(args)));
  }

  return _BIG;

})(XML);

K.BIG = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_BIG, args, function(){});
};

_BLINK = (function(superClass) {
  extend(_BLINK, superClass);

  function _BLINK() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _BLINK.__super__.constructor.apply(this, ["blink"].concat(slice.call(args)));
  }

  return _BLINK;

})(XML);

K.BLINK = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_BLINK, args, function(){});
};

_BLOCKQUOTE = (function(superClass) {
  extend(_BLOCKQUOTE, superClass);

  function _BLOCKQUOTE() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _BLOCKQUOTE.__super__.constructor.apply(this, ["blockquote"].concat(slice.call(args)));
  }

  return _BLOCKQUOTE;

})(XML);

K.BLOCKQUOTE = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_BLOCKQUOTE, args, function(){});
};

_BODY = (function(superClass) {
  extend(_BODY, superClass);

  function _BODY() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _BODY.__super__.constructor.apply(this, ["body"].concat(slice.call(args)));
  }

  return _BODY;

})(XML);

K.BODY = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_BODY, args, function(){});
};

_BR = (function(superClass) {
  extend(_BR, superClass);

  function _BR() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _BR.__super__.constructor.apply(this, ["br/"].concat(slice.call(args)));
  }

  return _BR;

})(XML);

K.BR = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_BR, args, function(){});
};

_BUTTON = (function(superClass) {
  extend(_BUTTON, superClass);

  function _BUTTON() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _BUTTON.__super__.constructor.apply(this, ["button"].concat(slice.call(args)));
  }

  return _BUTTON;

})(XML);

K.BUTTON = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_BUTTON, args, function(){});
};

_CANVAS = (function(superClass) {
  extend(_CANVAS, superClass);

  function _CANVAS() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _CANVAS.__super__.constructor.apply(this, ["canvas"].concat(slice.call(args)));
  }

  return _CANVAS;

})(XML);

K.CANVAS = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_CANVAS, args, function(){});
};

_CAPTION = (function(superClass) {
  extend(_CAPTION, superClass);

  function _CAPTION() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _CAPTION.__super__.constructor.apply(this, ["caption"].concat(slice.call(args)));
  }

  return _CAPTION;

})(XML);

K.CAPTION = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_CAPTION, args, function(){});
};

_CENTER = (function(superClass) {
  extend(_CENTER, superClass);

  function _CENTER() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _CENTER.__super__.constructor.apply(this, ["center"].concat(slice.call(args)));
  }

  return _CENTER;

})(XML);

K.CENTER = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_CENTER, args, function(){});
};

_CITE = (function(superClass) {
  extend(_CITE, superClass);

  function _CITE() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _CITE.__super__.constructor.apply(this, ["cite"].concat(slice.call(args)));
  }

  return _CITE;

})(XML);

K.CITE = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_CITE, args, function(){});
};

_CODE = (function(superClass) {
  extend(_CODE, superClass);

  function _CODE() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _CODE.__super__.constructor.apply(this, ["code"].concat(slice.call(args)));
  }

  return _CODE;

})(XML);

K.CODE = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_CODE, args, function(){});
};

_COL = (function(superClass) {
  extend(_COL, superClass);

  function _COL() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _COL.__super__.constructor.apply(this, ["col/"].concat(slice.call(args)));
  }

  return _COL;

})(XML);

K.COL = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_COL, args, function(){});
};

_COLGROUP = (function(superClass) {
  extend(_COLGROUP, superClass);

  function _COLGROUP() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _COLGROUP.__super__.constructor.apply(this, ["colgroup"].concat(slice.call(args)));
  }

  return _COLGROUP;

})(XML);

K.COLGROUP = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_COLGROUP, args, function(){});
};

_CONTENT = (function(superClass) {
  extend(_CONTENT, superClass);

  function _CONTENT() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _CONTENT.__super__.constructor.apply(this, ["content"].concat(slice.call(args)));
  }

  return _CONTENT;

})(XML);

K.CONTENT = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_CONTENT, args, function(){});
};

_DATA = (function(superClass) {
  extend(_DATA, superClass);

  function _DATA() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _DATA.__super__.constructor.apply(this, ["data"].concat(slice.call(args)));
  }

  return _DATA;

})(XML);

K.DATA = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_DATA, args, function(){});
};

_DATALIST = (function(superClass) {
  extend(_DATALIST, superClass);

  function _DATALIST() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _DATALIST.__super__.constructor.apply(this, ["datalist"].concat(slice.call(args)));
  }

  return _DATALIST;

})(XML);

K.DATALIST = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_DATALIST, args, function(){});
};

_DD = (function(superClass) {
  extend(_DD, superClass);

  function _DD() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _DD.__super__.constructor.apply(this, ["dd"].concat(slice.call(args)));
  }

  return _DD;

})(XML);

K.DD = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_DD, args, function(){});
};

_DECORATOR = (function(superClass) {
  extend(_DECORATOR, superClass);

  function _DECORATOR() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _DECORATOR.__super__.constructor.apply(this, ["decorator"].concat(slice.call(args)));
  }

  return _DECORATOR;

})(XML);

K.DECORATOR = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_DECORATOR, args, function(){});
};

_DEL = (function(superClass) {
  extend(_DEL, superClass);

  function _DEL() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _DEL.__super__.constructor.apply(this, ["del"].concat(slice.call(args)));
  }

  return _DEL;

})(XML);

K.DEL = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_DEL, args, function(){});
};

_DETAILS = (function(superClass) {
  extend(_DETAILS, superClass);

  function _DETAILS() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _DETAILS.__super__.constructor.apply(this, ["details"].concat(slice.call(args)));
  }

  return _DETAILS;

})(XML);

K.DETAILS = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_DETAILS, args, function(){});
};

_DFN = (function(superClass) {
  extend(_DFN, superClass);

  function _DFN() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _DFN.__super__.constructor.apply(this, ["dfn"].concat(slice.call(args)));
  }

  return _DFN;

})(XML);

K.DFN = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_DFN, args, function(){});
};

_DIR = (function(superClass) {
  extend(_DIR, superClass);

  function _DIR() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _DIR.__super__.constructor.apply(this, ["dir"].concat(slice.call(args)));
  }

  return _DIR;

})(XML);

K.DIR = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_DIR, args, function(){});
};

_DIV = (function(superClass) {
  extend(_DIV, superClass);

  function _DIV() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _DIV.__super__.constructor.apply(this, ["div"].concat(slice.call(args)));
  }

  return _DIV;

})(XML);

K.DIV = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_DIV, args, function(){});
};

_DL = (function(superClass) {
  extend(_DL, superClass);

  function _DL() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _DL.__super__.constructor.apply(this, ["dl"].concat(slice.call(args)));
  }

  return _DL;

})(XML);

K.DL = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_DL, args, function(){});
};

_DT = (function(superClass) {
  extend(_DT, superClass);

  function _DT() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _DT.__super__.constructor.apply(this, ["dt"].concat(slice.call(args)));
  }

  return _DT;

})(XML);

K.DT = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_DT, args, function(){});
};

_ELEMENT = (function(superClass) {
  extend(_ELEMENT, superClass);

  function _ELEMENT() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _ELEMENT.__super__.constructor.apply(this, ["element"].concat(slice.call(args)));
  }

  return _ELEMENT;

})(XML);

K.ELEMENT = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_ELEMENT, args, function(){});
};

_EM = (function(superClass) {
  extend(_EM, superClass);

  function _EM() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _EM.__super__.constructor.apply(this, ["em"].concat(slice.call(args)));
  }

  return _EM;

})(XML);

K.EM = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_EM, args, function(){});
};

_EMBED = (function(superClass) {
  extend(_EMBED, superClass);

  function _EMBED() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _EMBED.__super__.constructor.apply(this, ["embed/"].concat(slice.call(args)));
  }

  return _EMBED;

})(XML);

K.EMBED = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_EMBED, args, function(){});
};

_FIELDSET = (function(superClass) {
  extend(_FIELDSET, superClass);

  function _FIELDSET() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _FIELDSET.__super__.constructor.apply(this, ["fieldset"].concat(slice.call(args)));
  }

  return _FIELDSET;

})(XML);

K.FIELDSET = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_FIELDSET, args, function(){});
};

_FIGCAPTION = (function(superClass) {
  extend(_FIGCAPTION, superClass);

  function _FIGCAPTION() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _FIGCAPTION.__super__.constructor.apply(this, ["figcaption"].concat(slice.call(args)));
  }

  return _FIGCAPTION;

})(XML);

K.FIGCAPTION = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_FIGCAPTION, args, function(){});
};

_FIGURE = (function(superClass) {
  extend(_FIGURE, superClass);

  function _FIGURE() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _FIGURE.__super__.constructor.apply(this, ["figure"].concat(slice.call(args)));
  }

  return _FIGURE;

})(XML);

K.FIGURE = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_FIGURE, args, function(){});
};

_FONT = (function(superClass) {
  extend(_FONT, superClass);

  function _FONT() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _FONT.__super__.constructor.apply(this, ["font"].concat(slice.call(args)));
  }

  return _FONT;

})(XML);

K.FONT = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_FONT, args, function(){});
};

_FOOTER = (function(superClass) {
  extend(_FOOTER, superClass);

  function _FOOTER() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _FOOTER.__super__.constructor.apply(this, ["footer"].concat(slice.call(args)));
  }

  return _FOOTER;

})(XML);

K.FOOTER = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_FOOTER, args, function(){});
};

_FORM = (function(superClass) {
  extend(_FORM, superClass);

  function _FORM() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _FORM.__super__.constructor.apply(this, ["form"].concat(slice.call(args)));
  }

  return _FORM;

})(XML);

K.FORM = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_FORM, args, function(){});
};

_FRAME = (function(superClass) {
  extend(_FRAME, superClass);

  function _FRAME() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _FRAME.__super__.constructor.apply(this, ["frame"].concat(slice.call(args)));
  }

  return _FRAME;

})(XML);

K.FRAME = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_FRAME, args, function(){});
};

_FRAMESET = (function(superClass) {
  extend(_FRAMESET, superClass);

  function _FRAMESET() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _FRAMESET.__super__.constructor.apply(this, ["frameset"].concat(slice.call(args)));
  }

  return _FRAMESET;

})(XML);

K.FRAMESET = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_FRAMESET, args, function(){});
};

_H1 = (function(superClass) {
  extend(_H1, superClass);

  function _H1() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _H1.__super__.constructor.apply(this, ["h1"].concat(slice.call(args)));
  }

  return _H1;

})(XML);

K.H1 = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_H1, args, function(){});
};

_H2 = (function(superClass) {
  extend(_H2, superClass);

  function _H2() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _H2.__super__.constructor.apply(this, ["h2"].concat(slice.call(args)));
  }

  return _H2;

})(XML);

K.H2 = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_H2, args, function(){});
};

_H3 = (function(superClass) {
  extend(_H3, superClass);

  function _H3() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _H3.__super__.constructor.apply(this, ["h3"].concat(slice.call(args)));
  }

  return _H3;

})(XML);

K.H3 = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_H3, args, function(){});
};

_H4 = (function(superClass) {
  extend(_H4, superClass);

  function _H4() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _H4.__super__.constructor.apply(this, ["h4"].concat(slice.call(args)));
  }

  return _H4;

})(XML);

K.H4 = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_H4, args, function(){});
};

_H5 = (function(superClass) {
  extend(_H5, superClass);

  function _H5() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _H5.__super__.constructor.apply(this, ["h5"].concat(slice.call(args)));
  }

  return _H5;

})(XML);

K.H5 = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_H5, args, function(){});
};

_H6 = (function(superClass) {
  extend(_H6, superClass);

  function _H6() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _H6.__super__.constructor.apply(this, ["h6"].concat(slice.call(args)));
  }

  return _H6;

})(XML);

K.H6 = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_H6, args, function(){});
};

_HEAD = (function(superClass) {
  extend(_HEAD, superClass);

  function _HEAD() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _HEAD.__super__.constructor.apply(this, ["head"].concat(slice.call(args)));
  }

  return _HEAD;

})(XML);

K.HEAD = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_HEAD, args, function(){});
};

_HEADER = (function(superClass) {
  extend(_HEADER, superClass);

  function _HEADER() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _HEADER.__super__.constructor.apply(this, ["header"].concat(slice.call(args)));
  }

  return _HEADER;

})(XML);

K.HEADER = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_HEADER, args, function(){});
};

_HGROUP = (function(superClass) {
  extend(_HGROUP, superClass);

  function _HGROUP() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _HGROUP.__super__.constructor.apply(this, ["hgroup"].concat(slice.call(args)));
  }

  return _HGROUP;

})(XML);

K.HGROUP = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_HGROUP, args, function(){});
};

_HR = (function(superClass) {
  extend(_HR, superClass);

  function _HR() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _HR.__super__.constructor.apply(this, ["hr/"].concat(slice.call(args)));
  }

  return _HR;

})(XML);

K.HR = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_HR, args, function(){});
};

_HTML = (function(superClass) {
  extend(_HTML, superClass);

  function _HTML() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _HTML.__super__.constructor.apply(this, ["html"].concat(slice.call(args)));
  }

  return _HTML;

})(XML);

K.HTML = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_HTML, args, function(){});
};

_I = (function(superClass) {
  extend(_I, superClass);

  function _I() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _I.__super__.constructor.apply(this, ["i"].concat(slice.call(args)));
  }

  return _I;

})(XML);

K.I = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_I, args, function(){});
};

_IFRAME = (function(superClass) {
  extend(_IFRAME, superClass);

  function _IFRAME() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _IFRAME.__super__.constructor.apply(this, ["iframe"].concat(slice.call(args)));
  }

  return _IFRAME;

})(XML);

K.IFRAME = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_IFRAME, args, function(){});
};

_IMG = (function(superClass) {
  extend(_IMG, superClass);

  function _IMG() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _IMG.__super__.constructor.apply(this, ["img/"].concat(slice.call(args)));
  }

  return _IMG;

})(XML);

K.IMG = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_IMG, args, function(){});
};

_INPUT = (function(superClass) {
  extend(_INPUT, superClass);

  function _INPUT() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _INPUT.__super__.constructor.apply(this, ["input/"].concat(slice.call(args)));
  }

  return _INPUT;

})(XML);

K.INPUT = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_INPUT, args, function(){});
};

_INS = (function(superClass) {
  extend(_INS, superClass);

  function _INS() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _INS.__super__.constructor.apply(this, ["ins"].concat(slice.call(args)));
  }

  return _INS;

})(XML);

K.INS = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_INS, args, function(){});
};

_ISINDEX = (function(superClass) {
  extend(_ISINDEX, superClass);

  function _ISINDEX() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _ISINDEX.__super__.constructor.apply(this, ["isindex"].concat(slice.call(args)));
  }

  return _ISINDEX;

})(XML);

K.ISINDEX = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_ISINDEX, args, function(){});
};

_KBD = (function(superClass) {
  extend(_KBD, superClass);

  function _KBD() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _KBD.__super__.constructor.apply(this, ["kbd"].concat(slice.call(args)));
  }

  return _KBD;

})(XML);

K.KBD = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_KBD, args, function(){});
};

_KEYGEN = (function(superClass) {
  extend(_KEYGEN, superClass);

  function _KEYGEN() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _KEYGEN.__super__.constructor.apply(this, ["keygen/"].concat(slice.call(args)));
  }

  return _KEYGEN;

})(XML);

K.KEYGEN = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_KEYGEN, args, function(){});
};

_LABEL = (function(superClass) {
  extend(_LABEL, superClass);

  function _LABEL() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _LABEL.__super__.constructor.apply(this, ["label"].concat(slice.call(args)));
  }

  return _LABEL;

})(XML);

K.LABEL = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_LABEL, args, function(){});
};

_LEGEND = (function(superClass) {
  extend(_LEGEND, superClass);

  function _LEGEND() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _LEGEND.__super__.constructor.apply(this, ["legend"].concat(slice.call(args)));
  }

  return _LEGEND;

})(XML);

K.LEGEND = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_LEGEND, args, function(){});
};

_LI = (function(superClass) {
  extend(_LI, superClass);

  function _LI() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _LI.__super__.constructor.apply(this, ["li"].concat(slice.call(args)));
  }

  return _LI;

})(XML);

K.LI = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_LI, args, function(){});
};

_LINK = (function(superClass) {
  extend(_LINK, superClass);

  function _LINK() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _LINK.__super__.constructor.apply(this, ["link/"].concat(slice.call(args)));
  }

  return _LINK;

})(XML);

K.LINK = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_LINK, args, function(){});
};

_LISTING = (function(superClass) {
  extend(_LISTING, superClass);

  function _LISTING() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _LISTING.__super__.constructor.apply(this, ["listing"].concat(slice.call(args)));
  }

  return _LISTING;

})(XML);

K.LISTING = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_LISTING, args, function(){});
};

_MAIN = (function(superClass) {
  extend(_MAIN, superClass);

  function _MAIN() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _MAIN.__super__.constructor.apply(this, ["main"].concat(slice.call(args)));
  }

  return _MAIN;

})(XML);

K.MAIN = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_MAIN, args, function(){});
};

_MAP = (function(superClass) {
  extend(_MAP, superClass);

  function _MAP() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _MAP.__super__.constructor.apply(this, ["map"].concat(slice.call(args)));
  }

  return _MAP;

})(XML);

K.MAP = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_MAP, args, function(){});
};

_MARK = (function(superClass) {
  extend(_MARK, superClass);

  function _MARK() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _MARK.__super__.constructor.apply(this, ["mark"].concat(slice.call(args)));
  }

  return _MARK;

})(XML);

K.MARK = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_MARK, args, function(){});
};

_MARQUEE = (function(superClass) {
  extend(_MARQUEE, superClass);

  function _MARQUEE() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _MARQUEE.__super__.constructor.apply(this, ["marquee"].concat(slice.call(args)));
  }

  return _MARQUEE;

})(XML);

K.MARQUEE = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_MARQUEE, args, function(){});
};

_MENU = (function(superClass) {
  extend(_MENU, superClass);

  function _MENU() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _MENU.__super__.constructor.apply(this, ["menu"].concat(slice.call(args)));
  }

  return _MENU;

})(XML);

K.MENU = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_MENU, args, function(){});
};

_MENUITEM = (function(superClass) {
  extend(_MENUITEM, superClass);

  function _MENUITEM() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _MENUITEM.__super__.constructor.apply(this, ["menuitem"].concat(slice.call(args)));
  }

  return _MENUITEM;

})(XML);

K.MENUITEM = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_MENUITEM, args, function(){});
};

_META = (function(superClass) {
  extend(_META, superClass);

  function _META() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _META.__super__.constructor.apply(this, ["meta/"].concat(slice.call(args)));
  }

  return _META;

})(XML);

K.META = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_META, args, function(){});
};

_METER = (function(superClass) {
  extend(_METER, superClass);

  function _METER() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _METER.__super__.constructor.apply(this, ["meter"].concat(slice.call(args)));
  }

  return _METER;

})(XML);

K.METER = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_METER, args, function(){});
};

_NAV = (function(superClass) {
  extend(_NAV, superClass);

  function _NAV() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _NAV.__super__.constructor.apply(this, ["nav"].concat(slice.call(args)));
  }

  return _NAV;

})(XML);

K.NAV = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_NAV, args, function(){});
};

_NOBR = (function(superClass) {
  extend(_NOBR, superClass);

  function _NOBR() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _NOBR.__super__.constructor.apply(this, ["nobr"].concat(slice.call(args)));
  }

  return _NOBR;

})(XML);

K.NOBR = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_NOBR, args, function(){});
};

_NOFRAMES = (function(superClass) {
  extend(_NOFRAMES, superClass);

  function _NOFRAMES() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _NOFRAMES.__super__.constructor.apply(this, ["noframes"].concat(slice.call(args)));
  }

  return _NOFRAMES;

})(XML);

K.NOFRAMES = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_NOFRAMES, args, function(){});
};

_NOSCRIPT = (function(superClass) {
  extend(_NOSCRIPT, superClass);

  function _NOSCRIPT() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _NOSCRIPT.__super__.constructor.apply(this, ["noscript"].concat(slice.call(args)));
  }

  return _NOSCRIPT;

})(XML);

K.NOSCRIPT = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_NOSCRIPT, args, function(){});
};

_OBJECT = (function(superClass) {
  extend(_OBJECT, superClass);

  function _OBJECT() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _OBJECT.__super__.constructor.apply(this, ["object"].concat(slice.call(args)));
  }

  return _OBJECT;

})(XML);

K.OBJECT = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_OBJECT, args, function(){});
};

_OL = (function(superClass) {
  extend(_OL, superClass);

  function _OL() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _OL.__super__.constructor.apply(this, ["ol"].concat(slice.call(args)));
  }

  return _OL;

})(XML);

K.OL = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_OL, args, function(){});
};

_OPTGROUP = (function(superClass) {
  extend(_OPTGROUP, superClass);

  function _OPTGROUP() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _OPTGROUP.__super__.constructor.apply(this, ["optgroup"].concat(slice.call(args)));
  }

  return _OPTGROUP;

})(XML);

K.OPTGROUP = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_OPTGROUP, args, function(){});
};

_OPTION = (function(superClass) {
  extend(_OPTION, superClass);

  function _OPTION() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _OPTION.__super__.constructor.apply(this, ["option"].concat(slice.call(args)));
  }

  return _OPTION;

})(XML);

K.OPTION = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_OPTION, args, function(){});
};

_OUTPUT = (function(superClass) {
  extend(_OUTPUT, superClass);

  function _OUTPUT() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _OUTPUT.__super__.constructor.apply(this, ["output"].concat(slice.call(args)));
  }

  return _OUTPUT;

})(XML);

K.OUTPUT = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_OUTPUT, args, function(){});
};

_P = (function(superClass) {
  extend(_P, superClass);

  function _P() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _P.__super__.constructor.apply(this, ["p"].concat(slice.call(args)));
  }

  return _P;

})(XML);

K.P = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_P, args, function(){});
};

_PARAM = (function(superClass) {
  extend(_PARAM, superClass);

  function _PARAM() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _PARAM.__super__.constructor.apply(this, ["param/"].concat(slice.call(args)));
  }

  return _PARAM;

})(XML);

K.PARAM = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_PARAM, args, function(){});
};

_PLAINTEXT = (function(superClass) {
  extend(_PLAINTEXT, superClass);

  function _PLAINTEXT() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _PLAINTEXT.__super__.constructor.apply(this, ["plaintext"].concat(slice.call(args)));
  }

  return _PLAINTEXT;

})(XML);

K.PLAINTEXT = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_PLAINTEXT, args, function(){});
};

_PRE = (function(superClass) {
  extend(_PRE, superClass);

  function _PRE() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _PRE.__super__.constructor.apply(this, ["pre"].concat(slice.call(args)));
  }

  return _PRE;

})(XML);

K.PRE = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_PRE, args, function(){});
};

_PROGRESS = (function(superClass) {
  extend(_PROGRESS, superClass);

  function _PROGRESS() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _PROGRESS.__super__.constructor.apply(this, ["progress"].concat(slice.call(args)));
  }

  return _PROGRESS;

})(XML);

K.PROGRESS = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_PROGRESS, args, function(){});
};

_Q = (function(superClass) {
  extend(_Q, superClass);

  function _Q() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _Q.__super__.constructor.apply(this, ["q"].concat(slice.call(args)));
  }

  return _Q;

})(XML);

K.Q = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_Q, args, function(){});
};

_RP = (function(superClass) {
  extend(_RP, superClass);

  function _RP() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _RP.__super__.constructor.apply(this, ["rp"].concat(slice.call(args)));
  }

  return _RP;

})(XML);

K.RP = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_RP, args, function(){});
};

_RT = (function(superClass) {
  extend(_RT, superClass);

  function _RT() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _RT.__super__.constructor.apply(this, ["rt"].concat(slice.call(args)));
  }

  return _RT;

})(XML);

K.RT = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_RT, args, function(){});
};

_RUBY = (function(superClass) {
  extend(_RUBY, superClass);

  function _RUBY() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _RUBY.__super__.constructor.apply(this, ["ruby"].concat(slice.call(args)));
  }

  return _RUBY;

})(XML);

K.RUBY = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_RUBY, args, function(){});
};

_S = (function(superClass) {
  extend(_S, superClass);

  function _S() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _S.__super__.constructor.apply(this, ["s"].concat(slice.call(args)));
  }

  return _S;

})(XML);

K.S = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_S, args, function(){});
};

_SAMP = (function(superClass) {
  extend(_SAMP, superClass);

  function _SAMP() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _SAMP.__super__.constructor.apply(this, ["samp"].concat(slice.call(args)));
  }

  return _SAMP;

})(XML);

K.SAMP = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_SAMP, args, function(){});
};

_SCRIPT = (function(superClass) {
  extend(_SCRIPT, superClass);

  function _SCRIPT() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _SCRIPT.__super__.constructor.apply(this, ["script"].concat(slice.call(args)));
  }

  return _SCRIPT;

})(XML);

K.SCRIPT = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_SCRIPT, args, function(){});
};

_SECTION = (function(superClass) {
  extend(_SECTION, superClass);

  function _SECTION() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _SECTION.__super__.constructor.apply(this, ["section"].concat(slice.call(args)));
  }

  return _SECTION;

})(XML);

K.SECTION = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_SECTION, args, function(){});
};

_SELECT = (function(superClass) {
  extend(_SELECT, superClass);

  function _SELECT() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _SELECT.__super__.constructor.apply(this, ["select"].concat(slice.call(args)));
  }

  return _SELECT;

})(XML);

K.SELECT = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_SELECT, args, function(){});
};

_SHADOW = (function(superClass) {
  extend(_SHADOW, superClass);

  function _SHADOW() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _SHADOW.__super__.constructor.apply(this, ["shadow"].concat(slice.call(args)));
  }

  return _SHADOW;

})(XML);

K.SHADOW = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_SHADOW, args, function(){});
};

_SMALL = (function(superClass) {
  extend(_SMALL, superClass);

  function _SMALL() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _SMALL.__super__.constructor.apply(this, ["small"].concat(slice.call(args)));
  }

  return _SMALL;

})(XML);

K.SMALL = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_SMALL, args, function(){});
};

_SOURCE = (function(superClass) {
  extend(_SOURCE, superClass);

  function _SOURCE() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _SOURCE.__super__.constructor.apply(this, ["source/"].concat(slice.call(args)));
  }

  return _SOURCE;

})(XML);

K.SOURCE = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_SOURCE, args, function(){});
};

_SPACER = (function(superClass) {
  extend(_SPACER, superClass);

  function _SPACER() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _SPACER.__super__.constructor.apply(this, ["spacer"].concat(slice.call(args)));
  }

  return _SPACER;

})(XML);

K.SPACER = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_SPACER, args, function(){});
};

_SPAN = (function(superClass) {
  extend(_SPAN, superClass);

  function _SPAN() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _SPAN.__super__.constructor.apply(this, ["span"].concat(slice.call(args)));
  }

  return _SPAN;

})(XML);

K.SPAN = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_SPAN, args, function(){});
};

_STRIKE = (function(superClass) {
  extend(_STRIKE, superClass);

  function _STRIKE() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _STRIKE.__super__.constructor.apply(this, ["strike"].concat(slice.call(args)));
  }

  return _STRIKE;

})(XML);

K.STRIKE = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_STRIKE, args, function(){});
};

_STRONG = (function(superClass) {
  extend(_STRONG, superClass);

  function _STRONG() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _STRONG.__super__.constructor.apply(this, ["strong"].concat(slice.call(args)));
  }

  return _STRONG;

})(XML);

K.STRONG = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_STRONG, args, function(){});
};

_STYLE = (function(superClass) {
  extend(_STYLE, superClass);

  function _STYLE() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _STYLE.__super__.constructor.apply(this, ["style"].concat(slice.call(args)));
  }

  return _STYLE;

})(XML);

K.STYLE = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_STYLE, args, function(){});
};

_SUB = (function(superClass) {
  extend(_SUB, superClass);

  function _SUB() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _SUB.__super__.constructor.apply(this, ["sub"].concat(slice.call(args)));
  }

  return _SUB;

})(XML);

K.SUB = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_SUB, args, function(){});
};

_SUMMARY = (function(superClass) {
  extend(_SUMMARY, superClass);

  function _SUMMARY() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _SUMMARY.__super__.constructor.apply(this, ["summary"].concat(slice.call(args)));
  }

  return _SUMMARY;

})(XML);

K.SUMMARY = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_SUMMARY, args, function(){});
};

_SUP = (function(superClass) {
  extend(_SUP, superClass);

  function _SUP() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _SUP.__super__.constructor.apply(this, ["sup"].concat(slice.call(args)));
  }

  return _SUP;

})(XML);

K.SUP = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_SUP, args, function(){});
};

_TABLE = (function(superClass) {
  extend(_TABLE, superClass);

  function _TABLE() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _TABLE.__super__.constructor.apply(this, ["table"].concat(slice.call(args)));
  }

  return _TABLE;

})(XML);

K.TABLE = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_TABLE, args, function(){});
};

_TBODY = (function(superClass) {
  extend(_TBODY, superClass);

  function _TBODY() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _TBODY.__super__.constructor.apply(this, ["tbody"].concat(slice.call(args)));
  }

  return _TBODY;

})(XML);

K.TBODY = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_TBODY, args, function(){});
};

_TD = (function(superClass) {
  extend(_TD, superClass);

  function _TD() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _TD.__super__.constructor.apply(this, ["td"].concat(slice.call(args)));
  }

  return _TD;

})(XML);

K.TD = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_TD, args, function(){});
};

_TEMPLATE = (function(superClass) {
  extend(_TEMPLATE, superClass);

  function _TEMPLATE() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _TEMPLATE.__super__.constructor.apply(this, ["template"].concat(slice.call(args)));
  }

  return _TEMPLATE;

})(XML);

K.TEMPLATE = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_TEMPLATE, args, function(){});
};

_TEXTAREA = (function(superClass) {
  extend(_TEXTAREA, superClass);

  function _TEXTAREA() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _TEXTAREA.__super__.constructor.apply(this, ["textarea"].concat(slice.call(args)));
  }

  return _TEXTAREA;

})(XML);

K.TEXTAREA = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_TEXTAREA, args, function(){});
};

_TFOOT = (function(superClass) {
  extend(_TFOOT, superClass);

  function _TFOOT() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _TFOOT.__super__.constructor.apply(this, ["tfoot"].concat(slice.call(args)));
  }

  return _TFOOT;

})(XML);

K.TFOOT = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_TFOOT, args, function(){});
};

_TH = (function(superClass) {
  extend(_TH, superClass);

  function _TH() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _TH.__super__.constructor.apply(this, ["th"].concat(slice.call(args)));
  }

  return _TH;

})(XML);

K.TH = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_TH, args, function(){});
};

_THEAD = (function(superClass) {
  extend(_THEAD, superClass);

  function _THEAD() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _THEAD.__super__.constructor.apply(this, ["thead"].concat(slice.call(args)));
  }

  return _THEAD;

})(XML);

K.THEAD = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_THEAD, args, function(){});
};

_TIME = (function(superClass) {
  extend(_TIME, superClass);

  function _TIME() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _TIME.__super__.constructor.apply(this, ["time"].concat(slice.call(args)));
  }

  return _TIME;

})(XML);

K.TIME = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_TIME, args, function(){});
};

_TITLE = (function(superClass) {
  extend(_TITLE, superClass);

  function _TITLE() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _TITLE.__super__.constructor.apply(this, ["title"].concat(slice.call(args)));
  }

  return _TITLE;

})(XML);

K.TITLE = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_TITLE, args, function(){});
};

_TR = (function(superClass) {
  extend(_TR, superClass);

  function _TR() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _TR.__super__.constructor.apply(this, ["tr"].concat(slice.call(args)));
  }

  return _TR;

})(XML);

K.TR = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_TR, args, function(){});
};

_TRACK = (function(superClass) {
  extend(_TRACK, superClass);

  function _TRACK() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _TRACK.__super__.constructor.apply(this, ["track/"].concat(slice.call(args)));
  }

  return _TRACK;

})(XML);

K.TRACK = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_TRACK, args, function(){});
};

_TT = (function(superClass) {
  extend(_TT, superClass);

  function _TT() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _TT.__super__.constructor.apply(this, ["tt"].concat(slice.call(args)));
  }

  return _TT;

})(XML);

K.TT = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_TT, args, function(){});
};

_U = (function(superClass) {
  extend(_U, superClass);

  function _U() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _U.__super__.constructor.apply(this, ["u"].concat(slice.call(args)));
  }

  return _U;

})(XML);

K.U = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_U, args, function(){});
};

_UL = (function(superClass) {
  extend(_UL, superClass);

  function _UL() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _UL.__super__.constructor.apply(this, ["ul"].concat(slice.call(args)));
  }

  return _UL;

})(XML);

K.UL = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_UL, args, function(){});
};

_VAR = (function(superClass) {
  extend(_VAR, superClass);

  function _VAR() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _VAR.__super__.constructor.apply(this, ["var"].concat(slice.call(args)));
  }

  return _VAR;

})(XML);

K.VAR = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_VAR, args, function(){});
};

_VIDEO = (function(superClass) {
  extend(_VIDEO, superClass);

  function _VIDEO() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _VIDEO.__super__.constructor.apply(this, ["video"].concat(slice.call(args)));
  }

  return _VIDEO;

})(XML);

K.VIDEO = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_VIDEO, args, function(){});
};

_WBR = (function(superClass) {
  extend(_WBR, superClass);

  function _WBR() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _WBR.__super__.constructor.apply(this, ["wbr/"].concat(slice.call(args)));
  }

  return _WBR;

})(XML);

K.WBR = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_WBR, args, function(){});
};

_XMP = (function(superClass) {
  extend(_XMP, superClass);

  function _XMP() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    _XMP.__super__.constructor.apply(this, ["xmp"].concat(slice.call(args)));
  }

  return _XMP;

})(XML);

K.XMP = function() {
  var args;
  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
  return (function(func, args, ctor) {
    ctor.prototype = func.prototype;
    var child = new ctor, result = func.apply(child, args);
    return Object(result) === result ? result : child;
  })(_XMP, args, function(){});
};
