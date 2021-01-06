import React from 'react';
import ReactDOM from 'react-dom';
import ItensListaTarefas from './index';

describe('Teste do componente Itens Lista Tarefas', () =>{
    it('Deve renderizar sem erros', () =>{
        const div = document.createElement('div');
        ReactDOM.render(<ItensListaTarefas />, div);
        ReactDOM.unmountComponentAtNode(div);
    }); 
});