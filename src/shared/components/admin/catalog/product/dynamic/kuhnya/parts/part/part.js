import React, { Fragment } from "react"
import Tabs, { TAB_VALUES, TAB_CLONE_VALUES } from "../tabs/tabs"
import styled from "styled-components"
import Base from "./base/base"
import Images from "./images/images"
import Properties from "./properties/properties"
import Groups from "./groups/groups"

const Part = ({ actions, productImageFolder, productGroups, part }) =>
  part.clone && part.clone.urlName ? (
    <Fragment>
      <Text>
        Это модуль-клон. Вы можете изменять только "цену" или "в комплекте"
      </Text>
      <CloneLink
        href={`/admin/catalog=kuhnya/product=${part.clone.urlName}?partId=${part.clone.id}&pt=parts`}
        target="_blank"
      >
        Оригинальный модуль
      </CloneLink>
      <Tabs values={TAB_CLONE_VALUES}>
        <Base
          part={part}
          actions={actions}
        />
        <Properties {...{ part, actions, productGroups }} />
      </Tabs>
    </Fragment>
  ) : (
    <Tabs values={TAB_VALUES}>
      <Base
        part={part}
        actions={actions}
      />
      <Images {...{ part, actions, productImageFolder }} />
      <Properties {...{ part, actions, productGroups }} />
      <Groups {...{ part, actions, productGroups }} />
    </Tabs>
  )

export default Part

const CloneLink = styled.a`
  display: inline-block;
  margin: 10px 0 30px 5px;
  color: #007dd0;
  &:hover {
    color: #115892;
  }
`

const Text = styled.span`
  color: #b30202;
  margin-right: 4px;
`
