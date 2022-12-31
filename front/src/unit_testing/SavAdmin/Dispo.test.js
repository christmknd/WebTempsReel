import Dispo from '../../components/SavAdmin/Dispo'
import {render, screen , fireEvent} from '@testing-library/react';

describe(Dispo, () => {

    it('renders components', () => {
        render(<div className='Dispo'></div>)
    })
})