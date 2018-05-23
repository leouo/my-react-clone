const setAttribute = (dom, key, value) => {
    if (typeof value == 'function' && key.startsWith('on')) {
        const eventType = key.slice(2).toLowerCase();
        dom.__gooactHandlers = dom.__gooactHandlers || {};
        dom.removeEventListener(eventType, dom.__gooactHandlers[eventType]);
        dom.__gooactHandlers[eventType] = value;
        dom.addEventListener(eventType, dom.__gooactHandlers[eventType]);
    } else if (key == 'checked' || key == 'value' || key == 'id') {
        dom[key] = value;
    } else if (key == 'key') {
        dom.__gooactKey = value;
    } else if (typeof value != 'object' && typeof value != 'function') {
        dom.setAttribute(key, value);
    }
};

const render = (vdom, parent=null) => {
    if (parent) parent.textContent = '';
    const mount = parent ? (el => parent.appendChild(el)) : (el => el);
    if (typeof vdom == 'string' || typeof vdom == 'number') {
        return mount(document.createTextNode(vdom));
    } else if (typeof vdom == 'boolean' || vdom === null) {
        return mount(document.createTextNode(''));
    } else if (typeof vdom == 'object' && typeof vdom.type == 'function') {
        return mount(Component.render(vdom));
    } else if (typeof vdom == 'object' && typeof vdom.type == 'string') {
        const dom = document.createElement(vdom.type);
        for (const child of [/* flatten */].concat(...vdom.children))
            dom.appendChild(render(child));
        for (const prop in vdom.props)
            setAttribute(dom, prop, vdom.props[prop]);
        return mount(dom);
    } else {
        throw new Error(`Invalid VDOM: ${vdom}.`);
    }
};
