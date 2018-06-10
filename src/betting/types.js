export class Credit {
  constructor (amount) {
    this.amount = Math.round(amount)
  }

  add (credit) {
    return new Credit(this.amount + credit.amount)
  }

  subtract (credit) {
    return new Credit(this.amount - credit.amount)
  }

  equals (credit) {
    return (credit && credit.amount) === this.amount
  }
}

export class Bet {
  constructor (queryDoc) {
    this.id = queryDoc.id
    this.credits = queryDoc.get('credits')
    this.teamId = queryDoc.get('teamId')
    this.fixtureId = queryDoc.get('fixtureId')
    this.leagueId = queryDoc.get('leagueId')
    this.userId = queryDoc.get('userId')
  }
}
