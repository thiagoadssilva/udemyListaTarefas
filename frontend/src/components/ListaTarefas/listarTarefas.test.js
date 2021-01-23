import React from 'react';
import ReactDOM from 'react-dom';
import ListarTarefas from './index';
import Tarefa from '../../models/tarefa.model';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios'; 


describe('Teste do componente Listar Tarefa', () => {
    const nomePrimeiraTarefa = "01";
    const nomeSegundaTarefa = "02";
    const nomeTerceiraTarafa = "03";

    //- INICIO codigo usado para trabalhar com localstorage
    // beforeEach(() =>{
    //     localStorage['tarefas'] = JSON.stringify([
    //         new Tarefa(1, nomePrimeiraTarefa, false),
    //         new Tarefa(2, nomeSegundaTarefa, false),
    //         new Tarefa(3, nomeTerceiraTarafa, false)
    //     ]);
    // });
    //- FIM codigo usado para trabalhar com localstorage

    // afterEach(() =>{
    //     delete localStorage['tarefas'];
    // });
    // Teste foi comentado por não haver mais a necessidade dele.
    // it('Deve redenrizar sem erros', () => {
    //     const div = document.createElement('div');
    //     ReactDOM.render(<ListarTarefas />, div);
    //     ReactDOM.unmountComponentAtNode(div);
    // });

    const listaTarefa = {
        totalItems: 3,
        tarefas: [
            new Tarefa(1, nomePrimeiraTarefa, false),
            new Tarefa(1, nomeSegundaTarefa, false),
            new Tarefa(1, nomeTerceiraTarafa, false)
        ],
        pagina: 1
    }

    it('Deve exibir uma tabela com 3 tarefas', async () =>{
        axiosMock.get.mockResolvedValue({data: listaTarefa});
        const {findByTestId} = render(<ListarTarefas />);
        const tabela = await findByTestId('tabela');
        expect(tabela).toHaveTextContent(nomePrimeiraTarefa);
        expect(tabela).toHaveTextContent(nomeSegundaTarefa);
        expect(tabela).toHaveTextContent(nomeTerceiraTarafa);
    });

    it('Deve filtrar a tarefa', async () =>{
        axiosMock.get.mockResolvedValue({data: listaTarefa});
        axiosMock.get.mockResolvedValue({data: {
            totalItems: 1,
            tarefas: [new Tarefa(1, nomePrimeiraTarefa, false)],
            pagina: 1
        }});

        const {findByTestId} = render(<ListarTarefas />);
        fireEvent.change(await findByTestId('txt-tarefa'), {target: {value: nomePrimeiraTarefa}});
        const tabela = await findByTestId('tabela');
        expect(tabela).toHaveTextContent(nomePrimeiraTarefa);
        expect(tabela).not.toHaveTextContent(nomeSegundaTarefa);
        expect(tabela).not.toHaveTextContent(nomeTerceiraTarafa);
    });
});

