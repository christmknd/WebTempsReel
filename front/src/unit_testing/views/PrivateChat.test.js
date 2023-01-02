import PrivateChat from '../../views/PrivateChat'
import {render, fireEvent} from '@testing-library/react'

describe(PrivateChat, () => {

    it('render SAV', () => {
        render( <div></div>)
    })

    it('message is changed when message is typed', () => {
        const sendMessage = jest.fn()
        const { getByTestId } = render(<div><input data-testid="sendMessage"></input> </div>);
        const onChangeInput= getByTestId('sendMessage')

        fireEvent.change(onChangeInput,{ target: { value: 'message' } } )

        expect(onChangeInput.value).toBe('message')
    })
})