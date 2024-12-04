import React, { Component } from "react"

const DND = C =>
  class DragAndDrop extends Component {
    state = {
      endValue: null,
      startValue: null,
    }

    render() {
      const { endValue } = this.state

      const drag = {
        start: this.dragStart,
        over: this.dragOver,
        end: this.dragEnd,
        value: endValue,
      }

      return (
        <C
          {...this.props}
          drag={drag}
        />
      )
    }

    dragStart = e => {
      const { value } = e.currentTarget.dataset
      if (value && value !== "last")
        this.setState(() => ({ startValue: value }))
    }

    dragEnd = e => {
      const { startValue, endValue } = this.state

      if (startValue && endValue && startValue !== endValue) {
        this.props.swap(startValue, endValue)
      }

      this.setState(() => ({
        endValue: null,
        startValue: null,
      }))
    }

    dragOver = e => {
      const { value } = e.currentTarget.dataset

      if (!value) return

      const { endValue, startValue } = this.state

      // dragOver реагирует также если мы перетащили элемент за пределы текущей группы,
      // но у тех групп не установелен startValue, т.к. он срабатывает только от dragStart
      // поэтому игнорируем
      if (!startValue) return

      if (value && value !== endValue) this.setState({ endValue: value })
    }
  }

export default DND
