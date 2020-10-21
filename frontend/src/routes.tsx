import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/LandingPage'
import Orphanage from './pages/Orphanage'
import createOrphanage from './pages/CreateOrphanage'
import OrphanagesMap from './pages/OrphanagesMap'

import Login from './pages/Login'
import Register from './pages/Register'

function Routes () {
  return (
  // Switch: Just 1 route call in display
  // Exact: Call a exact path, just a primary home page
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/app' component={OrphanagesMap} />
        <Route path='/orphanages/create' component={createOrphanage} />
        <Route path='/orphanages/:id' component={Orphanage} />

        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
