var A, DIV, H1, H2, H3, H4, H5, IMG, LI, P, SMALL, SPAN, UL, XML, type,
    __slice = Array.prototype.slice,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

type = function(obj) {
    var classToType, myClass, name, _i, _len, _ref;
    if (obj === void 0 || obj === null) return String(obj);
    classToType = new Object;
    _ref = "Boolean Number String Function Array Date RegExp".split(" ");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        classToType["[object " + name + "]"] = name.toLowerCase();
    }
    myClass = Object.prototype.toString.call(obj);
    if (myClass in classToType) return classToType[myClass];
    return "object";
};

XML = (function() {

    function XML() {
        var attributes, content, tag;
        tag = arguments[0], attributes = arguments[1], content = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
        this.tag = tag;
        this.attributes = attributes;
        this.content = content;
        this.selfclose = false;
        if (this.tag.slice(-1) === '/') {
            this.selfclose = true;
            this.tag = this.tag.slice(0, -1);
        }
        if (!this.attributes) this.attributes = {};
    }

    XML.prototype._convert_attributes = function() {
        var key, value, values;
        values = (function() {
            var _ref, _results;
            _ref = this.attributes;
            _results = [];
            for (key in _ref) {
                value = _ref[key];
                value = type(value) === 'array' ? value.join(" ") : value;
                _results.push("" + key + "=\"" + value + "\"");
            }
            return _results;
        }).call(this);
        return this.converted_attributes = this.attributes ? " " + (values.join(" ")) : "";
    };

    XML.prototype._convert_content = function() {
        var c, contents;
        contents = (function() {
            var _i, _len, _ref, _results;
            _ref = this.content;
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                c = _ref[_i];
                if (type(c) === 'object') {
                    _results.push(c.xml());
                } else {
                    _results.push(c);
                }
            }
            return _results;
        }).call(this);
        return this.converted_content = contents.join(' ');
    };

    XML.prototype.xml = function() {
        this._convert_attributes();
        this._convert_content();
        if (this.selfclose === true) {
            return "<" + this.tag + this.converted_attributes + "/&gt;";
        } else if (this.selfclose === false) {
            return "<" + this.tag + this.converted_attributes + ">" + this.converted_content + "</" + this.tag + ">";
        }
    };

    return XML;

})();

DIV = (function(_super) {

    __extends(DIV, _super);

    function DIV() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        DIV.__super__.constructor.apply(this, ["div"].concat(__slice.call(args)));
    }

    return DIV;

})(XML);

H1 = (function(_super) {

    __extends(H1, _super);

    function H1() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        H1.__super__.constructor.apply(this, ["h1"].concat(__slice.call(args)));
    }

    return H1;

})(XML);

H2 = (function(_super) {

    __extends(H2, _super);

    function H2() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        H2.__super__.constructor.apply(this, ["h2"].concat(__slice.call(args)));
    }

    return H2;

})(XML);

H3 = (function(_super) {

    __extends(H3, _super);

    function H3() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        H3.__super__.constructor.apply(this, ["h3"].concat(__slice.call(args)));
    }

    return H3;

})(XML);

H4 = (function(_super) {

    __extends(H4, _super);

    function H4() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        H4.__super__.constructor.apply(this, ["h4"].concat(__slice.call(args)));
    }

    return H4;

})(XML);

H5 = (function(_super) {

    __extends(H5, _super);

    function H5() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        H5.__super__.constructor.apply(this, ["h5"].concat(__slice.call(args)));
    }

    return H5;

})(XML);

UL = (function(_super) {

    __extends(UL, _super);

    function UL() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        UL.__super__.constructor.apply(this, ["ul"].concat(__slice.call(args)));
    }

    return UL;

})(XML);

LI = (function(_super) {

    __extends(LI, _super);

    function LI() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        LI.__super__.constructor.apply(this, ["li"].concat(__slice.call(args)));
    }

    return LI;

})(XML);

A = (function(_super) {

    __extends(A, _super);

    function A() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        A.__super__.constructor.apply(this, ["a"].concat(__slice.call(args)));
    }

    return A;

})(XML);

P = (function(_super) {

    __extends(P, _super);

    function P() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        P.__super__.constructor.apply(this, ["p"].concat(__slice.call(args)));
    }

    return P;

})(XML);

SPAN = (function(_super) {

    __extends(SPAN, _super);

    function SPAN() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        SPAN.__super__.constructor.apply(this, ["span"].concat(__slice.call(args)));
    }

    return SPAN;

})(XML);

SMALL = (function(_super) {

    __extends(SMALL, _super);

    function SMALL() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        SMALL.__super__.constructor.apply(this, ["small"].concat(__slice.call(args)));
    }

    return SMALL;

})(XML);

IMG = (function(_super) {

    __extends(IMG, _super);

    function IMG() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        IMG.__super__.constructor.apply(this, ["img/", null].concat(__slice.call(args)));
    }

    return IMG;

})(XML);