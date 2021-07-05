import React, { useReducer, useState, useEffect } from "react";
import PosContext from "./posContext";
import PosReducer from "./posReducer";

const PosState = ({ children }) => {
  // verificar si el estado esta almacenado en el local storage
  let stateNull = {
    categoria_global: null,
    mesa_global: null,
    pedidos: [],
  };
  let stateLocalStorage = JSON.parse(localStorage.getItem("state"));

  const [state, dispatch] = useReducer(
    PosReducer,
    stateLocalStorage ? stateLocalStorage : stateNull
  );

  const borrarPedido = () => {
    // Sacamos una copia de pedidos y mesa_global del state
    let { pedidos, mesa_global } = state;
    // Filtramos los pedidos sin incluir el pedido actual, que ya fue pagado
    pedidos = pedidos.filter(pedido => pedido.objMesa.id !== mesa_global.id)
    dispatch({
        type: "ACTUALIZAR_PEDIDOS",
        data: pedidos
    })

  }

  const incrementarPlatoAPedido = (objPlato) => {
    // sacamos una copia del state
    let { pedidos, mesa_global } = state;

    if (!state.mesa_global) return;

    // Buscamos si la mesaActual ya tiene pedidos relacionados
    let objPedidoActual = pedidos.find(
      (objPedido) => objPedido.objMesa.id === mesa_global.id
    );

    if (objPedidoActual) {
      // Significa que la mesa_global actual, ya tiene pedidos relacionados a esta

      // Buscamos si el plato a agregar ya se encuentra en la mesa, caso contrario agregarlo al array de platos del pedido de la mesa actual
      let platoRepetido = objPedidoActual.platos.find(
        (plato) => plato.id === objPlato.id
      );

      if (platoRepetido) {
        // Si es un plato repetido
        // Actualizamos el arreglo que contiene los platos
        // let platosActualizados = objPedidoActual.platos.map(plato => {
        //     // Recorremos todos los platos, buscando el plato repetido
        //     // Una vez que encontremos el plato, actualizamos su cantidad
        //     // Para los demas platos, solo los devolvemos tal cual estan
        //     if (plato.id === platoRepetido.id){
        //         return {
        //             ...plato,
        //             cantidad: platoRepetido.cantidad + 1
        //         }

        //     } else {
        //         return plato;
        //     }
        // })

        // // Actualizamos el obj Pedido de la mesa actual
        // // con el nuevo arreglo de platos actualizados
        // let pedidoActualizado = {
        //     ...objPedidoActual,
        //     platos: platosActualizados,
        // }

        // // Ahora debemos generar un arreglo con los pedidos globales actualizados
        // // Recorremos el arreglo de pedidos globales
        // let pedidosActualizados = pedidos.map(pedido => {
        //     // Encontramos el pedido desactualizado de la mesa actual
        //     // y lo reemplazamos por el pedido actualizado de la mesa actual
        //     if (pedido.objMesa.id === pedidoActualizado.objMesa.id) {
        //         return pedidoActualizado;
        //     } else {
        //         // Los pedidos de otras mesas simplemente los retornamos
        //         return pedido;
        //     }
        // })

        // Mandamos el nuevo array con los pedidos globales actualizados al dispatch
        // para que se actualize el estado global
        platoRepetido.cantidad += 1;

        dispatch({
          type: "ACTUALIZAR_PEDIDOS",
          // data: pedidosActualizados
          data: pedidos,
        });
      } else {
        // En caso la mesa actual ya tenga pedidos y queremos agregar un plato nuevo
        // Insertamos el obj plato dentro del arreglo platos del pedido actual
        objPedidoActual.platos.push({
          ...objPlato,
          cantidad: 1,
        });

        // Generamos un nuevo arreglo con todos los pedidos de todas las mesas actualizados
        let pedidosActualizados = pedidos.map((pedido) => {
          // Encontramos el antiguo pedido de la mesa actual y lo reemplazamos por el pedido actualizado
          if (pedido.objMesa.id === objPedidoActual.objMesa.id) {
            return objPedidoActual;
          } else {
            return pedido;
          }
        });

        // Por ultimos mandamos el nuevo arreglo actualizado al dispatch para actualizar el estado global
        dispatch({
          type: "ACTUALIZAR_PEDIDOS",
          data: pedidosActualizados,
        });
      }
    } else {
      // significa que la mesa_global actual, esta vacia, no tiene ningún pedido
      // agregamos el pedido de la mesa actual con su primer plato

      pedidos.push({
        estado: "pendiente",
        objMesa: {
          ...mesa_global,
        },
        platos: [
          {
            ...objPlato,
            cantidad: 1,
          },
        ],
      });

      // Entonces actualizamos el state global
      dispatch({
        type: "ACTUALIZAR_PEDIDOS",
        data: pedidos,
      });
    }

    // 1. Si la mesas estaba vacia, y es el primer plato del pedido
    // 2. Si la mesa tenia un pedido pero no tenía el plato actual, y vamos a
    // a crear el primer plato de este tipo

    // 3. Si la mesa tenia un pedido y tenía un plato de ese tipo en el
    // pedido, para incrementar la cantidad de platos en ese pedido
  };

  const restarPlatoAPedido = (objPlato) => {
    let { pedidos, mesa_global } = state;
    if (!mesa_global) return;

    // objPedidoActual es una referencia a un pedido que esta dentro del arrary pedidos
    // pudiendo así modificar el pedido dentro del array pedidos
    let objPedidoActual = pedidos.find(
      (objPedido) => objPedido.objMesa.id === mesa_global.id
    );

    if (objPedidoActual) {
      // Ya existe un pedido en la mesa
      let platoPedido = objPedidoActual.platos.find(
        (plato) => plato.plato_id === objPlato.plato_id
      );

      if (platoPedido) {
        platoPedido.cantidad -= 1;

        if (platoPedido.cantidad === 0) {
          objPedidoActual.platos = objPedidoActual.platos.filter(
            (plato) => plato.plato_id !== objPlato.plato_id
          );
          if (objPedidoActual.platos.length === 0) {
            pedidos = pedidos.filter(
              (pedido) => objPedidoActual.objMesa.id !== mesa_global.id
            );
          }
        }

        dispatch({
          type: "ACTUALIZAR_PEDIDOS",
          data: pedidos,
        });
      }
    }
  };

  const seleccionarCategoriaGlobal = (objCategoria) => {
    // Intentar seleccionar o settear categoria global

    dispatch({
      data: objCategoria,
      type: "SELECCIONAR_CATEGORIA",
    });
  };

  const seleccionarMesaGlobal = (objMesa) => {
    dispatch({
      data: objMesa,
      type: "SELECCIONAR_MESA",
    });
  };

  return (
    <PosContext.Provider
      value={{
        seleccionarCategoriaGlobal,
        seleccionarMesaGlobal: seleccionarMesaGlobal,
        categoria_global: state.categoria_global,
        mesa_global: state.mesa_global,
        incrementarPlatoAPedido,
        pedidos: state.pedidos,
        restarPlatoAPedido,
        borrarPedido
      }}
    >
      {children}
    </PosContext.Provider>
  );
};

export default PosState;
