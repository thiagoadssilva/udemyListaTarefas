import React from 'react';
import ReactDOM from 'react-dom';
import Paginacao from './index';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('teste do componente de paginação', () => {

    it('Deve renderizar o componente paginação', () => {
        const div = document.createElement('div');
        ReactDOM.render(
            <Paginacao totalItems={10} itemsPorPagina={10} paginaAtual={1} mudarPagina={() => false} />, div
        );
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Teste para exibir as paginações contendo 2 paginas', () => {
        const { getByTestId } = render(
            <Paginacao totalItems={10} itemsPorPagina={10} paginaAtual={1} mudarPagina={() => false} />
        );
        const paginacao = getByTestId('paginacao');
        expect(paginacao).toHaveTextContent('1');         
    });
});