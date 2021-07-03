import React from "react";

const PosComandaItem = ( { plato } ) => {
  return (
    <li className="comanda__item">
      <p className="comanda__nombre">
        <span>
          <strong>{plato.plato_nom}</strong>
        </span>
        <span>S/{plato.plato_precio}</span>
      </p>
      <p className="comanda__cantidad">{plato.cantidad}</p>
      <p className="comanda__precio">
        <strong>S/{+plato.plato_precio * +plato.cantidad}</strong>
      </p>
    </li>
  );
};

export default PosComandaItem;
