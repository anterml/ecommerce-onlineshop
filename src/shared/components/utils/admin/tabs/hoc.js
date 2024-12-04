import React, { PureComponent } from "react"
import qs from "query-string"

export default WC =>
  class TabsHOC extends PureComponent {
    render() {
      const { query, tabs, queryTab } = this.props
      const selectedTab = query[queryTab] || Object.keys(tabs)[0] || ""
      const { select } = this

      return <WC {...{ tabs, selectedTab, select }} />
    }

    select = e => {
      const { tab } = e.target.dataset
      const { location, history, query, queryTab } = this.props
      if (query[queryTab] !== tab) {
        history.replace({
          pathname: location.pathname,
          search: qs.stringify({ ...query, [queryTab]: tab }),
        })
      }
    }
  }
