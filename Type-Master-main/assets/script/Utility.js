'use strict';


// Utility functions
function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function getElement(selector, parent = document) {
    return parent.getElementById(selector);
}


function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function getDate() {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour12: false
    }
    return new Date().toLocaleDateString('en-ca', options);
}


export { onEvent, getElement, select , getDate as date }