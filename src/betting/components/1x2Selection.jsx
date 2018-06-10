import * as React from 'react'
import Button from '@material-ui/core/Button'
import {withStyles} from '@material-ui/core/styles'

const selectedDecoration = withStyles(({palette}) => ({
  root: {
    backgroundColor: palette.primary.main,
    color: 'white',
    '&:hover': {
      backgroundColor: palette.primary.main
    }
  },
  label: {
    fontSize: '0.7em'
  }
}))

const unSelectedDecoration = withStyles(() => ({
  label: {
    fontSize: '0.7em'
  }
}))

const SelectedButton = selectedDecoration(Button)
const UnSelectedButton = unSelectedDecoration(Button)

export const Selection1x2 = ({onChange, value, style, game}) => {
  const HomeTeamButton = value === game.homeTeam.id ? SelectedButton : UnSelectedButton
  const TieButton = value === null ? SelectedButton : UnSelectedButton
  const AwayTeamButtom = value === game.awayTeam.id ? SelectedButton : UnSelectedButton
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', ...style}}>
      <HomeTeamButton onClick={() => onChange(game.homeTeam.id)}>{game.homeTeam.shortName}</HomeTeamButton>
      <TieButton onClick={() => onChange(null)}>X</TieButton>
      <AwayTeamButtom onClick={() => onChange(game.awayTeam.id)}>{game.awayTeam.shortName}</AwayTeamButtom>
    </div>
  )
}
