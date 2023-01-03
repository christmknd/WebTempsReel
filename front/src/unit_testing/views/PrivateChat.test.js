import PrivateChat from '../../views/PrivateChat'
import {render, fireEvent} from '@testing-library/react'
import socketIOClient from "socket.io-client";



describe(PrivateChat, () => {

    it('message is changed when message is typed', () => {
        const sendMessage = jest.fn()
        const { getByTestId } = render(<div><input data-testid="sendMessage"></input> </div>);
        const onChangeInput= getByTestId('sendMessage')

        fireEvent.change(onChangeInput,{ target: { value: 'message' } } )

        expect(onChangeInput.value).toBe('message')
    })


    it('send message via socket.io', () => {
        
        const socket = socketIOClient("ws:localhost");
        const {container} = render( <form><input data-testid="sendMessage"/></form> );
        socket.emit("send:message", 'my message');
        socket.on("send:message", res => {
            expect(res).toEqual('my message')
        })
    })
  
})