import { URL_BACKEND } from "../environments/environments"


export const getCategorias = async () => {
    const peticion = await fetch(`${URL_BACKEND}/categoria`);
    const data = await peticion.json();
}