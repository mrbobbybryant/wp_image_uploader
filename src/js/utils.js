/**
* Creates a new DOM Element and sets it's properties.
* @param {string} type - Determines the DOM Element Type.
* @param {Array/Object} properties - An array of Objects. Each attribute should
* be passed as a single object with one property.
* @return {DOM Element}
*/
const createElement = ( type, properties ) => {
  let element = document.createElement( type );
  properties.map(function(data){
    let attributes = Object.keys(data);
    element.setAttribute( attributes[0], data[attributes[0]] );
  });
  return element;
}

/**
* Finds DOM Elements by ID.
* @params {Object} props - We are pulling out a property of the main props Object.
* @params {string} prefix - the DOM Elements Name Prefix.
*/
const cacheElement = ({uploaderKey}, prefix) => {
  return document.getElementById( uploaderKey + prefix )
}

/**
* Function is Responsible for showing and hidding DOM Elements based on the current,
* image upload Process.
* @param {string} action - The current Upload Action: ADD || DELETE
* @param {object} props - We are extracting properties from the main props Object.
*/
const toggleVisibity = ( action, {addButton,deleteElement, imgElement } ) => {
    if ( 'ADD' === action ) {
        hideElement(addButton);
        showElement(deleteElement);
        imgElement.style.width = '100%';
    }

    if ( 'DELETE' === action ) {
        showElement(addButton);
        hideElement(deleteElement);
        imgElement.style.width = '';
    }
};

/**
* Show a DOM Element
* @param {string} element - The DOM Element you wish to Show.
*/
const showElement = (element) => {
  element.setAttribute('style', "display:'';");
}

/**
* Hide a DOM Element
* @param {string} element - The DOM Element you wish to Hide.
*/
const hideElement = (element) => {
  element.setAttribute( 'style', "display:none;" );
}

export { createElement, cacheElement, toggleVisibity }
