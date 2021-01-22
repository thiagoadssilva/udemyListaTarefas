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
    const [exibirModalErro, setExibirModalErro] = useState(false);

    const API_URL_TAREFA = "http://localhost:3001/gerenciador-tarefas/";

    let texto = "Deseja Realmente excluir a tarefa?";

    function handleAbrirModal(event) {
        event.preventDefault();
        setExibirModal(true);
    }

    function handleFecharModal() {
        setExibirModal(false);
    }

    function handleFecharModalErro(){
        setExibirModalErro(false);
    }

    async function handleRemoverTarefa(event) {
        event.preventDefault();

        try {
            let {tarefa} = await axios.delete(API_URL_TAREFA + tarf.id);
            setExibirModal(false);
            recarregarTarefas(true);
        } catch (error) {
            setExibirModalErro(true);
        }
        //-INICIO Código usado para trabalhar com localstorage
        // const tarefasDb = localStorage['tarefas'];
        // let tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];
        // tarefas = tarefas.filter(tarefa => tarefa.id !== tarf.id);
        // localStorage['tarefas'] = JSON.stringify(tarefas);
        //-FIM Código usado para trabalhar com localstorage
        
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

            <Modal show={exibirModalErro} onHide={handleFecharModalErro}>
                <Modal.Header closeButton>
                    <Modal.Title>Erro</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Erro ao remover a tarefa, por favo tente novamente.
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