import {createElement, cacheElement, toggleVisibity} from './utils';
import { buttons, links } from './uploadControls';

const imageUploader = () => {
    let props = {
      modalTitle: 'Select or Upload Media',
      modalButtonText: 'Use this media',
      addButtonText: 'Add Image',
      deleteButtonText: 'Remove Image',
      addButton: '',
      deleteElement: '',
      hiddenElement: '',
      imgElement: '',
      mainDiv: '',
      customUploader: '',
      uploaderKey: ''
    };

    const init = ( id, type, userOptions ) => {
      props = setUserOptions(userOptions,id);
      createUploadArea( id , type );
      props = cacheDom();
      registerEvents(props);
    };

    const setUserOptions = (userOptions, id) => {
      return Object.assign(
        {},
        props,
        userOptions,
        { uploaderKey: id }
      );
    }

    const cacheDom = () => {
      return Object.assign(
        {},
        props,
        { addButton: cacheElement(props, '-image-upload-button') },
        { deleteElement: cacheElement(props, '-image-delete-button') },
        { hiddenElement: cacheElement(props, '-hidden-field') },
        { imgElement: cacheElement(props, '-img-tag') },
        { mainDiv: cacheElement(props, '-upload-wrapper') },
        { addLink: cacheElement(props, '-image-upload-text') },
        { deleteLink: cacheElement(props, '-image-delete-text') },
        { customUploader: wp.media({
            title: props.modalTitle,
            button: {
                text: props.modalButtonText
            },
            multiple: false
          })
        }
      );
    }

    const registerEvents = ({addButton, customUploader, deleteElement}) => {
        addButton.addEventListener( 'click', imgUploadCallback );
        customUploader.on( 'select', addImage );
        deleteElement.addEventListener( 'click', deleteImage );
        window.addEventListener('DOMContentLoaded', setInitialState );
    };

    const createUploadArea = ( id, type ) => {
        let components = [];
        let targetEl = document.getElementById( id );
        let mainDiv = createElement( 'div', [{id: `${id}-upload-wrapper`}] );
        components.push(createElement( 'img', [{id: `${id}-img-tag`}] ));
        components.push(
          createElement(
            'input',
            [
              {type: 'hidden'},
              {id: `${id}-hidden-field`},
              {name: `${id}-hidden-field`}
            ]
          )
        );

        let secret = createElement( 'div', [{ style: 'display:none;' }] );
        secret.innerHTML = wpImageUploader.security;
        components.push(secret);

        if ( 'button' === type ) {
          let uploadButtons = buttons(id, props.addButtonText, props.deleteButtonText);
          components.push(uploadButtons.addButton);
          components.push(uploadButtons.deleteButton);
        }

        if ( 'link' === type ) {
            let uploadLinks = links(id, props.addButtonText, props.deleteButtonText);
            components.push(uploadLinks.addLink);
            components.push(uploadLinks.deleteLink);
        }

        /**
        * Loop Through the newly created Elements and append them to the DOM.
        */
        components.map(function(data){
          mainDiv.appendChild(data);
        });

        targetEl.appendChild( mainDiv );
    };

    const imgUploadCallback = ( event ) => {
        event.preventDefault();

        if ( props.customUploader ) {
            props.customUploader.open();
        }

    };

    const addImage = (event) => {
        let attachment = props.customUploader.state().get('selection').first().toJSON();
        props.imgElement.setAttribute( 'src', attachment.url );
        props.hiddenElement.setAttribute( 'value', JSON.stringify( [{ id: attachment.id, src: attachment.url }]) );
        toggleVisibity( 'ADD', props );
    };

    const deleteImage = () => {
        props.imgElement.setAttribute( 'src', '' );
        props.hiddenElement.setAttribute( 'value', '' );
        toggleVisibity( 'DELETE', props );
    };

    const findImageUploadData = () => {
        if ( "" === wpImageUploader.uploadKeys ) {
            return;
        }
        return wpImageUploader.uploadKeys.filter( function(data) {
            return data.key === props.uploaderKey + '-hidden-field';
        } );
    };

    const setInitialState = () => {
        let imgData = findImageUploadData();
        if ( typeof imgData === 'undefined' ) {
            return;
        }

        if ( false === imgData[0].src ) {
            toggleVisibity( 'DELETE', props );
            return;
        }

        props.imgElement.setAttribute( 'src', imgData[0].src );
        props.hiddenElement.setAttribute( 'value', JSON.stringify([ imgData[0] ]) );
        toggleVisibity( 'ADD', props );
    };

    return {
        init: init
    }
};

//TODO remove after testing.
var uploadOne = imageUploader();
uploadOne.init( 'image-one', 'link', { addButtonText: 'Click Me!', modalTitle: "New Modal Text" } );

var uploadTwo = imageUploader();
uploadTwo.init( 'image-two', 'button', {} );

//TODO List
// 1. Handle Saving
// 2. Refactor
// 3. Add Doc Blocks
// 4. Test for multiple uploaders on one page.
