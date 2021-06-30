import React from "react";
import { Switch, Route } from "react-router-dom";
import PosState from "../../context/posContext/posState";
import PosPedidoScreen from "./screens/pedido/PosPedidoScreen";

const PosRouter = () => {
  return (
    <PosState>
      <Switch>
        <Route path="/pos/pedido" component={PosPedidoScreen} />
      </Switch>
    </PosState>
  );
};

export default PosRouter;
