class MyApp extends Component {
    render() {
        return createElement('div', {}, 'Hello World!');
    }
}


render(createElement(MyApp, null), document.getElementById('app'));
