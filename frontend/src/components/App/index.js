import React from 'react';
import { useRouter } from 'hookrouter';

const routes = {
    '/': () => <ListaTarefas />,
    '/cadastrar': () => <CadastrarTarefa />,
    '/atualizar/:id': () => <AtualizarTarefa id={id} />
};

function App() {
    return useRouter(routes);
}

export default App;
