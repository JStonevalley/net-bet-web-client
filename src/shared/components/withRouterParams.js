import React, {Component} from 'react'

export const withRouterParams = (WrappedComponent) => {
  class ParamsExtracter extends Component {
    render () {
      const {params} = this.props.match
      return <WrappedComponent {...this.props} {...params} />
    }
  }
  return ParamsExtracter
}
