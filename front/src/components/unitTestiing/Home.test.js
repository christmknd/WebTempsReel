import Home  from "../../views/Home";
import React, { createContext, useContext } from 'react';
import {render , screen} from '@testing-library/react';

describe(Home, () => {

    it(" Home component constains title ", () => {
        render(<Home/>);
        const title = screen.getByText('ESGI Moto');
        expect(title).toBeInTheDocument();
    } )
    
})