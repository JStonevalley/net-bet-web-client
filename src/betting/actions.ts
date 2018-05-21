import {Dispatch} from 'redux'
import {State} from '..'
import {firestore} from 'firebase'
import {Map} from 'immutable'
import {Bet} from './types'

export const BETS_LOADED = 'BETS_LOADED'

export interface BetsLoaded {
  readonly type: typeof BETS_LOADED
  readonly bets: Map<string, Bet>
}

export const loadBets = () => {
  return async (dispatch: Dispatch<BetsLoaded>, getState: () => State) => {
    const bets = await firestore().collection('bet')
      .where('userId', '==', getState().user.user.uid)
      .get()
    dispatch({
      type: BETS_LOADED,
      bets: bets.docs
        .map((queryDoc) => new Bet(queryDoc))
        .reduce(
          (map, bet) => map.set(bet.id, bet),
          Map<string, Bet>()
        )
    })
  }
}
