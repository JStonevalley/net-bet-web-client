import {QueryDocumentSnapshot} from '@firebase/firestore-types'

export class Credit {
  readonly amount: number
  constructor (amount: number) {
    this.amount = Math.round(amount)
  }

  add (credit: Credit) {
    return new Credit(this.amount + credit.amount)
  }

  subtract (credit: Credit) {
    return new Credit(this.amount - credit.amount)
  }

  equals (credit?: Credit) {
    return (credit && credit.amount) === this.amount
  }
}

export class Bet {
  readonly id: string
  readonly credits: number
  readonly teamId: number
  readonly fixtureId: number
  readonly leagueId: number
  readonly userId: string
  constructor(queryDoc: QueryDocumentSnapshot) {
    this.id = queryDoc.id,
    this.credits = queryDoc.get('credits'),
    this.teamId = queryDoc.get('teamId'),
    this.fixtureId = queryDoc.get('fixtureId'),
    this.leagueId = queryDoc.get('leagueId'),
    this.userId = queryDoc.get('userId')
  }
}
