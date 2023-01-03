import Chat from '../../components/Chat/Chat';
import {render, fireEvent, getByTestId, getByPlaceholderText, waitFor} from '@testing-library/react';
import socketIOClient from "socket.io-client";

describe(Chat, () => {

    it('send message via socket.io', () => {
        
        const socket = socketIOClient("ws:localhost");
        const {container} = render( <form><input data-testid="finalInput"/></form> );
        socket.emit("send:message", 'my message');
        socket.on("send:message", res => {
            expect(res).toEqual('my message')
        })
    })
  

    it('send message via Web socket',async () => {
        const handleSubmitMessage = jest.fn() 
        const handleChangeMessage = jest.fn() 
        const {getByPlaceholderText, getByTestId} = render( 
        <form onSubmit={handleSubmitMessage}> 
        <input onChange={handleChangeMessage} placeholder="Write a message" /> 
        <input data-testid="finalInput"/>
        </form> 
        )
        const messageInput = getByPlaceholderText("Write a message")
        fireEvent.change(messageInput,{ target: { value: 'message' } } )

        expect(messageInput.value).toBe('message')

        
        fireEvent.submit(getByTestId("finalInput"));
        expect(handleSubmitMessage).toHaveBeenCalled();

    })
})
