import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import AuthRouter from './modules/auth/AuthRouter'
import AuthLoginScreen from './modules/auth/screens/login/AuthLoginScreen'
import AuthRegisterScreen from './modules/auth/screens/register/AuthRegisterScreen'
import PosRouter from './modules/pos/PosRouter'


const App = () => {


  return (
    <BrowserRouter>
    
      <Switch>
        
        <Route path="/pos" component={PosRouter} />
        <Route path="/login" component={AuthLoginScreen}/>
        <Route path="/register" component={AuthRegisterScreen} />


      </Switch>

    </BrowserRouter>
  )
}

export default App
