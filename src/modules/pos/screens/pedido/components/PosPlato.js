import React, { useContext } from 'react'
import PosContext from '../../../../../context/posContext/posContext';

const PosPlato = ({objPlato}) => {

    const { incrementarPlatoAPedido, restarPlatoAPedido} = useContext(PosContext);



    return (
        <div className="carta__plato">
        <img
        //   src={objPlato.plato_img}
          src={objPlato.plato_img}
          alt=""
        />
        {/* El titulo debe consumir el titulo de objPlato */}
        <h4 className="carta__titulo">{objPlato.plato_nom}</h4>
        <span className="carta__precio">{objPlato.plato_precio}</span>
        <div className="carta__botones">
          <button className="boton boton-outline-primary boton-restar"
          onClick={() => restarPlatoAPedido(objPlato)}
          >
            -1
          </button>
          <button className="boton boton-outline-primary boton-sumar"
          onClick={() => incrementarPlatoAPedido(objPlato)}
          >
            +1
          </button>
        </div>
      </div>
   
    )
}

export default PosPlato
