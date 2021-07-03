const PosReducer = (stateActual, action) => {
  

  if (action.type === "SELECCIONAR_CATEGORIA"){
  

    localStorage.setItem('state', JSON.stringify({...stateActual, categoria_global: action.data}))
    return {
      ...stateActual,
      categoria_global: action.data
    }
  }

  if (action.type === "SELECCIONAR_MESA") {
    localStorage.setItem('state', JSON.stringify({...stateActual, mesa_global: action.data}))
    return {
      ...stateActual, 
      mesa_global: action.data
    }
  }

  if (action.type === "ACTUALIZAR_PEDIDOS") {
    localStorage.setItem('state', JSON.stringify({...stateActual, pedidos: action.data}));
    return {
      ...stateActual,
      pedidos: action.data
    }
  }





  return { ...stateActual}
}

export default PosReducer;