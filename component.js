class Component {
	constructor(props) {
		this.props = props || {};
		this.state = null;
	}

	static render(vdom, parent=null) {
		const props = Object.assign({}, vdom.props, {children: vdom.children});
		if (Component.isPrototypeOf(vdom.type)) {
			const instance = new (vdom.type)(props);
			instance.componentWillMount();
			instance.base = render(instance.render(), parent);
			instance.base.__Instance = instance;
			instance.base.__Key = vdom.props.key;
			instance.componentDidMount();
			return instance.base;
		} else {
			return render(vdom.type(props), parent);
		}
	}

	static patch(dom, vdom, parent=dom.parentNode) {
		const props = Object.assign({}, vdom.props, {children: vdom.children});
		if (dom.__Instance.constructor == vdom.type) {
			dom.__Instance.componentWillReceiveProps(props);
			dom.__Instance.props = props;
			return patch(dom, dom.__Instance.render());
		} else if (Component.isPrototypeOf(vdom.type)) {
			const ndom = Component.render(vdom);
			return parent ? (parent.replaceChild(ndom, dom) && ndom) : (ndom);
		} else if (!Component.isPrototypeOf(vdom.type)) {
			return patch(dom, vdom.type(props));
		}
	}

	setState(nextState) {
		if (this.base && this.shouldComponentUpdate(this.props, nextState)) {
			const prevState = this.state;
			this.componentWillUpdate(this.props, nextState);
			this.state = nextState;
			patch(this.base, this.render());
			this.componentDidUpdate(this.props, prevState);
		} else {
			this.state = nextState;
		}
	}

	shouldComponentUpdate(nextProps, nextState) {
		return nextProps != this.props || nextState != this.state;
	}

	componentWillReceiveProps(nextProps) {
		return undefined;
	}

	componentWillUpdate(nextProps, nextState) {
		return undefined;
	}

	componentDidUpdate(prevProps, prevState) {
		return undefined;
	}

	componentWillMount() {
		return undefined;
	}

	componentDidMount() {
		return undefined;
	}

	componentWillUnmount() {
		return undefined;
	}
}