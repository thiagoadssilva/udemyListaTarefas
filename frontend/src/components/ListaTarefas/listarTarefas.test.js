import React from 'react';
import ReactDOM from 'react-dom';
import ListarTarefas from './index';


describe('Teste do componente Listar Tarefa', () => {
    it('Deve redenrizar sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ListarTarefas />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});

