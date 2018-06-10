import {firestore, functions} from 'firebase'
import {Map} from 'immutable'
import {Bet} from './types'

export const BETS_LOADED = 'BETS_LOADED'

export const loadBets = () => {
  return async (dispatch, getState) => {
    const bets = await firestore().collection('bet')
      .where('userId', '==', getState().user.user.uid)
      .get()
    dispatch({
      type: BETS_LOADED,
      bets: bets.docs
        .map((queryDoc) => new Bet(queryDoc))
        .reduce(
          (map, bet) => map.set(bet.id, bet),
          Map()
        )
    })
  }
}

export const placeBet = (bet) => {
  return async (dispatch) => {
    console.log('Calling placeBet')
    const bet = await functions().httpsCallable('placeBet')({hej: 'du'})
    console.log(bet)
  }
}
