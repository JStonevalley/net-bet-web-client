import * as React from 'react'

export const componentDidMount = (inputFunction) =>
  (WrappedComponent) => {
    return class extends React.Component {
      componentDidMount () {
        inputFunction(this.props)
      }

      render () {
        return <WrappedComponent {...this.props} />
      }
    }
  }
