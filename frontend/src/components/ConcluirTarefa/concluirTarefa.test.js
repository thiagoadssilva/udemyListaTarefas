import React from 'react';
import ReactDOM from 'react-dom';
import ConcluirTarefa from './index';
import Tarefa from '../../models/tarefa.model';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe('Teste do componente Concluir Tarefa', () =>{
    const nomeTarefa = 'Bento jose da silva';
    const tarefa = new Tarefa(1, nomeTarefa, false);

    it('Deve renderizar o componente sem erros', () =>{
        const div = document.createElement('div');
        ReactDOM.render(<ConcluirTarefa tarf={tarefa} recarregarTarefas={() => false} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Deve exibir o modal', () =>{
        const {getByTestId} = render(
            <ConcluirTarefa tarf={tarefa} recarregarTarefas={() => false}/>
        );
        fireEvent.click(getByTestId('btn-abrir-modal'));
        expect(getByTestId('modal')).toHaveTextContent(nomeTarefa);
    });

    it('Deve concluir uma tarefa', () =>{
        localStorage['tarefas'] = JSON.stringify([tarefa]);
        const {getByTestId} = render(
            <ConcluirTarefa tarf={tarefa} recarregarTarefas={() => false}/>
        );
        fireEvent.click(getByTestId('btn-abrir-modal'));
        fireEvent.click(getByTestId('btn-concluir'));
        const tarefaDb = JSON.parse(localStorage['tarefas']);
        expect(tarefaDb[0].concluida).toBeTruthy();
    });
});