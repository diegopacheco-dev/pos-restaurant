const PosReducer = (stateActual, action) => {
  if (action.type === "SELECCIONAR_CATEGORIA") {
    return {
      ...stateActual,
      categoria_global: action.data,
    };
  }
  return { ...stateActual }
};


export default PosReducer;
