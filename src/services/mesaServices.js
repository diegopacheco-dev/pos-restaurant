import { db } from "./firebaseConfig"



export const getMesas = async() => {
    const peticion = await db.collection('mesa').get();

    if (!peticion.docs) {
        alert("Error al consultar mesas");
        return;
    }

    const data = peticion.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }))

    return data;
}