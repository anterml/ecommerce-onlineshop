import React, { PureComponent, Fragment } from "react"

export default (Tabs, getTabIndex, setTabIndex) =>
  class TabControl extends PureComponent {
    state = {
      i: getTabIndex(this.props.values) || 0,
    }

    render() {
      const { i } = this.state
      const { children, values } = this.props

      return (
        <Fragment>
          <Tabs
            selected={i}
            change={this.change}
            values={values}
          />
          {children[i]}
        </Fragment>
      )
    }

    change = e => {
      const i = parseInt(e.target.dataset.i)
      if (!Number.isNaN(i) || this.props.children[i]) {
        this.setState({ i })
        if (typeof setTabIndex === "function") setTabIndex(i)
      }
    }
  }
