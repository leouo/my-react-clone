const createElement = (type, props, ...children) => {
    props = props != null ? props : {};
    return {type, props, children};
};
