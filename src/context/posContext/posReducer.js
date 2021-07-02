const PosReducer = (stateActual, action) => {

  if (action.type === "SELECCIONAR_CATEGORIA"){
  
    return {
      ...stateActual,
      categoria_global: action.data
    }
  }

  if (action.type === "SELECCIONAR_MESA") {
    return {
      ...stateActual, 
      mesa_global: action.data
    }
  }

  if (action.type === "ACTUALIZAR_PEDIDOS") {
    return {
      ...stateActual,
      pedidos: action.data
    }
  }



  return { ...stateActual}
}

export default PosReducer;