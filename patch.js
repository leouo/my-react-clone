const patch = (dom, vdom, parent=dom.parentNode) => {
	const replace = parent ? el => (parent.replaceChild(el, dom) && el) : (el => el);
	if (typeof vdom == 'object' && typeof vdom.type == 'function') {
		return Component.patch(dom, vdom, parent);
	} else if (typeof vdom != 'object' && dom instanceof Text) {
		return dom.textContent != vdom ? replace(render(vdom)) : dom;
	} else if (typeof vdom == 'object' && dom instanceof Text) {
		return replace(render(vdom));
	} else if (typeof vdom == 'object' && dom.nodeName != vdom.type.toUpperCase()) {
		return replace(render(vdom));
	} else if (typeof vdom == 'object' && dom.nodeName == vdom.type.toUpperCase()) {
		const pool = {};
		const active = document.activeElement;
		for (const index in Array.from(dom.childNodes)) {
			const child = dom.childNodes[index];
			const key = child.__Key || index;
			pool[key] = child;
		}
		const vchildren = [/* flatten */].concat(...vdom.children);
		for (const index in vchildren) {
			const child = vchildren[index];
			const key = child.props && child.props.key || index;
			dom.appendChild(pool[key] ? patch(pool[key], child) : render(child));
			delete pool[key];
		}
		for (const key in pool) {
			if (pool[key].__Instance)
				pool[key].__Instance.componentWillUnmount();
			pool[key].remove();
		}
		for (const prop in vdom.props) {
			setAttribute(dom, prop, vdom.props[prop]);
		}
		active.focus();
		return dom;
	}
};