/* global fetch */

const BASE_URL = 'http://api.football-data.org/v1'

export const getFixturesUrl = (leagueId: number) => `${BASE_URL}/competitions/${leagueId}/fixtures`

const responseStatus = (response: Response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    throw new Error(response.statusText)
  }
}

export const makeRequest = async (url: string) => {
  const response = await fetch(
    url,
    {
      headers: {
        'X-Auth-Token': '01a0fa59485148009d9a80652428a1dc'
      }
    }
  )
  return responseStatus(response).json()
}