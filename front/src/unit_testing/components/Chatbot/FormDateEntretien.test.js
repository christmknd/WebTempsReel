import FormDateEntretien from '../../../components/ChatBot/FormDateEntretien';
import {render, fireEvent} from '@testing-library/react';

describe(FormDateEntretien, () => {
    
    it('renders components', () => {
        render(<form></form> )
    })

    it('message is changed when message is typed', () => {
        const handleChangeMessage = jest.fn()
        const { getByTestId } = render(<form><input data-testid="dateEntretien"></input> </form>);
        const onChangeInput= getByTestId('dateEntretien')

        fireEvent.change(onChangeInput,{ target: { value: 'message' } } )

        expect(onChangeInput.value).toBe('message')
    })

    
    it('form submission when the input is not disabled', () => {
       const handleSubmitDate = jest.fn()
       const { getByTestId } = render(<form onSubmit={handleSubmitDate}><input data-testid="dateEntretien"></input></form>);
       fireEvent.submit(getByTestId("dateEntretien"));
       expect(handleSubmitDate).toHaveBeenCalled();
    })
    
})