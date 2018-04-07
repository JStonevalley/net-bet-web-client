import * as React from 'react'
import {Route} from 'react-router-dom'
import {Signin, RequireSignedIn} from './user/components'

interface Props {
}

export default ({}: Props) => {
  return (
    <div>
      <Route path='*' component={RequireSignedIn} />
      <Signin />
    </div>
  )
}