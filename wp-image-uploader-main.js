/**
 * Created by Bobby on 1/13/16.
 */

var imageUploader = function() {

    var modalTitle;
    var modalButtonText;
    var addButtonText;
    var deleteButtonText;
    var addButton;
    var deleteElement;
    var hiddenElement;
    var imgElement;
    var mainDiv;
    var customUploader;

    var init = function( id, type, title ) {
        addButtonText =  title.addButton = typeof title.addButton !== 'undefined' ? title.addButton : 'Add Image';
        deleteButtonText = title.deleteButton = typeof title.deleteButton !== 'undefined' ? title.deleteButton : 'Remove Image';
        modalTitle = title.modalTitle = typeof title.modalTitle !== 'undefined' ? title.modalTitle : 'Select or Upload Media';
        modalButtonText = title.modalButtonText = typeof title.modalButtonText !== 'undefined' ? title.modalButtonText : 'Use this media';

        customUploader = wp.media({
            title: modalTitle,
            button: {
                text: modalButtonText
            },
            multiple: false
        });

        createUploadElement( id , type );

        addButton = document.getElementById( id + '-image-upload-button' );
        deleteElement = document.getElementById( id + '-image-delete-button' );
        hiddenElement = document.getElementById( id + '-hidden-field' );
        imgElement = document.getElementById( id + '-img-tag' );
        mainDiv = document.getElementById( id + '-upload-wrapper' );
        addLink = document.getElementById( id + '-image-upload-text' );
        deleteLink = document.getElementById( id + '-image-delete-text' );
        registerEvents();
    };

    var registerEvents = function() {
        addButton.addEventListener( 'click', imgUploadCallback );
        customUploader.on( 'select', addImage );
        deleteElement.addEventListener( 'click', deleteImage );
    };

    var createUploadElement = function( id, type ) {
        var addButton;
        var deleteButton;
        var targetEl = document.getElementById( id );
        var mainDiv = document.createElement( 'div' );
        mainDiv.setAttribute( 'id', id + '-upload-wrapper' );

        var img = document.createElement( 'img' );
        img.setAttribute( 'id', id + '-img-tag' );

        var hidden = document.createElement( 'input' );
        hidden.setAttribute( 'type', 'hidden' );
        hidden.setAttribute( 'id', id + '-hidden-field' );

        if ( 'button' === type ) {
            addButton = document.createElement( 'input' );
            addButton.setAttribute( 'type', 'button' );
            addButton.setAttribute( 'class', 'button' );
            addButton.setAttribute( 'id', id + '-image-upload-button' );
            addButton.setAttribute( 'value', addButtonText );

            deleteButton = document.createElement( 'input' );
            deleteButton.setAttribute( 'type', 'button' );
            deleteButton.setAttribute( 'class', 'button' );
            deleteButton.setAttribute( 'id', id + '-image-delete-button' );
            deleteButton.setAttribute( 'value', deleteButtonText );
            deleteButton.style.display = "none";
        }

        if ( 'link' === type ) {
            addButton = document.createElement( 'a' );
            addButton.setAttribute( 'id', id + '-image-upload-button' );
            addButton.setAttribute( 'href', '#' );
            addButton.innerHTML = addButtonText;

            deleteButton = document.createElement( 'a' );
            deleteButton.setAttribute( 'id', id + '-image-delete-button' );
            deleteButton.setAttribute( 'href', '#' );
            deleteButton.innerHTML = deleteButtonText;
            deleteButton.style.display = "none";
        }

        mainDiv.appendChild( img );
        mainDiv.appendChild( hidden );
        mainDiv.appendChild( addButton );
        mainDiv.appendChild( deleteButton );

        targetEl.appendChild( mainDiv );
    };

    var imgUploadCallback = function( event ) {
        event.preventDefault();

        if ( customUploader ) {
            customUploader.open();
        }

    };

    var addImage = function(event) {
        var attachment = customUploader.state().get('selection').first().toJSON();
        imgElement.setAttribute( 'src', attachment.url );
        hiddenElement.setAttribute( 'value', [{id: attachment.id, url: attachment.url}] );
        toggleVisibity( 'ADD' );
    };

    var deleteImage = function() {
        imgElement.setAttribute( 'src', '' );
        hiddenElement.setAttribute( 'value', '' );
        toggleVisibity( 'DELETE' );
    };

    var toggleVisibity = function( action ) {
        if ( 'ADD' === action ) {
            addButton.style.display = "none";
            deleteElement.style.display = "";
            imgElement.style.width = '100%';
        }

        if ( 'DELETE' === action ) {
            addButton.style.display = "";
            deleteElement.style.display = "none";
            imgElement.style.width = '';
        }
    };

    return {
        init: init
    }
};

//TODO remove after testing.
var uploadOne = imageUploader();
uploadOne.init( 'image-one', 'link', { addButton: 'Click Me!' } );

//TODO List
// 1. Handle Saving
// 2. Refactor
// 3. Add Doc Blocks
// 4. Test for multiple uploaders on one page.