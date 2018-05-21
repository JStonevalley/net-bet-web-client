import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker'
import {initializeApp as initializeFirebaseApp} from 'firebase'
import 'firebase/firestore'
import './index.css'

initializeFirebaseApp({
  apiKey: 'AIzaSyC-jqrOvnbrL-sXdD7dcVo515Y9B9cUcwY',
  authDomain: 'net-bet-cloud.firebaseapp.com',
  databaseURL: 'https://net-bet-cloud.firebaseio.com',
  projectId: 'net-bet-cloud',
  storageBucket: 'net-bet-cloud.appspot.com',
  messagingSenderId: '624563572168'
})

import {Provider} from 'react-redux'
import state, {State} from './combineReducers'

const store = createStore<State>(state, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
)
registerServiceWorker()
