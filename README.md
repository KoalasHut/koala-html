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


The Future
==========

There's not much future to it, since I saw jade, but I think jade doesn't help much when you want to process HTML as a javascript object...

Considerations
==============

Wife and coffee

Thanks for reading