import Dispo from '../../components/SavAdmin/Dispo'
import {render, screen , fireEvent, getByTestId} from '@testing-library/react';

describe(Dispo, () => {

    it('renders components', () => {
        render(<div className='Dispo'></div>)
    })

    it('call the function to make me available when the button is clicked', () => {
        const activDispo = jest.fn()
        const {getByTestId } = render(<div className='Dispo'> <button data-testid="desactivate"  onClick={activDispo}>Decline</button> </div> )

        const buttonAvailable = getByTestId('desactivate')
        fireEvent.click(buttonAvailable)

        expect(activDispo).toHaveBeenCalled()
    })

    it('call the function to make me unavailable when the button is clicked', () => {
        const activDispo = jest.fn()
        const {getByTestId } = render(<div className='Dispo'> <button data-testid="activate"  onClick={activDispo}>Désactiver ma disponibilité</button> </div> )

        const buttonUnvailable = getByTestId('activate')
        fireEvent.click(buttonUnvailable)

        expect(activDispo).toHaveBeenCalled()
    })
})
