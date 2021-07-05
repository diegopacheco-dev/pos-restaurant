import React, { useState, useEffect } from "react";
import { getPedido } from "../../../../services/pedidosService";
import { MDBDataTableV5 } from "mdbreact";

const AdminPedidosScreen = () => {
  const [datatable, setDatatable] = useState({
    columns: [
      { label: "Id", field: "pedido_id"},

      { label: "Fecha", field: "pedido_fech"},

      { label: "Nro", field: "pedido_nro"},

      { label: "Estado", field: "pedido_est"},

      { label: "Usuario", field: "usuario_nombre"},

      { label: "Mesa", field: "numero_mesa"},

      { label: "Platos", field: "total_platos"},

      { label: "Acciones", field: "acciones"}
    ],

    rows: [
        {
            pedido_id: "1",
            pedido_fech: "2",
            pedido_nro: "3",
            pedido_est: "4",
            usuario_nombre: "5",
            numero_mesa: "6",
            total_platos: "7",
            acciones: <><button>Hola</button></>
        },

    ]
  });

  useEffect(() => {
    // Traemos los pedidos
    getPedido().then(data => {
        
        // Armamos un arreglo que tendrá las filas de las tablas con los datos de los pedidos
        const filas = data.map(pedido => ({
            pedido_id:pedido.id,
            pedido_fech: pedido.pedido_fech,
            pedido_nro:pedido.pedido_nro,
            pedido_est:pedido.pedido_est,
            usuario_nombre:pedido.Usuario?.usu_nom + pedido.Usuario?.usu_ape,
            numero_mesa: pedido.mesa?.nro,
            total_platos: pedido.pedidoPlatos.reduce((valorAnt, objActual)=> {
                return valorAnt + +objActual.pedidoPlato_cant;
            }, 0),
            acciones: <button className="btn btn-dark">Ver Pedido</button>
        }))

        // Insertamos el array con las filas armadas, dentro de la propiedad rows de la variable de estado "datatable"
        setDatatable({
            ...datatable,
            rows: filas
        })
    })

  }, [])


  return (
    <main className="container mt-5">
      <div className="row">
        <div className="col">
          <h1 className="display-4 text-center">Lista de Pedidos</h1>
          <hr />
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="card shadow">
            <div className="card-body">
              <MDBDataTableV5 data={datatable}/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AdminPedidosScreen;
