import React from 'react';
import ReactDOM from 'react-dom';
import ItensListaTarefas from './index';
import Tarefa from '../../models/tarefa.model';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente Itens Lista Tarefas', () => {

    const nomeTarefa = 'Teste Tarefa';
    const tarefa = new Tarefa(1, nomeTarefa, true);
    const tarefaConcluida = new Tarefa(2, nomeTarefa, false);

    it('Deve renderizar sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ItensListaTarefas tarefas={[]} recarregarTarefas={() => false} />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Deve exibir a tarefa na grid', () => {
        const { getByTestId } = render(
            <table>
                <tbody>
                    <ItensListaTarefas tarefas={[tarefa]} recarregarTarefas={() => false} />
                </tbody>
            </table>
        );
        expect(getByTestId('taf')).toHaveTextContent(nomeTarefa);
    });

    it('Deve exibir o teste da tarefa como concluida false', () => {
        const { getByTestId } = render(
            <table>
                <tbody>
                    <ItensListaTarefas tarefas={[tarefaConcluida]} recarregarTarefas={() => false} />
                </tbody>
            </table>
        );
        expect(getByTestId('nome-tarefa')).toHaveStyle('text-decoration: none');
    });

});