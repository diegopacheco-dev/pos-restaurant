import React, { useContext, useEffect, useState } from "react";
import PosContext from "../../../../../context/posContext/posContext";
import { getPlatosByCategoria } from "../../../../../services/categoriaService";
import PosPlato from "./PosPlato";

const PosPlatos = () => {
  
  const { categoria_global } = useContext(PosContext);

  const [platos, setPlatos] = useState([])

  const [cargando, setCargando] = useState(true);

  
  useEffect(() => {
    setCargando(true);

    // obtener platos con los servicios 
    // setear el arreglo platos con la data traida
    if (categoria_global) {
      getPlatosByCategoria(categoria_global.id).then(data => {
        console.log("Platos por categoria");
        console.log(data);
        setPlatos(data);
        setCargando(false);
      });
      
    }


  }, [categoria_global]);





  return (
    
    <div className="carta__platos">

      {
        categoria_global ? 
        cargando ?
          <div className="text-light" >Cargando...</div>
        : 
        (
          platos.map(objPlato => {
            return <PosPlato objPlato={objPlato} key={objPlato.plato_id} />
          })  
        )      
        :
        <h4 class="text-light mt-5">Ninguna categoria ha sido seleccionada</h4>
      }



    </div>
  )
};

export default PosPlatos;
