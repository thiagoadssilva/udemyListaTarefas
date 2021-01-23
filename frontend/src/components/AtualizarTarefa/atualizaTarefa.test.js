import React from 'react';
import ReactDOM from 'react-dom';
import AtualizarTarefa from './index';
import Tarefa from '../../models/tarefa.model';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe.skip('Teste do componente Atualizar Tarefa', () => {

    const tarefaId = 1;
    const tarefa = new Tarefa(tarefaId, 'novaTarefa', false);

    beforeEach(() =>{
        localStorage['tarefas'] = JSON.stringify([tarefa]);
    });

    it('Deve redenrizar sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AtualizarTarefa id={tarefaId}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Deve exibir o modal quando atualizar a tarefa', () =>{
        const {getByTestId} = render(<AtualizarTarefa id={tarefaId} />);
        fireEvent.click(getByTestId('btn-atualizar'));
        expect(getByTestId('modal')).toHaveTextContent('Sucesso');
    });

    it('Deve atualizar uma tarefa', () =>{
        const nomeTarefaAtualizada = 'tarefaAtualizada';
        const {getByTestId} = render(<AtualizarTarefa id={tarefaId}/>);
        fireEvent.change(getByTestId('txt-tarefa'), {target: {value: nomeTarefaAtualizada}});
        fireEvent.click(getByTestId('btn-atualizar'));
        const tarefaDb = JSON.parse(localStorage['tarefas']);
        expect(tarefaDb[0].nome).toBe(nomeTarefaAtualizada);
    });
});

