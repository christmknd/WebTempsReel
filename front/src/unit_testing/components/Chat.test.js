import Chat from '../../components/Chat/Chat';
import {render, fireEvent, getByTestId} from '@testing-library/react';

describe(Chat, () => {

    it('renders Chat', () => {
        render( <div> <form></form> </div> )
    })

    it('message is changed when message is typed', () => {
        const handleChangeMessage = jest.fn()
        const { getByTestId } = render(<form><input data-testid="finalInput"></input> </form>);
        const onChangeInput= getByTestId('finalInput')

        fireEvent.change(onChangeInput,{ target: { value: 'message' } } )

        expect(onChangeInput.value).toBe('message')
    })
})
