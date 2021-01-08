import styled from 'styled-components';

export const Container = styled.span`
    margin-bottom: 10px;
    display: ${props => props.className ? 'none' : 'block'};
`;