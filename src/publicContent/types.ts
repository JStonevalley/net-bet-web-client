interface Link {
  readonly href: string
}

interface Links {
  readonly self: Link,
  readonly competition: Link,
  readonly homeTeam: Link,
  readonly awayTeam: Link
}

interface Score {
  readonly goalsHomeTeam: number | null
  readonly goalsAwayTeam: number | null
}

interface Result extends Score {
  readonly halfTime?: Score
}
interface Odds {
  readonly homeWin: number,
  readonly draw: number,
  readonly awayWin: number
}

export interface Game {
  readonly _links: Links,
  readonly date: string,
  readonly status: string,
  readonly matchday: number,
  readonly homeTeamName: string,
  readonly awayTeamName: string,
  readonly result: Result,
  readonly odds: Odds | null
}