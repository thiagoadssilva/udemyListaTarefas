import React from 'react';
import ReactDOM from 'react-dom';
import CadastrarTarefa from './index';


describe('Teste do componente Cadastrar Tarefa', () => {
    it('Deve redenrizar sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<CadastrarTarefa />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
