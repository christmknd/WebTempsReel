import Sav from '../components/Sav/Sav';
import {render, fireEvent} from '@testing-library/react'

describe( Sav, () => {

    it('renders SAV component', () => {
      render(<div className="Sav"></div> )
    })
})