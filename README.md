#wp_image_uploader

### Introduction
wp image uploader provides an easy to use interface for creating custom image upload buttons in WordPress. While currently not as flexible as extending wp.media directly, it does have some useful customizations.

### Installation
Clone or download this repo to your WordPress project's plugin directory, and activate it.
```sh
$ git clone https://github.com/mrbobbybryant/wp_image_uploader.git
```
### Getting Started
The current API for wp image uploader is Javascript based, and only has one public method. To register a new upload button you simply provide the id for the div where want the upload button to appear. This will usually be a metabox div id. 

Next tell wp_image_uploader if you want the output to be a button, or a link. To Make an Image upload that is a link, like the featured image uploader in WordPress, you would do something like this:
```javascript
var uploadOne = imageUploader();
uploadOne.init( 'image-one', 'link', {} );
```

Here on line one, I have created a new instance of wp image uploader. On line two I've called the ```init()``` method. The first argument I have provided is the div I wish to insert the uploader into.

The second argument is the type of uploader I want. The two choices are ```button``` or ```link```. 

The last item is an empty object. In next example we will see what that is all about. But for now thats all it takes to create an image uploader. If you were to look at this metabox in the WordPress admin, you would see an upload button or link. Clicking the link will open to modal, and once an image is selected, wp image upload will insert that image into the metabox. Pretty Cool Huh?

As I hinted at before the  ```init()``` method also accepts an object as the third parameter. This object will allow you to customize the various bits of text that are part of the image upload modal. Here is a breakdown of the options.
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
