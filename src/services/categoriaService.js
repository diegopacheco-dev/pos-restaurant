import { db } from "./firebaseConfig";



export const getCategorias = async () => {
    // nos conectamos a firestore con un get
    
    // 1era Forma 
    // db.collection('categorias').get().then((snapshot) => {
    //     // accedemos a los documentos con el método docs
    //     // mapeamos el arreglo de documentos
    //     const data = snapshot.docs.map(doc => ({
    //         // armamos un objeto con el id y el resto de campos (usando el método .data())
    //         id: doc.id,
    //         ...doc.data(),
    //     }))
    //     return data;
    // })

    const peticion = await db.collection('categorias').get();

    if (!peticion.docs){
        alert("Error al consultar categorias")
        return;
    }

    const data = peticion.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    console.log('categorias');
    console.log(data);
    return data


}


export const getPlatosByCategoria = async (idCategoria) => {
    const peticion = await db.collection('platos').where("categoria_id", '==', idCategoria).get();
    if(!peticion.docs) {
        alert("Error al traer los platos por categoria");
        return;
    }
    const data = peticion.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))

    return data;
}

