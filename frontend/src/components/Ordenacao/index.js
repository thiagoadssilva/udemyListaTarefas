import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

import {
    Container
} from './styled';

export default (props) => {
    
    function handleAscDesc() {
        return(props.ordenarAsc || props.ordenarDesc) ? 'hidden' : '';
    }

    function handleAsc(){
        return props.ordenarAsc ? '' : 'hidden';
    }

    function handleDesc(){
        return props.ordenarDesc ? '' : 'hidden';
    }

    return (
        <Container>
            <FontAwesomeIcon icon={faSort} className={handleAscDesc()} data-testid="faSort"/>
            <FontAwesomeIcon icon={faSortUp} className={handleAsc()} data-testid="faSortUp"/>
            <FontAwesomeIcon icon={faSortDown} className={handleDesc()} data-testid="faSortDown"/>
        </Container>
    );
}



