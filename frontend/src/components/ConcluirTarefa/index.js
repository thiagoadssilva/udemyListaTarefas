import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import {
    Container
} from './styled';

export default ({ tarf, recarregarTarefas, ocultarIcone }) => {
    const [exibirMOdal, setExibirModal] = useState(false);
    const [exibirModalErro, setExibirModalErro] = useState(false);

    const API_URL_CONCLUIR_TAREFA = 'http://localhost:3001/gerenciador-tarefas/';

    function handleAbrirModal(event) {
        event.preventDefault();
        setExibirModal(true);
    }

    function handleFecharModal() {
        setExibirModal(false);
    }

    function handleFecharModalErro() {
        setExibirModalErro(false);
    }

    async function handleConcluirTarefa(event) {
        event.preventDefault();
        try {
            let { tarefa } = await axios.put(API_URL_CONCLUIR_TAREFA + tarf.id + '/concluir');
            setExibirModal(false);
            recarregarTarefas(true);
        } catch (error) {
            setExibirModal(false);
            setExibirModalErro(true);
        }
        //- INICIO Cósigo para trabalhar com localStorage
        // const tarefaDb = localStorage['tarefas'];
        // let tarefas = tarefaDb ? JSON.parse(tarefaDb) : [];
        // tarefas = tarefas.map(tarefa => {
        //     if(tarefa.id === tarf.id){
        //         tarefa.concluida = true;
        //     }
        //     return tarefa;
        // });
        // localStorage['tarefas'] = JSON.stringify(tarefas);
        //- FIM Cósigo para trabalhar com localStorage

    }
    return (
        <Container className={tarf.concluida} >
            <Button className="btn-sm" onClick={handleAbrirModal} data-testid="btn-abrir-modal">
                <FontAwesomeIcon icon={faClipboardCheck} />
            </Button>

            <Modal show={exibirMOdal} onHide={handleFecharModal} data-testid="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Concluir Tarefa</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Deseja Realmente concluir a seguinte tarefa?
                    <br />
                    <strong>{tarf.nome}</strong>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleConcluirTarefa} data-testid="btn-concluir">
                        SIM
                    </Button>
                    <Button variant="light" onClick={handleFecharModal} data-testid="btn-fechar-modal">
                        NÃO
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={exibirModalErro} onHide={handleFecharModalErro}>
                <Modal.Header closeButton>
                    <Modal.Title>Erro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Erro ao concluir a tarefa, por favor tente novamente mais tarde.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="warning" onClick={handleFecharModalErro}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}