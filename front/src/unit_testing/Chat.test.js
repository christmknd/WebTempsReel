import Chat from '../components/Chat/Chat';
import {render, fireEvent} from '@testing-library/react';

describe(Chat, () => {

    it('send message when message is submitted in form', () => {
        const {getByText} = render(<Chat/>);
        jest.spyOn(Chat.prototype, 'handleSubmitMessage')
        fireEvent.submit(getByText('Submit'))
    })
})
