const path = "main/products/"

const initialState = {
  // сразу показываем загрузку, чтобы была высота контейнера и скролл не скакал
  status: "pending",
  items: {},
  blocks: [],
  // когда пользователь первый раз нажимает на слайдере стрелочку вправо
  // мы подгружаем продукты и добавляем название загруженного блока в массив
  uploadedBlocks: [],
}

export default (state = initialState, action) => {
  switch (action.type) {
    case path + "request": {
      return {
        ...state,
        status: "pending",
      }
    }

    case path + "success": {
      const { blocks, items } = action.response
      return {
        ...state,
        status: "fulfilled",
        items,
        blocks: blocks.filter(block => items[block.name]),
      }
    }

    case path + "failure": {
      return {
        ...state,
        status: "rejected",
        error: action.error.message,
      }
    }

    case path + "upload/request": {
      return {
        ...state,
        uploadedBlocks: [...state.uploadedBlocks, action.payload.blockName],
      }
    }

    case path + "upload/success": {
      const {
        payload: { blockName },
        response,
      } = action
      return {
        ...state,
        items: {
          ...state.items,
          [blockName]: state.items[blockName].concat(response),
        },
      }
    }

    case path + "upload/failure": {
      return {
        ...state,
        uploadedBlocks: state.uploadedBlocks.filter(
          name => name !== action.payload.blockName,
        ),
      }
    }

    default:
      return state
  }
}
