import * as React from 'react'
import {Route, Switch} from 'react-router-dom'
import {Signin, RequireSignedIn} from './user/components'
import {PublicContent} from './publicContent/components/PublicContent'

interface Props {
}

export default ({}: Props) => {
  return (
    <div>
      <Switch>
        <Route path='/public' component={PublicContent} />
        <Route path='*' component={RequireSignedIn} />
      </Switch>
      <Signin />
    </div>
  )
}