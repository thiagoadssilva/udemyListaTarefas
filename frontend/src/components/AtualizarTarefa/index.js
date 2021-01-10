import React, { useState, useEffect } from 'react';
import { Form, Jumbotron, Modal, Button } from 'react-bootstrap';
import { navigate, A } from 'hookrouter';

import {
    Container
} from './styled';

export default (props) => {

    const [exibirModal, setExibirModal] = useState(false);
    const [formValidado, setFormValidado] = useState(false);
    const [tarefa, setTarefa] = useState('');
    const [carregarTarefa, setCarregarTarefa] = useState(true);

    useEffect(() =>{
        if(carregarTarefa){
            const tarefaDb = localStorage['tarefas'];
            const tarefas = tarefaDb ? JSON.parse(tarefaDb) : [];
            const tarefa = tarefas.filter(t => t.id === parseInt(props.id))[0];
            setTarefa(tarefa.nome);
            setCarregarTarefa(true);
        }
    }, [carregarTarefa, props]);

    function voltar(event) {
        event.preventDefault();
        navigate('/');
    }

    function handleFecharModal(){
        navigate('/');
    }

    function atualizar(event){
        event.preventDefault();
        setFormValidado(true);

        if(event.currentTarget.checkValidity() === true){
            const tarefaDb = localStorage['tarefas'];
            let tarefas = tarefaDb ? JSON.parse(tarefaDb) : [];

            console.log(tarefas);

            tarefas = tarefas.map(tarefaObj =>{
                if(tarefaObj.id === parseInt(props.id)){
                    tarefaObj.nome = tarefa;
                }
                return tarefaObj;
            });
            localStorage['tarefas'] = JSON.stringify(tarefas);
            setExibirModal(true);
        }
        setExibirModal(true);
    }

    function handleTxtTarefa(event){
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

            </Jumbotron>
        </Container>
    );
}