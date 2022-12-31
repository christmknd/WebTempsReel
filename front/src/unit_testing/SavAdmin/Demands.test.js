import Demands from '../../components/SavAdmin/Demands'
import {render, fireEvent} from '@testing-library/react';
import { useOutletContext } from "react-router-dom";

describe(Demands, () => {

    it('renders Demands components', () => {
        render(<div className="Demands"></div> )
    })
})