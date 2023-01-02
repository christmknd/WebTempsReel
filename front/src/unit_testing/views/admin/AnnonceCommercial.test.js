import AnnonceCommercial from "../../../views/admin/AnnonceCommercial";
import {render, fireEvent , screen, getByTestId, getByPlaceholderText} from '@testing-library/react'

describe(AnnonceCommercial, () => {

    it('message is changed when message is typed', () => {
        const handleChangeText = jest.fn()
        const { getByPlaceholderText } = render(<form><input onChange={handleChangeText} placeholder="Write a message"></input> </form>);
        const onChangeInput= getByPlaceholderText('Write a message')

        fireEvent.change(onChangeInput,{ target: { value: 'message' } } )

        expect(onChangeInput.value).toBe('message')
    })

    it('form submission', () => {
        const handleSubmitText = jest.fn()
        const { getByTestId } = render(<form onSubmit={handleSubmitText}><input data-testid="submit"></input></form>);
        fireEvent.submit(getByTestId("submit"));
        expect(handleSubmitText).toHaveBeenCalled();
     })
})
