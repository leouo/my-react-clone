const myComponent = createElement('div', {class: 'my-app'}, 'Hello world');
const myNewComponentVersion = createElement('div', { class: 'my-app' },
    createElement('span', {}, 'Xablau!')
);

const MyApp = render(myComponent, document.getElementById('app'));

patch(MyApp, myNewComponentVersion);