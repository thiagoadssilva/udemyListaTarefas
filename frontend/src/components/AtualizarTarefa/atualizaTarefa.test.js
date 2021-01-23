import React from 'react';
import ReactDOM from 'react-dom';
import AtualizarTarefa from './index';
import Tarefa from '../../models/tarefa.model';
import { render, fireEvent, findByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

describe('Teste do componente Atualizar Tarefa', () => {

    const tarefaId = 1;
    //const tarefa = new Tarefa(tarefaId, 'novaTarefa', false);

    // beforeEach(() =>{
    //     localStorage['tarefas'] = JSON.stringify([tarefa]);
    // });

    // it('Deve redenrizar sem erros', () => {
    //     const div = document.createElement('div');
    //     ReactDOM.render(<AtualizarTarefa id={tarefaId}/>, div);
    //     ReactDOM.unmountComponentAtNode(div);
    // });

    it('Deve exibir o modal quando atualizar a tarefa', async () => {
        axiosMock.get.mockResolvedValueOnce({ data: { nome: 'estudar' } });
        const { findByTestId } = render(<AtualizarTarefa id={tarefaId} />);
        fireEvent.click(await findByTestId('btn-atualizar'));
        const modal = await findByTestId('modal');
        expect(modal).toHaveTextContent('Sucesso');
    });

    // it('Deve atualizar uma tarefa', () =>{
    //     const nomeTarefaAtualizada = 'tarefaAtualizada';
    //     const {getByTestId} = render(<AtualizarTarefa id={tarefaId}/>);
    //     fireEvent.change(getByTestId('txt-tarefa'), {target: {value: nomeTarefaAtualizada}});
    //     fireEvent.click(getByTestId('btn-atualizar'));
    //     const tarefaDb = JSON.parse(localStorage['tarefas']);
    //     expect(tarefaDb[0].nome).toBe(nomeTarefaAtualizada);
    // });
});

