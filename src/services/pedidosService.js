import { db } from '../services/firebaseConfig';





export const getPedido = async() => {
    const peticion = await db.collection('pedidos').get();
    if (!peticion.docs){ 
        console.log("Error en la peticion de pedidos");
        return; 
    }
    const data = peticion.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    console.log(data);
    return data;
}

export const postPedido = async objPedido => {
    console.log(JSON.stringify({...objPedido}));
    const peticion = await db.collection('pedidos').add(objPedido);
    return peticion;
}

// Si fuera POST 
// export const postPedido = async objPedido => {
//     const peticion = await fetch("url/pedido", {
//         method: "POST",
//         header: {
//             "Content-type": "application/json"
//         },
//         body: JSON.stringify(objPedido)
//     });
//     const data = await peticion.json();
//     return data;
// }



