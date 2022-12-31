import Sav from '../components/Sav/Sav';
import {render, fireEvent} from '@testing-library/react'

describe( Sav, () => {

    it('it calls DemandeConseiller when button is clicked', () => {
        const {getByText} = render(<Sav/>);
        jest.spyOn(Sav.prototype, 'demandeConseiller');
        fireEvent.click(getByText('Demande de communication avec un conseiller de vente'))
        expect(Sav.prototype.handleClick).toHaveBeenCalled();

    })
})