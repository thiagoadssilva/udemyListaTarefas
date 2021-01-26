import React, { useState, useEffect } from 'react';
import { Form, Jumbotron, Modal, Button } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';
import axios from 'axios';
import Tarefa from '../../models/tarefa.model';

import {
    Container
} from './styled';

export default (props) => {

    const API_URL_TAREFAS = "http://localhost:3002/gerenciador-tarefas/";

    const [exibirModal, setExibirModal] = useState(false);
    const [formValidado, setFormValidado] = useState(false);
    const [tarefa, setTarefa] = useState('');
    const [carregarTarefa, setCarregarTarefa] = useState(true);
    const [exibirModalErro, setExibirModalErro] = useState(false);

    useEffect(() => {

        async function obterTarefa() {
            try {
                let { data } = await axios.get(API_URL_TAREFAS + props.id);
                setTarefa(data.nome);
            } catch (error) {
                navigate('/');
            }
        }

        if (carregarTarefa) {
            //-INICIO Código para ter acesso ao localStorage
            // const tarefaDb = localStorage['tarefas'];
            // const tarefas = tarefaDb ? JSON.parse(tarefaDb) : [];
            // const tarefa = tarefas.filter(t => t.id === parseInt(props.id))[0];
            //-FIM Código para ter acesso ao localStorage
            obterTarefa();
            setCarregarTarefa(true);
        }
    }, [carregarTarefa, props]);

    function voltar(event) {
        event.preventDefault();
        navigate('/');
    }

    function handleFecharModal() {
        navigate('/');
    }

    function handleFecharModalErro() {
        setExibirModalErro(false);
    }

    async function atualizar(event) {
        event.preventDefault();
        setFormValidado(true);

        if (event.currentTarget.checkValidity() === true) {
            try {
                const tarefaAtualizar = new Tarefa(null, tarefa, false);
                await axios.put(API_URL_TAREFAS + props.id, tarefaAtualizar);
                setExibirModal(true);
            } catch (error) {
                setExibirModalErro(true);
            }
            //- INICIO código referente ao processo do localStorage
            // const tarefaDb = localStorage['tarefas'];
            // let tarefas = tarefaDb ? JSON.parse(tarefaDb) : [];

            // console.log(tarefas);

            // tarefas = tarefas.map(tarefaObj => {
            //     if (tarefaObj.id === parseInt(props.id)) {
            //         tarefaObj.nome = tarefa;
            //     }
            //     return tarefaObj;
            // });
            // localStorage['tarefas'] = JSON.stringify(tarefas);
            //- FIM código referente ao processo do localStorage            
        }
        setExibirModal(true);
    }

    function handleTxtTarefa(event) {
        setTarefa(event.target.value);
    }

    return (
        <Container>
            <h3 className="text-center">Atualiza Tarefa</h3>
            <Jumbotron>

                <Form onSubmit={atualizar} noValidate validated={formValidado}>
                    <Form.Group>
                        <Form.Label>Tarefa:</Form.Label>
                        <Form.Control type="text" minLength="5" maxLength="100" required data-testid="txt-tarefa" value={tarefa} onChange={handleTxtTarefa}>
                            {/* <Form.Control.Feedback type="invalid"> 
                                A tarefa deve conter no minimo 5 caracteres
                            </Form.Control.Feedback> */}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="success" type="submit" data-testid="btn-atualizar">
                            Atualizar
                        </Button>
                        &nbsp;
                        <A href="/" className="btn btn-light" onClick={voltar}>
                            Voltar
                        </A>
                    </Form.Group>
                </Form>

                <Modal show={exibirModal} onHide={handleFecharModal} data-testid="modal">
                    <Modal.Header closeButton>
                        <Modal.Title>Sucesso!!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Tarefa Atualizada com sucesso!!
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
                        Erro ao excluir a tarefa, por favor tente mais tarde!
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