import React from "react"
import styled from "styled-components"

import TabsHoc from "globalComponents/admin/tabs/hoc"
import TabItems from "globalComponents/admin/tabs/items"

const tabs = {
  groups: "Поля",
  configs: "Конфигурации",
  settings: "Настройки",
}

const TabsBlock = TabsHoc(TabItems)

const Tabs = props => (
  <Block>
    <TabsBlock
      {...props}
      tabs={tabs}
    />
  </Block>
)

export default Tabs

const Block = styled.div`
  margin-top: -10px;
  margin-bottom: 20px;
`
