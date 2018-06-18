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

export const TeamSelection = ({input: {value, onChange}, style, game}) => {
  const HomeTeamButton = value === game.homeTeam.id ? SelectedButton : UnSelectedButton
  const TieButton = value === null ? SelectedButton : UnSelectedButton
  const AwayTeamButtom = value === game.awayTeam.id ? SelectedButton : UnSelectedButton
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', ...style}}>
      <HomeTeamButton type='button' onClick={() => onChange(game.homeTeam.id)}>{game.homeTeam.shortName || game.homeTeam.name.split(' ')[0]}</HomeTeamButton>
      <TieButton type='button' onClick={() => onChange(null)}>X</TieButton>
      <AwayTeamButtom type='button' onClick={() => onChange(game.awayTeam.id)}>{game.awayTeam.shortName || game.awayTeam.name.split(' ')[0]}</AwayTeamButtom>
    </div>
  )
}
