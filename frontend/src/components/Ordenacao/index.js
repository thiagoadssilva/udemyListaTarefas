import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

import {
    Container,
    FaSortContainer,
    FaSortUpContainer,
    FaSortDownContainer
} from './styled';

export default (props) => {
    
    // function handleAscDesc() {
    //     return(props.ordenarAsc || props.ordenarDesc) ? 'hidden' : '';
    // }

    // function handleAsc(){
    //     return props.ordenarAsc ? '' : 'hidden';
    // }

    // function handleDesc(){
    //     return props.ordenarDesc ? '' : 'hidden';
    // }

    return (
        <Container>

            <FaSortContainer faSorteAsc={props.ordenarAsc} faSorteDesc={props.ordenarDesc} data-testid="faSort">
                <FontAwesomeIcon icon={faSort}/>
            </FaSortContainer>

            <FaSortUpContainer faSorteUpAsc={props.ordenarAsc} data-testid="faSortUp">
                <FontAwesomeIcon icon={faSortUp}/>
            </FaSortUpContainer>

            <FaSortDownContainer faSorteDownDesc={props.ordenarDesc} data-testid="faSortDown">
                <FontAwesomeIcon icon={faSortDown}/>
            </FaSortDownContainer>
            
            
        </Container>
    );
}



