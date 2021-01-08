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



export default ({ tarefas, recarregarTarefas }) => {

    function marcarConcluida(tarefa) {
        return tarefa.concluida ? 'line-through' : 'none';
    }

    return (
        <>
            {tarefas.map((item) => 
                <tr key={item.id} data-testid="taf">
                    <td width="75%" data-testid="nome-tarefa" style={{ textDecoration: marcarConcluida(item) }}>
                        {item.nome}
                    </td>
                    <td className="text-right">
                        <ConcluirTarefa tarf={item} recarregarTarefas={recarregarTarefas} ocultarIcone={item.concluida ? 'hidden' : null}/>
                        &nbsp;
                        {item.concluida === false &&
                            <A href={"/atualizar/" + item.id} className="btn btn-warning btn-sm">
                                <FontAwesomeIcon icon={faEdit} />
                            </A>
                        }
                        &nbsp;
                        <RemoverTarefa  tarf={item} recarregarTarefas={recarregarTarefas}/>
                    </td>
                </tr>
            )}
        </>
    );
}