import * as firebase from 'firebase'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import registerServiceWorker from './registerServiceWorker'
import 'firebase/firestore'
import './index.css'
import {Provider} from 'react-redux'
import state from './combineReducers'
firebase.initializeApp({
  apiKey: 'AIzaSyC-jqrOvnbrL-sXdD7dcVo515Y9B9cUcwY',
  authDomain: 'net-bet-cloud.firebaseapp.com',
  databaseURL: 'https://net-bet-cloud.firebaseio.com',
  projectId: 'net-bet-cloud',
  storageBucket: 'net-bet-cloud.appspot.com',
  messagingSenderId: '624563572168'
})

const store = createStore(state, composeWithDevTools(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
