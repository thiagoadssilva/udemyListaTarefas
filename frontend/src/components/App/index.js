import React from 'react';
import { useRoutes } from 'hookrouter';

import ListaTarefas from '../ListaTarefas';
import CadastrarTarefa from '../CadastrarTarefa';
import AtualizarTarefa from '../AtualizarTarefa';

const routes = {
    '/': () => <ListaTarefas />,
    '/cadastrar': () => <CadastrarTarefa />,
    '/atualizar/:id': ({id}) => <AtualizarTarefa id={id} />
};

function App() {
    return useRoutes(routes);
}

export default App;
