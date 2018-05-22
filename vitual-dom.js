const createElement = (type, props, ...children) => {
    props = props != null ? props : {};
    return {type, props, children};
};

const prettyVDOM = (vdom) => JSON.stringify(vdom, null, 4);

const myApp = createElement('div', {className: 'my-app'});

document.getElementById('app').textContent = prettyVDOM(myApp);