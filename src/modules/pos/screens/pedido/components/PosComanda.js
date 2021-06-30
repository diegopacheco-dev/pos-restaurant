import React from 'react'

const PosComanda = () => {
    return (
        <div className="comanda">
        <h4 className="comanda__mesa">Mesa 01</h4>
        <p className="comanda__usuario">Carlos Jimenez</p>
        <hr />

        <ul className="comanda__lista">
          <li className="comanda__item">
            <p className="comanda__nombre">
              <span>
                <strong>Arroz Chaufa de Pollo</strong>
              </span>
              <span>Precio: S/ 35.00</span>
            </p>
            <p className="comanda__cantidad">01</p>
            <p className="comanda__precio">
              <strong>S/ 35.00</strong>
            </p>
          </li>
          <li className="comanda__item">
            <p className="comanda__nombre">
              <span>
                <strong>Lomo Saltado</strong>
              </span>
              <span>Precio: S/ 35.00</span>
            </p>
            <p className="comanda__cantidad">01</p>
            <p className="comanda__precio">
              <strong>S/ 35.00</strong>
            </p>
          </li>
          <li className="comanda__item">
            <p className="comanda__nombre">
              <span>
                <strong>Café expreso</strong>
              </span>
              <span>Precio: S/ 5.00</span>
            </p>
            <p className="comanda__cantidad">01</p>
            <p className="comanda__precio">
              <strong>S/ 5.00</strong>
            </p>
          </li>
          <li className="comanda__item">
            <p className="comanda__nombre">
              <span>
                <strong>Porc. Torta Helada</strong>
              </span>
              <span>Precio: S/ 8.00</span>
            </p>
            <p className="comanda__cantidad">01</p>
            <p className="comanda__precio">
              <strong>S/ 8.00</strong>
            </p>
          </li>
        </ul>
        <button className="boton boton-success boton-block">
          PAGAR
        </button>
      </div>
    
    )
}

export default PosComanda
