/* global fetch */

const BASE_URL = 'http://api.football-data.org/v1'

export const getFixturesUrl = (leagueId) => `${BASE_URL}/competitions/${leagueId}/fixtures`

export const getTeamsUrl = (leagueId) => `${BASE_URL}/competitions/${leagueId}/teams`

const responseStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    throw new Error(response.statusText)
  }
}

export const makeRequest = async (url, minified = true) => {
  const additionalHeaders = minified ? {'X-Response-Control': 'minified'} : {}
  const response = await fetch(
    url,
    {
      headers: {
        'X-Auth-Token': '01a0fa59485148009d9a80652428a1dc',
        ...additionalHeaders
      }
    }
  )
  return responseStatus(response).json()
}