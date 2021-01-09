import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

import {
    Container
} from './styled';

export default ({ mudarPagina, paginaAtual, totalItems, itemsPorPagina }) => {

    function gerarPrimeiroItem() {
        return (
            <Pagination.First key="pagfirst" onClick={() => mudarPagina(1)} disabled={paginaAtual === 1} />
        );
    }

    function gerarItemAnterior() {
        return (
            <Pagination.Prev key="pagPrev" onClick={() => mudarPagina(paginaAtual - 1)} disabled={paginaAtual === 1} />
        );
    }

    function gerarItemNumerico(pagina) {
        return (
            <Pagination.Item key={pagina} active={pagina === paginaAtual} onClick={() => mudarPagina(pagina)}>
                {pagina}
            </Pagination.Item>
        );
    }

    function gerarProximoItem(numPaginas) {
        return (
            <Pagination.Next key="pagNext" onClick={() => mudarPagina(paginaAtual + 1)} disabled={paginaAtual === numPaginas} />
        );
    }

    function gerarUltimoItem(numPaginas) {
        return (
            <Pagination.Last key="pagLast" onClick={() => mudarPagina(numPaginas)} disabled={paginaAtual === numPaginas}/>
        );
    }

    function obterPaginacao() {
        const numPaginas = Math.ceil(totalItems / itemsPorPagina); 
        let items = [];

        items.push(gerarPrimeiroItem());
        items.push(gerarItemAnterior());

        for (let pagina = 1; pagina <= numPaginas; pagina++) {
            items.push(gerarItemNumerico(pagina));
        }

        items.push(gerarProximoItem(numPaginas));
        items.push(gerarUltimoItem(numPaginas));

        return items;
    }

    return (
        <Container>
            <Pagination data-testid="paginacao">
                {obterPaginacao()}
            </Pagination>
        </Container>
    );
}