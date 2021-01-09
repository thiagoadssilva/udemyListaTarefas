import React, { useState, useEffect } from 'react';
import { A } from 'hookrouter';
import { Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import ItensListaTarefas from '../ItensListaTarefas';
import Paginacao from '../Paginacao';



import {
    Container
} from './styled';
import { func } from 'prop-types';

export default () => {
    const ITEMS_POR_PAG = 5;
    
    const [tarefas, setTarefas] = useState([]);
    const [carregarTarefas, setCarregarTarefas] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(1);

    useEffect(() => {
        function obterTarefas() {
            const tarefasDb = localStorage['tarefas'];
            let listaTarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
            setTotalItems(listaTarefas.length);
            setTarefas(listaTarefas.splice((paginaAtual - 1) * ITEMS_POR_PAG, ITEMS_POR_PAG));
            
        }

        if (carregarTarefas) {
            obterTarefas();
            setCarregarTarefas(false);
        }

    }, [carregarTarefas, paginaAtual]);

    function handleMudarPagina(pagina){
        setPaginaAtual(pagina);
        setCarregarTarefas(true);        
    }

    return (
        <Container>
            <div class="table-responsive" className="text-center">
                <h3 >Lista a Fazer</h3>
                <Table
                    striped
                    bordered
                    hover
                    responsive
                    data-testid="tabela"
                >
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th className="text-center">
                                <A href="/cadastrar" className="btn btn-success btn-sm" data-testid="btn-nova-tarefa">
                                    <FontAwesomeIcon icon={faPlus} />
                                    &nbsp;
                                    Nova Tarefa
                                </A>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <ItensListaTarefas
                            tarefas={tarefas}
                            recarregarTarefas={setCarregarTarefas}
                        />
                    </tbody>
                </Table>
                <Paginacao totalItems={totalItems} itemsPorPagina={ITEMS_POR_PAG} paginaAtual={paginaAtual} mudarPagina={handleMudarPagina}/>
            </div>
        </Container>
    );
}