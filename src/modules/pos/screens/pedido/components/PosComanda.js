import React, { useContext } from 'react'
import PosContext from '../../../../../context/posContext/posContext'
import PosComandaItem from './PosComandaItem';


const PosComanda = () => {

  const {pedidos, mesa_global} = useContext(PosContext);
  let pedidosMesaActual = null; 

  if (mesa_global) {
    pedidosMesaActual = pedidos.find(pedido => pedido.objMesa.id === mesa_global.id && pedido.estado === "pendiente");

  }

    return (
        <div className="comanda">
        <h4 className="comanda__mesa">
          {mesa_global ? `Mesa ${mesa_global.mesa_nro}` : "Seleccione mesa"}
        </h4>
        <p className="comanda__usuario">Carlos Jimenez</p>
        <hr />


        {
          !mesa_global ? 
          <div>Seleccione una mesa</div>
          : 
          pedidosMesaActual ?
          <>
          <ul className="comanda__lista">
            {
              pedidosMesaActual.platos.map(plato => {
                return <PosComandaItem plato={plato} key={plato.id}/>
              })
            }
          

          </ul>
          <button className="boton boton-success boton-block">
          PAGAR
        </button>
        </>
        
        
        :
          <div>Mesa sin pedidos</div>

        }

        
        
      </div>
    
    )
}

export default PosComanda
