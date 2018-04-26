import {DateTime} from 'luxon'
import {Map} from 'immutable'

interface FixtureScore {
  readonly goalsHomeTeam: number | null
  readonly goalsAwayTeam: number | null
}

interface FixtureResult extends FixtureScore {
  readonly halfTime?: FixtureScore
}
interface Odds {
  readonly homeWin: number,
  readonly draw: number,
  readonly awayWin: number
}

export interface Fixture {
  readonly id: number,
  readonly competitionId: number,
  readonly date: string,
  readonly status: string,
  readonly matchday: number,
  readonly homeTeamName: string,
  readonly homeTeamId: number,
  readonly awayTeamName: string,
  readonly awayTeamId: number,
  readonly result: FixtureResult,
  readonly odds: Odds | null
}

export interface Team {
  readonly id: number,
  readonly name: string,
  readonly shortName: string,
  readonly crestUrl: string
}

type Score = Map<number, number | null>
interface Result {
  readonly fullTime: Score,
  readonly halfTime?: Score
}

export class Game {
  readonly id: number
  readonly homeTeam: Team
  readonly awayTeam: Team
  readonly odds: Odds | null
  readonly date: DateTime
  readonly status: string
  readonly matchday: number
  readonly result: Result

  constructor (fixture: Fixture, homeTeam: Team, awayTeam: Team) {
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
      fullTime: Map<number, number | null>()
        .set(this.homeTeam.id, fixture.result.goalsHomeTeam)
        .set(this.awayTeam.id, fixture.result.goalsAwayTeam),
      halfTime: fixture.result.halfTime
        ? Map<number, number | null>()
          .set(this.homeTeam.id, fixture.result.halfTime.goalsHomeTeam)
          .set(this.awayTeam.id, fixture.result.halfTime.goalsAwayTeam)
        : undefined
    }
  }

  isPlayed () {
    return this.result.fullTime.some((goals) => goals !== null)
  }
}
