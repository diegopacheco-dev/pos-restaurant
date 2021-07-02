import React, { useState, useEffect, useContext } from "react";
import platoIcon from "../../../../../assets/img/plato_blanco.svg";
import PosContext from "../../../../../context/posContext/posContext";
import { getCategorias } from "../../../../../services/categoriaService";



const PosCategorias = () => {

  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const { seleccionarCategoriaGlobal, categoria_global } = useContext(PosContext);

  useEffect(() => {

    setCargando(true);


    getCategorias().then(data => {
      setCategorias(data);
      setCargando(false);
    })



  }, []);

  return (
    <nav className="menu">
      <ul className="menu__lista">
        {cargando ? (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          categorias.map((objCategoria) => {
            return (
              // <li className="active">
              <li style={{ textAlign: "center" }} 
              key={objCategoria.id}
              className={
                  objCategoria.id === categoria_global?.id ? "active" : ""
                
                }
              onClick={() => {
                  seleccionarCategoriaGlobal(objCategoria);
              }} >
                <img src={platoIcon} alt="" />
                <span>{objCategoria.cat_nom}</span>
              </li>
            );
          })
        )}
      </ul>
    </nav>
  );
};

export default PosCategorias;
