import React, { useEffect, useState, useContext } from "react";
import PosContext from "../../../../../context/posContext/posContext";
import { getMesas } from "../../../../../services/mesaServices";

const PosMesas = () => {
  const [mesas, setMesas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const { seleccionarMesaGlobal, mesa_global } = useContext(PosContext);
  // const {seleccionarMesaGlobal, mesa_global_id} = useContext(PosState)


  useEffect(() => {

    setCargando(true);
    
    getMesas().then(data => {
      console.log("Mesas");
      console.log(data);
      setMesas(data);
      setCargando(false)
    });

  }, []);

  return (
    <div className="mesas">
      <ul className="mesas__lista">
        {cargando ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          mesas?.map((objMesa) => {
            return (
              <li key={objMesa.id}
              className={ mesa_global?.mesa_id === objMesa.id ? "mesas__mesa active" : "mesas__mesa" }
              onClick={() => seleccionarMesaGlobal(objMesa)}
              >
                <span className="mesas__titulo">Mesa</span>
                <span className="mesas__numero">{objMesa.mesa_nro}</span>
              </li>
            );
          })
        )}
      </ul>
      <div className="mesas__info"></div>
    </div>
  );
};

export default PosMesas;
