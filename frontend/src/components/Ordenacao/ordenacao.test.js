import React from 'react';
import ReactDOM from 'react-dom';
import Ordenacao from './index';
import {render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('Teste do componente de ordenação', () =>{
    it('Deve renderizar o componente sem erros', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Ordenacao ordenarAsc={false}  ordenarDesc={false}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('Deve exibir a ordenação padrão', () =>{
        const {getByTestId} = render(<Ordenacao ordenarAsc={false}  ordenarDesc={false}/>);
        expect(getByTestId('faSort')).not.toHaveClass('none');
        expect(getByTestId('faSortUp')).toHaveClass('none');
        expect(getByTestId('faSortDowm')).toHaveClass('none');
    });

    it('Deve exibir a ordenação ascendente', () =>{
        const {getByTestId} = render(<Ordenacao ordenarAsc={true}  ordenarDesc={false}/>);
        expect(getByTestId('faSort')).toHaveClass('none');
        expect(getByTestId('faSortUp')).not.toHaveClass('none');
        expect(getByTestId('faSortDowm')).toHaveClass('none');
    });

    it('Deve exibir a ordenação descendenten', () =>{
        const {getByTestId} = render(<Ordenacao ordenarAsc={false}  ordenarDesc={true}/>);
        expect(getByTestId('faSort')).toHaveClass('none');
        expect(getByTestId('faSortUp')).toHaveClass('none');
        expect(getByTestId('faSortDowm')).not.toHaveClass('none');
    });
});