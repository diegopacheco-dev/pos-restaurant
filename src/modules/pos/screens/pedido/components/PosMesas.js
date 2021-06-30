import React, { useEffect, useState } from "react";
import { getMesas } from "../../../../../firebase/servicios";

const PosMesas = () => {
  const [mesas, setMesas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    getMesas().then((data) => {
      setMesas(data);
      setCargando(false);
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
          mesas.map((objMesa) => {
            return (
              <li className="mesas__mesa" key={objMesa.id}>
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
