import React, { useContext } from "react";
import PosHeader from "./components/PosHeader";
import PosCategorias from "./components/PosCategorias";
import PosMesas from "./components/PosMesas";
import PosPlatos from "./components/PosPlatos";
import PosComanda from "./components/PosComanda";
import PosContext from "../../../../context/posContext/posContext";

const PosPedidoScreen = () => {

  const {categoria_global, mesa_global} = useContext(PosContext)

  console.log(categoria_global?.cat_nom);

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
                Lista de Platos Categoria: &nbsp;{""}
                <span className="color-secundario">{categoria_global?.cat_nom || "Seleccione la categoria"}</span>
              </h3>

              <PosPlatos />
            </div>
            <div className="boleta">
              <h3>
                Pedido Mesa: &nbsp;<span className="color-secundario">{mesa_global?.mesa_nro}</span>
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
