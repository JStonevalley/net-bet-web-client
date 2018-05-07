import * as React from 'react'
import Button from 'material-ui/Button'
import {withStyles} from 'material-ui/styles'

interface SelectionProps {
  onChange: (selection: string) => void
  value: '1' | 'x' | '2' | undefined
  style?: object
}

const decorate = withStyles(({palette}) => ({
  selectedStyle: {
    backgroundColor: palette.primary.main,
    color: 'white'
  }
}))

export const Selection1x2 = decorate<SelectionProps>(({onChange, value, style, classes}) => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-between', ...style}}>
      <Button className={value === '1' ? classes.selectedStyle : undefined} onClick={() => onChange('1')}>1</Button>
      <Button className={value === 'x' ? classes.selectedStyle : undefined} onClick={() => onChange('x')}>X</Button>
      <Button className={value === '2' ? classes.selectedStyle : undefined} onClick={() => onChange('2')}>2</Button>
    </div>
  )
})