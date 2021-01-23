import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';

it.skip('Deve ser rederizado sem Erros', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
});
