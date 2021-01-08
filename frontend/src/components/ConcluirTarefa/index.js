import React, {useState} from 'react';
import {Modal, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faClipboardCheck} from '@fortawesome/free-solid-svg-icons';

import {
    Container
} from './styled';

export default ({tarf, recarregarTarefas, ocultarIcone}) => {
    const [exibirMOdal, setExibirModal] = useState(false);

    function handleAbrirModal(event){
        event.preventDefault();
        setExibirModal(true);
    }

    function handleFecharModal(){
        setExibirModal(false);
    }

    function handleConcluirTarefa(event){
        event.preventDefault();
        const tarefaDb = localStorage['tarefas'];
        let tarefas = tarefaDb ? JSON.parse(tarefaDb) : [];
        tarefas = tarefas.map(tarefa => {
            if(tarefa.id === tarf.id){
                tarefa.concluida = true;
            }
            return tarefa;
        });
        localStorage['tarefas'] = JSON.stringify(tarefas);
        setExibirModal(false);
        recarregarTarefas(true);
    }
    return(
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
        </Container>
    );
}