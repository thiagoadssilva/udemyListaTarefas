import React from 'react';
import ReactDOM from 'react-dom';
import RemoverTarefa from './index';
import Tarefa from '../../models/tarefa.model';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';

describe("Teste do componente remover tarefa", () =>{
    const nomeTarefa = "lla";
    const tarefa = new Tarefa(1, nomeTarefa, false);

    // it("Deve renderizar o componente sem erros", () =>{
    //     const div = document.createElement('div');
    //     ReactDOM.render(
    //         <RemoverTarefa tarf={tarefa} recarregarTarefas={() => false}/>, div);
    //     ReactDOM.unmountComponentAtNode(div);
    // }); 

    it('Deve Exibir o modal sem erros', () =>{
        const {getByTestId} = render(
            <RemoverTarefa tarf={tarefa} recarregarTarefas={() => false}/>);
        fireEvent.click(getByTestId('btn-abrir-modal'));
        expect(getByTestId('modal')).toHaveTextContent(nomeTarefa);
    });

    it('Deve remover uma tarefa', async () =>{
        //localStorage['tarefas'] = JSON.stringify([tarefa]);
        const {getByTestId, findByTestId} = render(
            <RemoverTarefa tarf={tarefa} recarregarTarefas={() => false}/>);
        fireEvent.click(getByTestId('btn-abrir-modal'));
        fireEvent.click(getByTestId('btn-remover'));
        //const tarefasDb = JSON.parse(localStorage['tarefas']);
        //expect(tarefasDb.length).toBe(0);
        await findByTestId('modal');
        expect(axiosMock.delete).toHaveBeenCalledTimes(1);
    });
});