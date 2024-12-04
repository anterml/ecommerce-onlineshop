import React, { PureComponent, Fragment } from "react"

export default Tabs =>
  class TabControl extends PureComponent {
    state = {
      i: 0,
    }

    render() {
      const { i } = this.state
      const { children } = this.props

      return (
        <Fragment>
          <Tabs
            selected={i}
            change={this.change}
          />
          {children[i]}
        </Fragment>
      )
    }

    change = e => {
      const i = parseInt(e.target.dataset.i)
      if (!Number.isNaN(i) || this.props.children[i]) this.setState({ i })
    }
  }
