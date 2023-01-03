import Sav from '../../components/Sav/Sav';
import {render, fireEvent} from '@testing-library/react'

describe( Sav, () => {

    it('should call help when the button is not disabled', () => {
      const demandeConseiller = jest.fn()
      const {getByTestId} = render(<div className="Sav"> <button data-testid="demandCons" onClick={demandeConseiller}></button> </div>)
      const demandeConsButton = getByTestId('demandCons')
      
      fireEvent.click(demandeConsButton)

      expect(demandeConseiller).toHaveBeenCalled();

    })
})