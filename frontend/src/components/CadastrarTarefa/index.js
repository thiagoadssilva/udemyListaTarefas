import React, { useState } from 'react';
import { Button, Form, Jumbotron, Modal } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';
import Tarefa from '../../models/tarefa.model';
import axios from 'axios';

import {
    Container
} from './styled';

export default () => {
    const API_URL_CADASTRAR_TAREFA = "http://localhost:3002/gerenciador-tarefas";

    const [tarefa, setTarefa] = useState('');
    const [formValidado, setFormValidado] = useState(false);
    const [exibirModal, setExibirModal] = useState(false);
    const [exibirModalErro, setExibirModalErro] = useState(false);

    async function cadastrar(event) {
        event.preventDefault();
        setFormValidado(true);
        if (event.currentTarget.checkValidity() === true) {
            try {
                const novaTarefa = new Tarefa(null, tarefa, false);
                await axios.post(API_URL_CADASTRAR_TAREFA, novaTarefa);
                setExibirModal(true);
            } catch (error) {
                setExibirModalErro(true);
            }
            //- INICIO Parte referente ao uso do localStorage
            // const tarefasDb = localStorage['tarefas'];
            // const tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];

            // tarefas.push(new Tarefa(new Date().getTime(), tarefa, false));
            // localStorage['tarefas'] = JSON.stringify(tarefas);
            // setExibirModal(true);
            //- FIM Parte referente ao uso do localStorage
        }
    }

    function handleTxtTarefa(event) {
        setTarefa(event.target.value);
    }

    function handleFecharModal() {
        navigate('/');
    }

    function handleFecharModalErro(){
        setExibirModalErro(false);
    }

    return (
        <Container>
            <h3 className="text-center">Cadastrar</h3>
            <Jumbotron>
                <Form validated={formValidado} noValidate onSubmit={cadastrar}>
                    <Form.Group>
                        <Form.Label>Tarefa:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Informe a Tarefa"
                            minLength="5"
                            maxLength="100"
                            required
                            value={tarefa}
                            onChange={handleTxtTarefa}
                            data-testid="txt-tarefa"
                        >
                            {/* <Form.Control.Feedback type="invalid">
                                A tarefa deve conter ao menos 5 caracteres.
                            </Form.Control.Feedback> */}

                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button
                            variant="success"
                            type="submit"
                            className=" btn btn-success btn-sm"
                            data-testid="btn-cadastrar"
                        >
                            Cadastrar
                        </Button>
                        &nbsp;
                        <A href="/" className="btn btn-light">Voltar</A>
                    </Form.Group>
                </Form>
                <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Sucesso!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Tarefa Cadastrada com Sucesso!!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleFecharModal}>
                            Continuar
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={exibirModalErro} onHide={handleFecharModalErro}>
                    <Modal.Header closeButton>
                        <Modal.Title>Erro</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Erro ao adicionar a tarefa, por favor tente novamente!
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="warning" onClick={handleFecharModalErro}>
                            Fechar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Jumbotron>
        </Container>
    );
}