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
  constructor ({id, credits, teamId, fixtureId, leagueId, userId}) {
    if (!credits) throw new Error({credits: 'required'})
    if (!teamId) throw new Error({teamId: 'required'})
    if (!fixtureId) throw new Error({fixtureId: 'required'})
    if (!leagueId) throw new Error({leagueId: 'required'})
    this.id = id
    this.credits = credits
    this.teamId = teamId
    this.fixtureId = fixtureId
    this.leagueId = leagueId
    this.userId = userId
  }

  toJSON () {
    const attributes = {
      credits: this.credits,
      teamId: this.teamId,
      fixtureId: this.fixtureId,
      leagueId: this.leagueId
    }
    return this.id
      ? {
        id: this.id,
        userId: this.userId,
        ...attributes
      }
      : attributes
  }

  static fromQueryDoc (queryDoc) {
    return new Bet({
      id: queryDoc.id,
      credits: queryDoc.get('credits'),
      teamId: queryDoc.get('teamId'),
      fixtureId: queryDoc.get('fixtureId'),
      leagueId: queryDoc.get('leagueId'),
      userId: queryDoc.get('userId')
    })
  }
}
