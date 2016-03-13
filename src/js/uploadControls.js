import { createElement } from './utils';
const buttons = (id, addText, deleteText) => {
  let addButton = createElement(
    'input',
    [
      { type: 'button' },
      { Class: 'button' },
      { id: `${id}-image-upload-button` },
      { value: addText }
    ]
  );

  let deleteButton = createElement(
    'input',
    [
      { type: 'button' },
      { Class: 'button' },
      { id: `${id}-image-delete-button` },
      { value: deleteText },
      { style: 'display:none;' }
    ]
  );
  return {
    addButton: addButton,
    deleteButton: deleteButton
  }
}

const links = (id, addText, deleteText) => {
  let addLink = createElement(
    'a',
    [
      { id: `${id}-image-upload-button` },
      { href: '#' }
    ]
  );

  let deleteLink = createElement(
    'a',
    [
      { id: `${id}-image-delete-button` },
      { href: '#' },
      { style: 'display:none;' }
    ]
  );
  addLink.innerHTML = addText;
  deleteLink.innerHTML = deleteText;
  return {
    addLink: addLink,
    deleteLink: deleteLink
  }
}

export { buttons, links }
