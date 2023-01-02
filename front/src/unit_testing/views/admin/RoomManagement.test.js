import RoomManagement from "../../../views/admin/RoomManagement";
import {render, fireEvent, getByTestId, getByPlaceholderText} from '@testing-library/react'

describe(RoomManagement, () => {

    it('create room', () => {
        const addRoom = jest.fn()
        const setRoomNameInput = jest.fn()
        const setRoomMaxUsersInput = jest.fn()
        const {getByPlaceholderText , getByTestId} = render( 
        <form onSubmit={addRoom}> 
        <input onChange={setRoomNameInput} placeholder="Room name"></input>
        <input onChange={setRoomMaxUsersInput} placeholder="Max users"></input>
        <input data-testid="add" /> 
        </form> 
        )
        const onChangeInput= getByPlaceholderText('Room name')
        fireEvent.change(onChangeInput,{ target: { value: 'room one' } } )
        expect(onChangeInput.value).toBe('room one')

        const otherChangeInput= getByPlaceholderText('Max users')
        fireEvent.change(otherChangeInput,{ target: { value: '10' } } )
        expect(otherChangeInput.value).toBe('10')


        fireEvent.submit(getByTestId("add"));
        expect(addRoom).toHaveBeenCalled();
    })


    it('update room ' , () => {
        const updateRoom = jest.fn()
        const deleteRoom = jest.fn()
        const setNewRoomNameInput = jest.fn()
        const setNewRoomMaxUsersInput = jest.fn()
        const {getByPlaceholderText , getByTestId} = render( 
            <div> 
            <input onChange={setNewRoomNameInput} placeholder="New room name"></input>
            <input onChange={setNewRoomMaxUsersInput} placeholder="Max users"></input>
            <button onClick={updateRoom} data-testid="update"></button> 
            <button onClick={deleteRoom} data-testid="delete"></button>
            </div> 
            )
        const onChangeInput= getByPlaceholderText('New room name')
        fireEvent.change(onChangeInput,{ target: { value: 'room one' } } )
        expect(onChangeInput.value).toBe('room one')
    
        const otherChangeInput= getByPlaceholderText('Max users')
        fireEvent.change(otherChangeInput,{ target: { value: '10' } } )
        expect(otherChangeInput.value).toBe('10')

        fireEvent.click(getByTestId("update"));
        expect(updateRoom).toHaveBeenCalled();

        fireEvent.click(getByTestId("delete"));
        expect(deleteRoom).toHaveBeenCalled();
        
    })


})