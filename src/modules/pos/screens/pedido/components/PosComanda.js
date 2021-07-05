import React, { useContext } from "react";
import PosContext from "../../../../../context/posContext/posContext";
import { postPedido } from "../../../../../services/pedidosService";
import PosComandaItem from "./PosComandaItem";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

const PosComanda = () => {
  const { pedidos, mesa_global, borrarPedido } = useContext(PosContext);
  let pedidosMesaActual = null;

  if (mesa_global) {
    pedidosMesaActual = pedidos.find(
      (pedido) =>
        pedido.objMesa.id === mesa_global.id && pedido.estado === "pendiente"
    );
  }

  const pagar = () => {
    Swal.fire({
      title: "Pagar el pedido?",
      text: "Confirme que está cancelando el total del pedido",
      icon: "warning",
      showCancelButton: true,
    }).then((rpta) => {
      if (rpta.isConfirmed) {
        // Buscamos el pedido actual de la mesa actual
        let pedidosActual = pedidos.find(
          (pedido) => pedido.objMesa.id === mesa_global.id
        );

        // Generamos un nuevo array con los platos del pedido
        let platos = pedidosActual.platos.map((plato) => {
          return {
            plato_id: plato.id,
            pedidoPlato_cant: plato.cantidad,
          };
        });

        // Armamos el objPedido que irá al backend mediante el servicio
        let objPedido = {
          pedido_fech: moment().format("YYYY-MM-DD HH:mm:ss"),
          pedido_nro: uuidv4(),
          pedido_est: "pagado",
          usu_id: 2,
          mesa: {
            id: mesa_global.id,
            nro: mesa_global.mesa_nro
          },
          pedidoPlatos: platos,
        };
        // Enviamos el objPedido armado al backend
        postPedido(objPedido).then((data) => {
          console.log("Pedido creado con exito");
          console.log(data);
          if (data.id) {
            // TO-DO: Borrar el pedido de la mesa actual
            Swal.fire({
              title: "Hecho!",
              text: "Pedido registrado en la base de datos",
              icon: "success",
              timer: 700,
              position: "top-right"
            })
            borrarPedido();
          }
        });
      }
    });
  };

  return (
    <div className="comanda">
      <h4 className="comanda__mesa">
        {mesa_global ? `Mesa ${mesa_global.mesa_nro}` : "Seleccione mesa"}
      </h4>
      <p className="comanda__usuario">Carlos Jimenez</p>
      <hr />

      {!mesa_global ? (
        <div>Seleccione una mesa</div>
      ) : pedidosMesaActual ? (
        <>
          <ul className="comanda__lista">
            {pedidosMesaActual.platos.map((plato) => {
              return <PosComandaItem plato={plato} key={plato.id} />;
            })}
          </ul>
          <button className="boton boton-success boton-block" onClick={pagar}>
            PAGAR
          </button>
        </>
      ) : (
        <div>Mesa sin pedidos</div>
      )}
    </div>
  );
};

export default PosComanda;
