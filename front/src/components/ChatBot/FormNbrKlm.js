import { useState } from "react";

function FormNbrKlm(props) {
  const [nbrKlm, setNbrKlm] = useState(0);

  function handleChangeNumber(e) {
    setNbrKlm(e.target.value);
  }

  function GreatherThanTenThousand(number) {
    let obj;
    const numberCompare = 10000;
    if (number >= numberCompare) {
      obj = {
        id: 12,
        text: `${nbrKlm} - nombre de kilometre est supérieur ou égale à 10 000`,
      };
    } else {
      obj = {
        id: 132,
        text: `${nbrKlm} - nombre de kilometre est inférieur à 10 000`,
      };
    }
    return obj;
  }

  function handleSubmitNumber(e) {
    e.preventDefault();
    const obj = GreatherThanTenThousand(nbrKlm);
    setNbrKlm(0);
    props.returnFormObj(obj);
  }

  return (
    <form onSubmit={handleSubmitNumber}>
      <input type="number" value={nbrKlm} onChange={handleChangeNumber} />
      <input disabled={!nbrKlm} type="submit" value="Submit" />
    </form>
  );
}

export default FormNbrKlm;
