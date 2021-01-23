import React from 'react';
import ReactDOM from 'react-dom';
import ListarTarefas from './index';
import Tarefa from '../../models/tarefa.model';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


describe.skip('Teste do componente Listar Tarefa', () => {
    const nomePrimeiraTarefa = "01";
    const nomeSegundaTarefa = "02";
    const nomeTerceiraTarafa = "03";

    beforeEach(() =>{
        localStorage['tarefas'] = JSON.stringify([
            new Tarefa(1, nomePrimeiraTarefa, false),
            new Tarefa(2, nomeSegundaTarefa, false),
            new Tarefa(3, nomeTerceiraTarafa, false)
        ]);
    });

    afterEach(() =>{
        delete localStorage['tarefas'];
    });

    it('Deve redenrizar sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ListarTarefas />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Deve exibir uma tabela com 3 tarefas', () =>{
        const {getByTestId} = render(<ListarTarefas />);
        const tabela = getByTestId('tabela');
        expect(tabela).toHaveTextContent(nomePrimeiraTarefa);
        expect(tabela).toHaveTextContent(nomeSegundaTarefa);
        expect(tabela).toHaveTextContent(nomeTerceiraTarafa);
    });

    it('Deve filtrar a tarefa', () =>{
        const {getByTestId} = render(<ListarTarefas />);
        fireEvent.change(getByTestId('txt-tarefa'), {target: {value: nomePrimeiraTarefa}});
        const tabela = getByTestId('tabela');
        expect(tabela).toHaveTextContent(nomePrimeiraTarefa);
        expect(tabela).not.toHaveTextContent(nomeSegundaTarefa);
        expect(tabela).not.toHaveTextContent(nomeTerceiraTarafa);
    });
});

