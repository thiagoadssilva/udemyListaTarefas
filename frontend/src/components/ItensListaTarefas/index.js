import React from 'react';
//import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { A } from 'hookrouter';
import ConcluirTarefa from '../ConcluirTarefa';
import RemoverTarefa from '../RemoverTarefa';

// import {
//     Container
// } from './styled';



export default (props) => {

    function marcarConcluida(tarefa) {
        return tarefa.concluida ? 'line-through' : 'none';
    }

    return (
        <>
            {props.tarefas.map((item) => 
                <tr key={item.id} data-testid="taf">
                    <td width="75%" data-testid="nome-tarefa" style={{ textDecoration: marcarConcluida(item) }}>
                        {item.nome}
                    </td>
                    <td style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <ConcluirTarefa tarf={item} recarregarTarefas={props.recarregarTarefas} ocultarIcone={item.concluida ? 'hidden' : null}/>
                        {item.concluida === false &&
                            <A href={"/atualizar/" + item.id} className="btn btn-warning btn-sm">
                                <FontAwesomeIcon icon={faEdit} />
                            </A>
                        }
                        <RemoverTarefa  tarf={item} recarregarTarefas={props.recarregarTarefas}/>
                    </td>
                </tr>
            )}
        </>
    );
}