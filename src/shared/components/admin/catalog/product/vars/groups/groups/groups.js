import React from "react"
import styled from "styled-components"
import Group from "./group"
import Autocomplete from "globalComponents/admin/autocomplete/multiSelect"
import Settings from "./settings/settings"

const Groups = ({
  groupNames,
  groups,
  add,
  select,
  actions,
  selectedGroup,
}) => (
  <Block>
    <Controls>
      <CreateSelect>
        <Autocomplete
          values={groupNames}
          onChange={add}
          placeholder="Создать группу"
        />
      </CreateSelect>
      {selectedGroup._id && (
        <Settings
          group={selectedGroup}
          groupNames={groupNames}
          actions={actions}
        />
      )}
    </Controls>
    {selectedGroup._id && (
      <GroupList>
        {groups.map(group => (
          <Group
            group={group}
            groupNames={groupNames}
            selected={selectedGroup._id === group._id}
            actions={actions}
            select={select}
            key={group._id}
          />
        ))}
      </GroupList>
    )}
  </Block>
)

export default Groups

const Block = styled.div`
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`

const Controls = styled.div`
  display: flex;
  margin: 10px 0;
`

const CreateSelect = styled.div`
  width: 0;
  flex: 1 1 250px;
`

const GroupList = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5px 10px;
  background-color: #ddd;
  white-space: nowrap;
`
