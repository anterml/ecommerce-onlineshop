import React, { PureComponent } from "react"
import styled from "styled-components"

import TabsHoc from "globalComponents/admin/tabs/hoc"
import TabItems from "globalComponents/admin/tabs/items"
const Tabs = TabsHoc(TabItems)

const TABS = {
  base: "Основные",
  attrs: "Атрибуты для поиска",
  sattrs: "Атрибуты обычные",
  vars: "Вариации",
  images: "Картинки",

  //badges: "Значки",
  //parts: "Модули",
  //stuff: "Разное"
}

export default class Nav extends PureComponent {
  render() {
    const { accessList } = this.props.auth
    const tabs = { ...TABS }

    if (accessList.includes("#a-seo")) tabs.seo = "SEO"

    if (accessList.includes("tiu")) tabs.tiu = "Tiu"

    if (this.props.category === "kuhnya") tabs.parts = "Модули"

    return (
      <Block>
        <Tabs
          {...this.props}
          tabs={tabs}
          queryTab="pt"
        />
      </Block>
    )
  }
}

const Block = styled.div`
  padding-bottom: 10px;
  border-bottom: 1px solid #ddd;
`
