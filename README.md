Koala HTML
==========

Update: Function wrapper instead of class instantiation
-------------------------------------------------------

```javascript
DIV();
DIV(P());
DIV(P('hello!'), {class: 'myClass'});
```

Update: Smart instantiation
---------------------------

No need now to declare de object with null when no properties are provided and there is no correct order to the properties
The following instatiations are all valid

```javascript
new DIV();
new DIV(new P());
new DIV(new P('hello!'), {class: 'myClass'});
```

Update: Verbosity added :)
--------------------------

There is one easier way to use, when the object get's long and you catch yourself iterating trough lots of tag.content[n]
Let's pick the structure bellow:

```html
<div class="row event first">
    <div class="small-3 columns" align="center">
        <img src="" width="30" alt="">
    </div>
    <div class="small-6 columns">
        <b></b>
        <p></p>
    </div>
    <div class="small-3 columns">
        <h3></h3>
        <small></small>
    </div>
</div>
```

Imagine populating it whith JSON data received from somewhere

```javascript
// Create
var structure = 
    new DIV({class: ['row', 'event']},
        new DIV({class: ['small-3', 'columns'], align: 'center'},
            new IMG({src: '', width: 30, alt: ''})),
        new DIV({class: ['small-6', 'columns']},
            new B(),
            new P()),
        new DIV({class: ['small-3', 'columns']},
            new H3(),
            new SMALL()));
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

// Print
body.innerHTML = structure.xml();
```
Much easier isn't?
I thougth so


Intro
-----

Just some HTML entities to help you build a HTML response like:

```javascript
  return new DIV(
    {id: 'wrapper'},
    new H1('I\'m a Header!'),
    new P('I\'m a paragraph!!'),
    new DIV(
        {class: ['button', 'success', 'large']},
        'I\'m a button!')).xml()
```

Yes you need to call XML to convert everything to TAGs and readable HTML
I made that inspired on web2py HTML helper, whitouth calling the XML function you can manipulate the elements like bellow:

```javascript
var body = document.getElementsByTagName('body')[0];
// Create
var header = new DIV({
    class: ['class1', 'class2', 'class3'],
    id: 'first'},
    new H2(null, 'Header!'),
    new P('A paragraph...'));
// Edit
header.content[1].attributes['class'] = ['class1', 'class2', 'class3', 'class4'];
header.p.attributes['class'] = ['class1', 'class2', 'class3', 'class4'];
// Print
body.innerHTML = header.xml();
// Edit again
var content = new DIV({
    id: 'content',
    class: ['twelve', 'columns', 'panel']},
    new P('Content Text')
);
header.content.push(content);
// Print again
body.innerHTML = header.xml();
```

The Future
==========

 - Change render form: from string nodes to DOM 


Considerations
==============

Wife and coffee
Thanks for reading
