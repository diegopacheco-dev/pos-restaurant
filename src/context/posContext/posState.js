import React, { useReducer, useState } from 'react'
import PosContext from './posContext'
import PosReducer from './posReducer'

const PosState = ({ children }) => {


    const [state, dispatch ] = useReducer(PosReducer, {
        categoria_global: null,
        mesa_global_id: null,
    })
    
    // Funcion que va a intentar el estado global de la categoria
    const seleccionarCategoriaGlobal = objCategoria => {
        // Intentar seleccionar o settear una categoria global.
        console.log(objCategoria);
        dispatch({
            data: objCategoria,
            type: "SELECCIONAR_CATEGORIA"
        })
    }


    return (
        <PosContext.Provider value={{
            seleccionarCategoriaGlobal,
            
        }}>
            { children }
        </PosContext.Provider>
    )
}

export default PosState
