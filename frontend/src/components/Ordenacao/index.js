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
    
    console.log("ASC " + props.ordenarAsc);
    console.log("DESC " + props.ordenarDesc);

    function handleAscDesc() {
        return(props.ordenarAsc || props.ordenarDesc) ? 'hidden' : '';
    }

    function handleAsc(){
        return props.ordenarAsc ? '' : 'hidden';
    }

    function handleDesc(){
        return props.ordenarDesc ? '' : 'hidden';
    }

    const styled = {
        diplay: 'none'
    }

    return (
        <Container>

            <FaSortContainer faSorteAsc={props.ordenarAsc} faSorteDesc={props.ordenarDesc} >
                <FontAwesomeIcon icon={faSort} data-testid="faSort"/>
            </FaSortContainer>

            <FaSortUpContainer faSorteUpAsc={props.ordenarAsc}>
                <FontAwesomeIcon icon={faSortUp} className={handleAsc()} data-testid="faSortUp"/>
            </FaSortUpContainer>

            <FaSortDownContainer faSorteDownDesc={props.ordenarDesc}>
                <FontAwesomeIcon icon={faSortDown} className={handleDesc()} data-testid="faSortDown"/>
            </FaSortDownContainer>
            
            
        </Container>
    );
}



