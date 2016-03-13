(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.links = exports.buttons = undefined;

var _utils = require('./utils');

var buttons = function buttons(id, addText, deleteText) {
  var addButton = (0, _utils.createElement)('input', [{ type: 'button' }, { Class: 'button' }, { id: id + '-image-upload-button' }, { value: addText }]);

  var deleteButton = (0, _utils.createElement)('input', [{ type: 'button' }, { Class: 'button' }, { id: id + '-image-delete-button' }, { value: deleteText }, { style: 'display:none;' }]);
  return {
    addButton: addButton,
    deleteButton: deleteButton
  };
};

var links = function links(id, addText, deleteText) {
  var addLink = (0, _utils.createElement)('a', [{ id: id + '-image-upload-button' }, { href: '#' }]);

  var deleteLink = (0, _utils.createElement)('a', [{ id: id + '-image-delete-button' }, { href: '#' }, { style: 'display:none;' }]);
  addLink.innerHTML = addText;
  deleteLink.innerHTML = deleteText;
  return {
    addLink: addLink,
    deleteLink: deleteLink
  };
};

exports.buttons = buttons;
exports.links = links;

},{"./utils":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
* Creates a new DOM Element and sets it's properties.
* @param {string} type - Determines the DOM Element Type.
* @param {Array/Object} properties - An array of Objects. Each attribute should
* be passed as a single object with one property.
* @return {DOM Element}
*/
var createElement = function createElement(type, properties) {
  var element = document.createElement(type);
  properties.map(function (data) {
    var attributes = Object.keys(data);
    element.setAttribute(attributes[0], data[attributes[0]]);
  });
  return element;
};

/**
* Finds DOM Elements by ID.
* @params {Object} props - We are pulling out a property of the main props Object.
* @params {string} prefix - the DOM Elements Name Prefix.
*/
var cacheElement = function cacheElement(_ref, prefix) {
  var uploaderKey = _ref.uploaderKey;

  return document.getElementById(uploaderKey + prefix);
};

/**
* Function is Responsible for showing and hidding DOM Elements based on the current,
* image upload Process.
* @param {string} action - The current Upload Action: ADD || DELETE
* @param {object} props - We are extracting properties from the main props Object.
*/
var toggleVisibity = function toggleVisibity(action, _ref2) {
  var addButton = _ref2.addButton;
  var deleteElement = _ref2.deleteElement;
  var imgElement = _ref2.imgElement;

  if ('ADD' === action) {
    hideElement(addButton);
    showElement(deleteElement);
    imgElement.style.width = '100%';
  }

  if ('DELETE' === action) {
    showElement(addButton);
    hideElement(deleteElement);
    imgElement.style.width = '';
  }
};

/**
* Show a DOM Element
* @param {string} element - The DOM Element you wish to Show.
*/
var showElement = function showElement(element) {
  element.setAttribute('style', "display:'';");
};

/**
* Hide a DOM Element
* @param {string} element - The DOM Element you wish to Hide.
*/
var hideElement = function hideElement(element) {
  element.setAttribute('style', "display:none;");
};

exports.createElement = createElement;
exports.cacheElement = cacheElement;
exports.toggleVisibity = toggleVisibity;

},{}],3:[function(require,module,exports){
'use strict';

var _utils = require('./utils');

var _uploadControls = require('./uploadControls');

var imageUploader = function imageUploader() {
    var props = {
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

    var init = function init(id, type, userOptions) {
        props = setUserOptions(userOptions, id);
        createUploadArea(id, type);
        props = cacheDom();
        registerEvents(props);
    };

    var setUserOptions = function setUserOptions(userOptions, id) {
        return Object.assign({}, props, userOptions, { uploaderKey: id });
    };

    var cacheDom = function cacheDom() {
        return Object.assign({}, props, { addButton: (0, _utils.cacheElement)(props, '-image-upload-button') }, { deleteElement: (0, _utils.cacheElement)(props, '-image-delete-button') }, { hiddenElement: (0, _utils.cacheElement)(props, '-hidden-field') }, { imgElement: (0, _utils.cacheElement)(props, '-img-tag') }, { mainDiv: (0, _utils.cacheElement)(props, '-upload-wrapper') }, { addLink: (0, _utils.cacheElement)(props, '-image-upload-text') }, { deleteLink: (0, _utils.cacheElement)(props, '-image-delete-text') }, { customUploader: wp.media({
                title: props.modalTitle,
                button: {
                    text: props.modalButtonText
                },
                multiple: false
            })
        });
    };

    var registerEvents = function registerEvents(_ref) {
        var addButton = _ref.addButton;
        var customUploader = _ref.customUploader;
        var deleteElement = _ref.deleteElement;

        addButton.addEventListener('click', imgUploadCallback);
        customUploader.on('select', addImage);
        deleteElement.addEventListener('click', deleteImage);
        window.addEventListener('DOMContentLoaded', setInitialState);
    };

    var createUploadArea = function createUploadArea(id, type) {
        var components = [];
        var targetEl = document.getElementById(id);
        var mainDiv = (0, _utils.createElement)('div', [{ id: id + '-upload-wrapper' }]);
        components.push((0, _utils.createElement)('img', [{ id: id + '-img-tag' }]));
        components.push((0, _utils.createElement)('input', [{ type: 'hidden' }, { id: id + '-hidden-field' }, { name: id + '-hidden-field' }]));

        var secret = (0, _utils.createElement)('div', [{ style: 'display:none;' }]);
        secret.innerHTML = wpImageUploader.security;
        components.push(secret);

        if ('button' === type) {
            var uploadButtons = (0, _uploadControls.buttons)(id, props.addButtonText, props.deleteButtonText);
            components.push(uploadButtons.addButton);
            components.push(uploadButtons.deleteButton);
        }

        if ('link' === type) {
            var uploadLinks = (0, _uploadControls.links)(id, props.addButtonText, props.deleteButtonText);
            components.push(uploadLinks.addLink);
            components.push(uploadLinks.deleteLink);
        }

        /**
        * Loop Through the newly created Elements and append them to the DOM.
        */
        components.map(function (data) {
            mainDiv.appendChild(data);
        });

        targetEl.appendChild(mainDiv);
    };

    var imgUploadCallback = function imgUploadCallback(event) {
        event.preventDefault();

        if (props.customUploader) {
            props.customUploader.open();
        }
    };

    var addImage = function addImage(event) {
        var attachment = props.customUploader.state().get('selection').first().toJSON();
        props.imgElement.setAttribute('src', attachment.url);
        props.hiddenElement.setAttribute('value', JSON.stringify([{ id: attachment.id, src: attachment.url }]));
        (0, _utils.toggleVisibity)('ADD', props);
    };

    var deleteImage = function deleteImage() {
        props.imgElement.setAttribute('src', '');
        props.hiddenElement.setAttribute('value', '');
        (0, _utils.toggleVisibity)('DELETE', props);
    };

    var findImageUploadData = function findImageUploadData() {
        if ("" === wpImageUploader.uploadKeys) {
            return;
        }
        return wpImageUploader.uploadKeys.filter(function (data) {
            return data.key === props.uploaderKey + '-hidden-field';
        });
    };

    var setInitialState = function setInitialState() {
        var imgData = findImageUploadData();
        if (typeof imgData === 'undefined') {
            return;
        }

        if (false === imgData[0].src) {
            (0, _utils.toggleVisibity)('DELETE', props);
            return;
        }

        props.imgElement.setAttribute('src', imgData[0].src);
        props.hiddenElement.setAttribute('value', JSON.stringify([imgData[0]]));
        (0, _utils.toggleVisibity)('ADD', props);
    };

    return {
        init: init
    };
};

//TODO remove after testing.
var uploadOne = imageUploader();
uploadOne.init('image-one', 'link', { addButtonText: 'Click Me!', modalTitle: "New Modal Text" });

var uploadTwo = imageUploader();
uploadTwo.init('image-two', 'button', {});

//TODO List
// 1. Handle Saving
// 2. Refactor
// 3. Add Doc Blocks
// 4. Test for multiple uploaders on one page.

},{"./uploadControls":1,"./utils":2}]},{},[1,2,3]);
