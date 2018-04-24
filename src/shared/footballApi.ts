/* global fetch */

const BASE_URL = 'http://api.football-data.org/v1'

export const getFixturesUrl = (leagueId: number) => `${BASE_URL}/competitions/${leagueId}/fixtures`

export const getTeamsUrl = (leagueId: number) => `${BASE_URL}/competitions/${leagueId}/teams`

const responseStatus = (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    throw new Error(response.statusText)
  }
}

export const makeRequest = async (url: string, minified = true) => {
  const additionalHeaders = minified ? {'X-Response-Control': 'minified'} : {}
  const response = await fetch(
    url,
    {
      headers: {
        'X-Auth-Token': '01a0fa59485148009d9a80652428a1dc',
        ...additionalHeaders as HeadersInit
      }
    }
  )
  return responseStatus(response).json()
}