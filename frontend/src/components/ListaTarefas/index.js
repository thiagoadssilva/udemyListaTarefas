import React from 'react';
import { A } from 'hookrouter';


import {
    Container
} from './styled';

export default () => {
    return(
        <Container>
             <A href="/cadastrar" className="btn btn-success bnt-sm" >
                Nova Tarefa
            </A>
        </Container>
    );
}