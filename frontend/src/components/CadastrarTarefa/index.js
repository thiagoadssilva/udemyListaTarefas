import React, { useState } from 'react';
import { Button, Form, Jumbotron, Modal } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';
import Tarefa from '../../models/tarefa.model';

import {
    Container
} from './styled';

export default () => {
    const [tarefa, setTarefa] = useState('');
    const [formValidado, setFormValidado] = useState(false);
    const [exibirModal, setExibirModal] = useState(false);

    function cadastrar(event) {
        event.preventDefault();
        setFormValidado(true);
        if(event.currentTarget.checkValidity() === true){
            const tarefasDb = localStorage['tarefas'];
            const tarefas = tarefasDb ? JSON.parse(tarefasDb) : [];

            tarefas.push(new Tarefa(new Date().getTime(), tarefa, false));
            localStorage['tarefas'] = JSON.stringify(tarefas);
            setExibirModal(true);
        }
    }

    function handleTxtTarefa(event) {
        setTarefa(event.target.value);
    }

    function handleFecharModal(){
        navigate('/');
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
            </Jumbotron>
        </Container>
    );
}