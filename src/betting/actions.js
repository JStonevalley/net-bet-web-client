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
        .map((queryDoc) => Bet.fromQueryDoc(queryDoc))
        .reduce(
          (map, bet) => map.set(bet.id, bet),
          Map()
        )
    })
  }
}

export const placeBet = (bet) => {
  return async (dispatch) => {
    console.log('Calling placeBet', bet)
    bet = await functions().httpsCallable('placeBet')(bet.toJSON())
    console.log(bet)
  }
}

export const AVAILABLE_CREDITS_LOADED = 'AVAILABLE_CREDITS_LOADED'

export const getAvailableCredits = () => {
  return async (dispatch, getState) => {
    const credits = await functions().httpsCallable('availableCredits')
    dispatch({
      type: AVAILABLE_CREDITS_LOADED,
      credits
    })
  }
}
