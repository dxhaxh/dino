export function getCustomProperty(elem, prop){
    return parseFloat(getComputedStyle(elem).getPropertyValue(prop)) || 0;
}

export function setCustomProperty(elem, prop, val){
    elem.style.setProperty(prop, val);
}

export function incrementCustomProperty(elem, prop, amount){
    setCustomProperty(elem, prop, getCustomProperty(elem, prop) + amount);
}