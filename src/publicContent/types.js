import {DateTime} from 'luxon'
import {Map} from 'immutable'

export class Game {
  constructor (fixture, homeTeam, awayTeam) {
    if (homeTeam.id !== fixture.homeTeamId) {
      throw new TypeError('Fixture home team id must match home team')
    } else if (awayTeam.id !== fixture.awayTeamId) {
      throw new TypeError('Fixture away team id must match away team')
    }
    this.id = fixture.id
    this.odds = fixture.odds
    this.date = DateTime.fromISO(fixture.date)
    this.matchday = fixture.matchday
    this.status = fixture.status
    this.homeTeam = homeTeam
    this.awayTeam = awayTeam
    this.result = {
      fullTime: Map()
        .set(this.homeTeam.id, fixture.result.goalsHomeTeam)
        .set(this.awayTeam.id, fixture.result.goalsAwayTeam),
      halfTime: fixture.result.halfTime
        ? Map()
          .set(this.homeTeam.id, fixture.result.halfTime.goalsHomeTeam)
          .set(this.awayTeam.id, fixture.result.halfTime.goalsAwayTeam)
        : undefined
    }
  }

  isPlayed () {
    return this.result.fullTime.some((goals) => goals !== null) || this.date < DateTime.local()
  }
}
