Koala HTML
==========

Just some HTML entities to help you build a HTML response like:

```javascript
  return new DIV(
    {id: 'wrapper'},
    new H1(null, 'I\'m a Header!'),
    new P(null, 'I\'m a paragraph!!'),
    new DIV(
        {class: ['button', 'success', 'large']},
        'I\'m a button!')).xml()
```

The code is as simples as possible, following the MISS philosophy, try to maintain it
I would appreciate some optimization too.

Yes you need to call XML to convert everything to TAGs and readable HTML
I made that inspired on web2py HTML helper, whitouth calling the XML function you can manipulate the elements like bellow:

```javascript
var body = document.getElementsByTagName('body')[0];
// Create
var header = new DIV({
    class: ['class1', 'class2', 'class3'],
    id: 'first'},
    new H2(null, 'Header!'),
    new P(null, 'A paragraph...'));
// Edit
header.content[1].attributes['class'] = ['class1', 'class2', 'class3', 'class4'];
// Print
body.innerHTML = header.xml();
// Edit again
var content = new DIV({
    id: 'content',
    class: ['twelve', 'columns', 'panel']},
    new P(null, 'Content Text')
);
header.content.push(content);
// Print again
body.innerHTML = header.xml();
```

There is a verobisty form of use, when the object get's long and you catch yourself iterating trough lots of tag.content[n]
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

The Future
==========

There's not much future to it, since I saw jade, but I think jade doesn't help much when you want to process HTML as a javascript object...

Considerations
==============

Wife and coffee

Thanks for reading
