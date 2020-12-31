import React from 'react';
import ReactDOM from 'react-dom';
import AtualizarTarefa from './index';


describe('Teste do componente Atualizar Tarefa', () => {
    it('Deve redenrizar sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AtualizarTarefa id={1}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});


