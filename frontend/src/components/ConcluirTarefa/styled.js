import styled from 'styled-components';

export const Container = styled.span`
    display: ${props => props.className ? 'none' : 'block'};
`;