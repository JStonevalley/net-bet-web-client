import * as React from 'react'
import Button from 'material-ui/Button'

interface SelectionProps {
  onChange: (selection: string) => void
  value: '1' | 'x' | '2' | undefined
}

export const Selection1x2 = ({onChange, value}: SelectionProps) => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
      <Button color={value === '1' ? 'primary' : 'default'} onClick={() => onChange('1')}>1</Button>
      <Button color={value === 'x' ? 'primary' : 'default'} onClick={() => onChange('x')}>X</Button>
      <Button color={value === '2' ? 'primary' : 'default'} onClick={() => onChange('2')}>2</Button>
    </div>
  )
}