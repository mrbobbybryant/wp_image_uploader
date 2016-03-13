const createElement = ( type, properties ) => {
  let element = document.createElement( type );
  properties.map(function(data){
    let attributes = Object.keys(data);
    element.setAttribute( attributes[0], data[attributes[0]] );
  });
  return element;
}

const cacheElement = ({uploaderKey}, prefix) => {
  return document.getElementById( uploaderKey + prefix )
}

const toggleVisibity = ( action, {addButton,deleteElement, imgElement } ) => {
    if ( 'ADD' === action ) {
        hidElement(addButton);
        showElement(deleteElement);
        imgElement.style.width = '100%';
    }

    if ( 'DELETE' === action ) {
        showElement(addButton);
        hidElement(deleteElement);
        imgElement.style.width = '';
    }
};

const showElement = (element) => {
  element.setAttribute('style', "display:'';");
}

const hidElement = (element) => {
  element.setAttribute( 'style', "display:none;" );
}

export { createElement, cacheElement, toggleVisibity }
