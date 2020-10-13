import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Landing from './pages/Landing'
import OrphanagesMap from './pages/OrphanagesMap'

function Routes () {
  return (
  // Switch: Just 1 route call in display
  // Exact: Call a exact path, just a primary home page
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Landing} />
        <Route path='/app' component={OrphanagesMap} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes
