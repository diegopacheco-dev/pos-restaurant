import React from "react";
import PosHeader from "./components/PosHeader";
import PosCategorias from "./components/PosCategorias";
import PosMesas from "./components/PosMesas";
import PosPlatos from "./components/PosPlatos";
import PosComanda from "./components/PosComanda";

const PosPedidoScreen = () => {
  return (
    <>
      <PosHeader />

      <main className="pos-container">
        <PosCategorias />

        <section className="tabla">
          <PosMesas />

          <div className="pedido">
            <div className="carta">
              <h3>
                Lista de Platos Categoria: &nbsp;{" "}
                <span className="color-secundario">BEBIDAS</span>
              </h3>

              <PosPlatos />
            </div>
            <div className="boleta">
              <h3>
                Pedido Mesa: &nbsp;<span className="color-secundario">01</span>
              </h3>
              <hr />

              <PosComanda />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default PosPedidoScreen;
