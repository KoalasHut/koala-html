Koala HTML
==========

Just some HTML entities to help you build a HTML response like.
I made that inspired on web2py HTML helper, you can manipulate the elements however you like and call *.xml()* to compile it to xml.

Install
-------

`bower install koala-html --save`

Contribute
----------

`bower install koala-html --save`

`npm install`

Then you have the grunt commands:

* `grunt dist` run both commands below in sequence
* `grunt build` compile coffee file to JS
* `grunt min` uglify generated .JS and create map file

TAGs are simple functions
-------------------------------------------------------

```javascript
DIV().xml(); // => <div></div>
DIV(A()).xml(); // => <div><a></a></div>
```

Append and Remove Elements
-------------------------------------------------------

```javascript
var el = DIV('H');
el.append(DIV('e')); // Insert a div inside el
el.append(DIV('ll')); // Insert another div in the end
el.div[2].append(DIV('0')); // Insert a div inside 'll'
console.log(el.xml());
```

```html
<div>H 
    <div>e</div>
    <div>ll 
        <div>0</div>
    </div>
</div> 
```

Remove is the same all you must do is pass the index and how many elements you want to remove

```javascript
el.remove(1); // Remove element at Index 1 [div('e')]
// To remove both would be el.remove(1,2)
console.log(el.xml());
```

```html
<div>H 
    <div>ll 
        <div>0</div>
    </div>
</div> 
```

For more details on how to use append and remove pay close attention to [Splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) js function

List of TAGs
------------

There is a json file used to generate the code for the tags, it can be updated and generated at anytime
Tags with */* at the end, means self-close

* a
* abbr
* acronym
* address
* applet
* area/
* article
* aside
* audio
* b
* base/
* basefont
* bdi
* bdo
* bgsound
* big
* blink
* blockquote
* body
* br/
* button
* canvas
* caption
* center
* cite
* code
* col/
* colgroup
* content
* data
* datalist
* dd
* decorator
* del
* details
* dfn
* dir
* div
* dl
* dt
* element
* em
* embed/
* fieldset
* figcaption
* figure
* font
* footer
* form
* frame
* frameset
* h1
* h2
* h3
* h4
* h5
* h6
* head
* header
* hgroup
* hr/
* html
* i
* iframe
* img/
* input/
* ins
* isindex
* kbd
* keygen/
* label
* legend
* li
* link/
* listing
* main
* map
* mark
* marquee
* menu
* menuitem
* meta/
* meter
* nav
* nobr
* noframes
* noscript
* object
* ol
* optgroup
* option
* output
* p
* param/
* plaintext
* pre
* progress
* q
* rp
* rt
* ruby
* s
* samp
* script
* section
* select
* shadow
* small
* source/
* spacer
* span
* strike
* strong
* style
* sub
* summary
* sup
* table
* tbody
* td
* template
* textarea
* tfoot
* th
* thead
* time
* title
* tr
* track/
* tt
* u
* ul
* var
* video
* wbr/
* xmp

If you want to change the tags, edit the tags.json file and use the generator script.
Everything is inside *tools/tag-generator*

Also delete everything in the coffee file below the comment:

`# GENERATED TAGS`

And run:

`python generate.py`

Verbosity that helps
--------------------

When creating list of elements they are mapped by the tagname so you can pick by the tagname[index]
Let's pick the structure bellow:

```html
<div class="row">
    <div class="col">
        <img src="" width="30" alt="">
    </div>
    <div class="col">
        <b></b>
        <p></p>
    </div>
    <div class="col">
        <h3></h3>
        <small></small>
    </div>
</div>
```

Imagine populating it whith JSON data received from somewhere, would be painfull without some classes
and identifiers to pick the exact element, that's the why we mapped them

```javascript
// Create
var structure = 
    DIV({class: 'row'},
        DIV({class: 'col'},
            IMG({src: '', width: 30, alt: ''})
        ),
        DIV({class: 'col'},
            B(),
            P()
        ),
        DIV({class: 'col'},
            H3(),
            SMALL()
        )
    );
// Edit            

// First Column
structure.div[0].img.src(data.image);
structure.div[0].img.alt(data.title);

// Second Column
structure.div[1].b.text(data.title);
structure.div[1].p.text(data.description);

// Third Column
structure.div[2].h3.text(data.header);
structure.div[2].small.text(data.smallText);
```
Much easier isn't?
I thougth so

The Future
==========

 - Change render form: from string nodes to DOM 


Considerations
==============

Wife and coffee

Thanks for reading
