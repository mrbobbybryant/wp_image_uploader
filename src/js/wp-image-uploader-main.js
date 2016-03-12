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
    var uploaderKey;

    const init = ( id, type, title ) => {
        addButtonText =  title.addButton = typeof title.addButton !== 'undefined' ? title.addButton : 'Add Image';
        deleteButtonText = title.deleteButton = typeof title.deleteButton !== 'undefined' ? title.deleteButton : 'Remove Image';
        modalTitle = title.modalTitle = typeof title.modalTitle !== 'undefined' ? title.modalTitle : 'Select or Upload Media';
        modalButtonText = title.modalButtonText = typeof title.modalButtonText !== 'undefined' ? title.modalButtonText : 'Use this media';
        uploaderKey = id;

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
        window.addEventListener('DOMContentLoaded', setInitialState );
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
        hidden.setAttribute( 'name', id + '-hidden-field' );

        var secret = document.createElement( 'div' );
        secret.innerHTML = wpImageUploader.security;
        secret.style.display = "none";

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
        mainDiv.appendChild( secret );
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
        hiddenElement.setAttribute( 'value', JSON.stringify( [{ id: attachment.id, src: attachment.url }]) );
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

    var findImageUploadData = function() {
        if ( "" === wpImageUploader.uploadKeys ) {
            return;
        }
        return wpImageUploader.uploadKeys.filter( function(data) {
            return data.key === uploaderKey + '-hidden-field';
        } );
    };

    var setInitialState = function() {
        var imgData = findImageUploadData();
        if ( typeof imgData === 'undefined' ) {
            return;
        }

        if ( false === imgData[0].src ) {
            toggleVisibity( 'DELETE' );
            return;
        }

        imgElement.setAttribute( 'src', imgData[0].src );
        hiddenElement.setAttribute( 'value', JSON.stringify([ imgData[0] ]) );
        toggleVisibity( 'ADD' );
    };

    return {
        init: init
    }
};

//TODO remove after testing.
var uploadOne = imageUploader();
uploadOne.init( 'image-one', 'link', { addButton: 'Click Me!', modalTitle: "New Modal Text" } );

var uploadTwo = imageUploader();
uploadTwo.init( 'image-two', 'button', {} );

//TODO List
// 1. Handle Saving
// 2. Refactor
// 3. Add Doc Blocks
// 4. Test for multiple uploaders on one page.