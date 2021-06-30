import { store } from "./firebaseConfig";

export const getMesas = async() => {
    const peticion = await store.collection("mesa").get();

    if(!peticion.docs) {
        alert("Error al consultar mesas");
        return
    }
    
    const nuevoArray = peticion.docs.map(item => ({
        id: item.id,
        ...item.data(),
    }))

    return nuevoArray;
}

export const getCategorias = async() => {
    const peticion = await store.collection("categorias").get();

    if(!peticion.docs) {
        alert("Error al consultar categorias");
        return;
    }

    const nuevoArray = peticion.docs.map(objCategoria => ({
        id: objCategoria.id,
        ...objCategoria.data()
    }))

    return nuevoArray;
}

