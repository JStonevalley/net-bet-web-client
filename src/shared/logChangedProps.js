import React, {Component} from 'react'

const logChangedProps = (WrappedComponent) =>
  class extends Component {
    componentWillReceiveProps (nextProps) {
      const newPropKeys = Object.keys(nextProps)
      console.log('>>>>> LOGGING CHANGED PROPS START <<<<<')
      newPropKeys.forEach((key) => {
        if (nextProps[key] !== this.props[key]) {
          console.log(`prop ${key} changed`,
          'old', this.props[key] && this.props[key].toJS ? this.props[key].toJS() : this.props[key],
          'new', this.props[key] && nextProps[key].toJS ? nextProps[key].toJS() : nextProps[key])
        }
      })
      console.log('>>>>> LOGGING CHANGED PROPS END <<<<<')
    }

    render () {
      return <WrappedComponent {...this.props} />
    }
  }

export default logChangedProps
