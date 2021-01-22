import React, { useState, useEffect } from 'react';
import { A } from 'hookrouter';
import { Table, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

import ItensListaTarefas from '../ItensListaTarefas';
import Paginacao from '../Paginacao';
import Ordenacao from '../Ordenacao';



import {
    Container
} from './styled';

export default () => {

    const ITEMS_POR_PAG = 5;
    const API_URL_LISTAR_TAREFAS = "http://localhost:3001/gerenciador-tarefas";

    const [tarefas, setTarefas] = useState([]);
    const [carregarTarefas, setCarregarTarefas] = useState(true);
    const [totalItems, setTotalItems] = useState(0);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [ordenarAsc, setOrdenarAsc] = useState(false);
    const [ordenarDesc, setOrdenarDesc] = useState(false);
    const [filtroTarefa, setFiltroTarefa] = useState('');

    useEffect(() => {
        async function obterTarefas() {

            //- INICIO Criando a ordenação
            let ordem = '';

            if (ordenarAsc) {
                ordem = 'ASC';
            } else if (ordenarDesc) {
                ordem = 'DESC';
            }
            //- FIM Criando a ordenação

            try {
                const params = `?pag=${paginaAtual}&ordem=${ordem}&filtro-tarefa=${filtroTarefa}`;
                let { data } = await axios.get(API_URL_LISTAR_TAREFAS + params);
                setTotalItems(data.totalItens);
                setTarefas(data.tarefas);
            } catch (error) {
                setTarefas([]);
            }
            //- INCIO Código que representa a criação do localstorage, foi comentado para entrada da api
            // const tarefasDb = localStorage['tarefas'];
            // let listaTarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
            // //- Filtrar a tarefa
            // listaTarefas = listaTarefas.filter(t => t.nome.toLowerCase().indexOf(filtroTarefa.toLocaleLowerCase()) === 0);
            // //- Ordenação
            // if (ordenarAsc) {
            //     listaTarefas.sort((t1, t2) => (t1.nome.toLowerCase() > t2.nome.toLowerCase()) ? 1 : -1);
            // } else if (ordenarDesc) {
            //     listaTarefas.sort((t1, t2) => (t1.nome.toLowerCase() < t2.nome.toLowerCase()) ? 1 : -1);
            // }
            // //- Paginação
            // setTotalItems(listaTarefas.length);
            // setTarefas(listaTarefas.splice((paginaAtual - 1) * ITEMS_POR_PAG, ITEMS_POR_PAG));
            //- FIM Código que representa a criação do localstorage, foi comentado para entrada da api
        }

        if (carregarTarefas) {
            obterTarefas();
            setCarregarTarefas(false);
        }

    }, [carregarTarefas, paginaAtual, ordenarDesc, ordenarAsc, filtroTarefa]);

    function handleMudarPagina(pagina) {
        setPaginaAtual(pagina);
        setCarregarTarefas(true);
    }

    function handleOrdenar(event) {
        event.preventDefault();

        if (!ordenarAsc && !ordenarDesc) {
            setOrdenarAsc(true);
            setOrdenarDesc(false);
        } else if (ordenarAsc) {
            setOrdenarAsc(false);
            setOrdenarDesc(true);
        } else {
            setOrdenarDesc(false);
            setOrdenarAsc(false);
        }
        setCarregarTarefas(true);
    }

    function handleFiltrar(event) {
        setFiltroTarefa(event.target.value);
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
                            <th>
                                <a className="teste" href="/" onClick={handleOrdenar}>
                                    Tarefa
                                    &nbsp;
                                    <Ordenacao ordenarAsc={ordenarAsc} ordenarDesc={ordenarDesc} />
                                </a>
                            </th>
                            <th className="text-center">
                                <A href="/cadastrar" className="btn btn-success btn-sm" data-testid="btn-nova-tarefa">
                                    <FontAwesomeIcon icon={faPlus} />
                                    &nbsp;
                                    Nova Tarefa
                                </A>
                            </th>
                        </tr>
                        <tr>
                            <th>
                                <Form.Control placeholder="Informa uma tarefa" className="filtroTarefa" type="text" value={filtroTarefa} onChange={handleFiltrar} data-testid="txt-tarefa" />
                            </th>
                            <th>&nbsp;</th>
                        </tr>
                    </thead>
                    <tbody>
                        <ItensListaTarefas
                            tarefas={tarefas}
                            recarregarTarefas={setCarregarTarefas}
                        />
                    </tbody>
                </Table>
                <Paginacao totalItems={totalItems} itemsPorPagina={ITEMS_POR_PAG} paginaAtual={paginaAtual} mudarPagina={handleMudarPagina} />
            </div>
        </Container>
    );
}