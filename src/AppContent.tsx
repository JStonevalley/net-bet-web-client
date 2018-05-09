import * as React from 'react'
import {Route} from 'react-router-dom'
import {Signin} from './user/components'
import {Content} from './publicContent/components/Content'

export default () => {
  return (
    <div>
      <Signin />
      <Route path='/' component={Content} />
    </div>
  )
}
