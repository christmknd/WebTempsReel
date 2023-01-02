import Demands from '../../components/SavAdmin/Demands'
import {render, fireEvent, getByTestId } from '@testing-library/react';

describe(Demands, () => {

    it('renders Demands components', () => {
        render(<div className="Demands"></div> )
    })

    it('decline demand when there is a demand in attendance', () => {
        const declineDemand = jest.fn()
        const {getByTestId } = render(<div className='Demands'> <button data-testid="decline"  onClick={() => declineDemand()}>Decline</button> </div> )

        const buttonDemand = getByTestId('decline')
        fireEvent.click(buttonDemand)

        expect(declineDemand).toHaveBeenCalled()
    })

    it('accept demand when there is a demand in attendance', () => {
        const acceptDemand = jest.fn()
        const {getByTestId } = render(<div className='Demands'> <button data-testid="accept"  onClick={() => acceptDemand()}>Accept</button> </div> )

        const buttonDemand = getByTestId('accept')
        fireEvent.click(buttonDemand)

        expect(acceptDemand).toHaveBeenCalled()
    })
})