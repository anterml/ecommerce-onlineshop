import React from "react"
import styled from "styled-components"

import StatusSelect from "./statusSelect"
import LastStatusUpdated from "./lastStatusUpdated"
import Recipient from "./recipient"
import Products from "./products/products"
import Comment from "./comment"
import AdminComments from "./adminComments/adminComments"
import History from "./history"
import Payment from "./payment"

const Order = ({ order, remove, changeStatus, addComment }) => {
  const {
    _id,
    recipient,
    items,
    delivery,
    totalPrice,
    status,
    changingHistory,
    lastStatus,
    comment,
    adminComments,
    payment,
    kassa,
  } = order

  return (
    <Block>
      <Controls>
        <Status>
          <StatusSelect
            value={status}
            change={changeStatus}
          />
          {lastStatus && <LastStatusUpdated value={lastStatus} />}
        </Status>
        <RemoveButton onClick={remove}>Удалить</RemoveButton>
      </Controls>
      {recipient && <Recipient recipient={recipient} />}
      <Products {...{ items, delivery, totalPrice }} />
      {payment && (
        <Payment
          payment={payment}
          orderId={_id}
          kassa={kassa}
        />
      )}
      {comment && <Comment text={comment} />}
      <AdminComments
        comments={adminComments}
        add={addComment}
      />
      {!!changingHistory.length && <History values={changingHistory} />}
    </Block>
  )
}

export default Order

const Block = styled.div`
  flex: 1 1 auto;
  overflow-y: scroll;
  padding: 15px 20px;
  padding-bottom: 300px;
`

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 30px;
`

const Status = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const RemoveButton = styled.button`
  padding: 8px 14px;
  margin-left: 10px;
`
