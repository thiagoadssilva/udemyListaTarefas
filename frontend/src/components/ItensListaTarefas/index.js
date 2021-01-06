import React from 'react';
//import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { A } from 'hookrouter';

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
                <tr key={item.id} data-testid="tarefa">
                    <td width="75%" data-testid="nome-tarefa" style={{ textDecoration: marcarConcluida(item) }}>
                        {item.nome}
                    </td>
                    <td className="text-right">
                        {item.concluida === false &&
                            <A href={"/atualizar/" + item.id} className="btn btn-warning btn-sm">
                                <FontAwesomeIcon icon={faEdit} />
                            </A>
                        }
                    </td>
                </tr>
            )}
        </>
    );
}