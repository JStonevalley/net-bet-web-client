import {User} from './types'
import {Dispatch} from 'redux'

export const SIGN_UP_LOADING = 'SIGN_UP_LOADING'
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'

export interface SignUpLoading {
  type: typeof SIGN_UP_LOADING,
  user: User | null
}

export interface SignUpSuccess {
  type: typeof SIGN_UP_SUCCESS,
  user: User | null
}

export type SignUpAction = SignUpLoading | SignUpSuccess

export const signUp = (firstName: string, lastName: string) => {
  return (dispatch: Dispatch<SignUpAction>) => {
    dispatch({
      type: SIGN_UP_LOADING
    })
    dispatch({
      type: SIGN_UP_SUCCESS,
      user: {
        id: Math.round(Math.random() * 10000000000),
        firstName,
        lastName
      }
    })
  }
}