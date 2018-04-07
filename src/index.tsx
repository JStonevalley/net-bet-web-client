import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

import {Provider} from 'react-redux'
import state, {State} from './combineReducers'

const store = createStore<State>(state, applyMiddleware(thunk))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
