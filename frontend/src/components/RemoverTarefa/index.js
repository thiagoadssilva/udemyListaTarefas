import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

import {
    Container
} from './styled';

export default ({ tarf, recarregarTarefas }) => {
    const [exibirModal, setExibirModal] = useState(false);
    let texto = "Deseja Realmente excluir a tarefa?";

    function handleAbrirModal(event) {
        event.preventDefault();
        setExibirModal(true);
    }

    function handleFecharModal() {
        setExibirModal(false);
    }

    async function handleRemoverTarefa(event){
        event.preventDefault();

        //-INICIO Código usado para trabalhar com localstorage
        // const tarefasDb = localStorage['tarefas'];
        // let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
        // tarefas = tarefas.filter(tarefa => tarefa.id !== tarf.id);
        // localStorage['tarefas'] = JSON.stringify(tarefas);
        //-FIM Código usado para trabalhar com localstorage
        setExibirModal(false);
        recarregarTarefas(true);
    }

    return (
        <Container>
            <Button
                variant="danger"
                className="btn-sm"
                onClick={handleAbrirModal}
                data-testid="btn-abrir-modal"
            >
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>

            <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                <Modal.Header closeButton>
                    <Modal.Title>Remover Tarefa</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {texto}
                    <br />
                    <strong>{tarf.nome}</strong>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleRemoverTarefa} data-testid="btn-remover">
                        SIM
                    </Button>
                    <Button variant="light" onClick={handleFecharModal}>
                        NÃO
                    </Button>
                </Modal.Footer>

            </Modal>
        </Container>
    );
}