import FormNbrKlm from '../../../components/ChatBot/FormNbrKlm';
import {render, fireEvent} from '@testing-library/react';

describe(FormNbrKlm, () => {

    it('message is changed when message is typed', () => {
        const handleChangeNumber= jest.fn()
        const { getByTestId } = render(<form><input data-testid="nbrKlm"></input> </form>);
        const onChangeInput= getByTestId('nbrKlm')

        fireEvent.change(onChangeInput,{ target: { value: 'message' } } )

        expect(onChangeInput.value).toBe('message')
    })

    it('form submission when the input is not disabled', () => {
        const handleSubmitNumber = jest.fn()
        const { getByTestId } = render(<form onSubmit={handleSubmitNumber}><input data-testid="nbrKlm"></input></form>);
        fireEvent.submit(getByTestId("nbrKlm"));
        expect(handleSubmitNumber).toHaveBeenCalled();
     })
})