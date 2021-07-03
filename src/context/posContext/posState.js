import React, { useReducer, useState, useEffect } from 'react'
import PosContext from './posContext'
import PosReducer from './posReducer'

const PosState = ({ children }) => {

    // verificar si el estado esta almacenado en el local storage
    let stateNull = {
        categoria_global: null,
        mesa_global: null,
        pedidos: []
    }
    let stateLocalStorage = JSON.parse(localStorage.getItem('state'));


    const [state, dispatch ] = useReducer(PosReducer, 
        stateLocalStorage ? stateLocalStorage : stateNull
    )

    




    const incrementarPlatoAPedido = objPlato => {
        
        // sacamos una copia del state 
        let { pedidos, mesa_global } = state;

        if (!state.mesa_global) return;


        // Buscamos si la mesaActual ya tiene pedidos relacionados
        let objPedidoActual = 
            pedidos.find(objPedido => objPedido.objMesa.id === mesa_global.id)

        if (objPedidoActual) {
            console.log("Ya hay pedido en la mesa");
            console.log("Cantidad plato");
            console.log(objPedidoActual.platos[0].cantidad);

            // Significa que la mesa_global actual, ya tiene pedidos relacionados a esta
            
            // Buscamos si el plato a agregar ya se encuentra en la mesa, caso contrario agregarlo al array de platos del pedido de la mesa actual
            let platoRepetido = objPedidoActual.platos.find(plato => plato.id === objPlato.id)
            

            if (platoRepetido) {
                console.log("Plato repetido");
                // Aumentamos la cantidad del plato en el pedido actual
                let platosActualizados = objPedidoActual.platos.map(plato => {
                    if (plato.id === platoRepetido.id){
                        console.log("Sumar cantidad plato repetido");
                        console.log(platoRepetido.cantidad);
                        return {
                            ...plato,
                            cantidad: platoRepetido.cantidad + 1
                        }

                    } else {
                        return plato;
                    }
                })


                let pedidoActualizado = {
                    ...objPedidoActual,
                    platos: platosActualizados,
                }

                let pedidosActualizados = pedidos.map(pedido => {
                    if (pedido.objMesa.id === pedidoActualizado.objMesa.id) {
                        return pedidoActualizado;
                    } else {
                        return pedido;
                    }
                })

                // LUEGO DE MANEJAR UN PLATO REPETIDO, ACTUALIZAR EL ESTADO
                dispatch({
                    type: "ACTUALIZAR_PEDIDOS",
                    data: pedidosActualizados
                })

            } else {

                objPedidoActual.platos.push({
                    ...objPlato,
                    cantidad: 1,
                })

                // LUEGO DE MANJEAR UN PLATO NUEVO EN UN PEDIDO EXISTENTE, ACTUALIZAR EL ESTADO
                let pedidosActualizados = pedidos.map(pedido => {
                    if (pedido.objMesa.id === objPedidoActual.objMesa.id) {
                        return objPedidoActual;
                    } else {
                        return pedido;
                    }
                })

                dispatch({
                    type: "ACTUALIZAR_PEDIDOS",
                    data: pedidosActualizados
                })
            }
    
            


        } else {
            // significa que la mesa_global actual, esta vacia, no tiene ningún pedido
            // agregamos el pedido de la mesa actual con su primer plato
            console.log("Agregando pedido nuevo");
            pedidos.push({ 
                estado: "pendiente",
                objMesa: {
                    ...mesa_global
                },
                platos: [
                    {
                        ...objPlato,
                        cantidad: 1
                    }
                ]
            });

            console.log(pedidos[0].platos[0].cantidad);

            // Entonces actualizamos el state global
            dispatch({
                type: "ACTUALIZAR_PEDIDOS",
                data: pedidos
            })

        }


       
    // 1. Si la mesas estaba vacia, y es el primer plato del pedido  
    // 2. Si la mesa tenia un pedido pero no tenía el plato actual, y vamos a
    // a crear el primer plato de este tipo

    // 3. Si la mesa tenia un pedido y tenía un plato de ese tipo en el 
    // pedido, para incrementar la cantidad de platos en ese pedido

    }

    
    const seleccionarCategoriaGlobal = objCategoria => {
        // Intentar seleccionar o settear categoria global
        
        dispatch({
            data: objCategoria,
            type: "SELECCIONAR_CATEGORIA"
        });
    
    }

    const seleccionarMesaGlobal = objMesa => {
        console.log(objMesa);
        dispatch({
            data: objMesa,
            type: "SELECCIONAR_MESA"
        })
    }


    return (
        <PosContext.Provider value={{
            seleccionarCategoriaGlobal,
            seleccionarMesaGlobal: seleccionarMesaGlobal,
            categoria_global: state.categoria_global,
            mesa_global: state.mesa_global , 
            incrementarPlatoAPedido,
            pedidos: state.pedidos
        }}>
            { children }
        </PosContext.Provider>
    )
}

export default PosState
