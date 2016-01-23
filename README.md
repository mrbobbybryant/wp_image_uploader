#wp_image_uploader

### Introduction
wp image uploader provides an easy to use interface for creating custom image upload buttons in WordPress. While currently not as flexible as extending wp.media directly, it does have some useful customizations.

### Installation
Clone or download this repo to your WordPress project's plugin directory, and activate it.
```sh
$ git clone https://github.com/mrbobbybryant/wp_image_uploader.git
```
### Getting Started
The current API for wp image uploader is Javascript based, and only has one public method. To register a new upload button you simply provide the id for the div you wish to inject the upload button into, and tell wp image uploader if you want the output to in fact be a button, or a string of text. Similar to the featured image metabox. It would look something like this.
```javascript
var uploadOne = imageUploader();
uploadOne.init( 'image-one', 'link' );
```

Here one line one, I have created a new instance of wp image uploader. One line two I've called the ```init()``` method. The first argument I have provided is the div I wish to insert the uploader into. I will show an example metabox in a minute, but in the example I have a metabox with an empty div tag, with the ID of 'image-one'. 

The second argument is the type of uploader I want. The two choices are ```button``` or ```link```. That is all it takes. If you were to look at this metabox in the WordPress admin, you would see an upload button or link. Clicking the link will open to modal. and once an image is selected, wp image upload will insert that image into the metabox.

The ```init()``` method also accepts an optional third parameter. This argument accepts an object, which allows you to customize the various bits of text that are part of the image upload modal. Here is a breakdown of the options.
```javascript
{ 
  addButton: 'Click Me!', \\This would be the actual button or link text
  deleteButton: 'Delete Image' \\This is the text of the button once an image has been selected.
  modalTitle: 'Choose your Image' \\ This is the text in the modal. It can be seen in the top left corner.
  modalButtonText: 'Select this Image' \\This is the modal button text. It can be seen in the bottom right corner.
}
```

For example, let say we want to change the default text for the addButton and the modalTitle. Our original ```init()``` call would now look like this:
```javascript
var uploadOne = imageUploader();
uploadOne.init( 'image-one', 'link', { addButton: 'Click Me!', modalTitle: "New Modal Text" } );
```
