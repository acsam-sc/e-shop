import reqProducts from '../../api/api'

const ADD_ITEM_TO_CART = 'e-shop/ADD_ITEM_TO_CART'
const SET_FETCHING_STATUS = 'e-shop/SET_FETCHING_STATUS'
const SET_ERROR = 'e-shop/SET_ERROR'
const SET_PRODUCT_LIST = 'e-shop/SET_PRODUCT_LIST'
const SET_CURRENCY = 'e-shop/SET_CURRENCY'

const initialState = {
  isFetching: false,
  currency: 'USD',
  error: null,
  productList: [],
  itemsInCart: []
}

const setProductList = (productList) => ({ type: SET_PRODUCT_LIST, payload: productList })
const setFetchingStatus = (status) => ({ type: SET_FETCHING_STATUS, payload: status })
const setError = (error) => ({ type: SET_ERROR, payload: error })

export const addItemToCart = (itemId, amount) => ({
  type: ADD_ITEM_TO_CART,
  payload: { itemId, amount }
})
export const setCurrency = (currency) => ({ type: SET_CURRENCY, payload: currency })

const shoppingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART: {
      if (state.itemsInCart.filter((it) => it.id === action.payload.itemId).length > 0) {
        return {
          ...state,
          itemsInCart: state.itemsInCart.map((item) => {
            if (item.id === action.payload.itemId) return { ...item, amount: action.payload.amount }
            return item
          })
        }
      }
      return {
        ...state,
        itemsInCart: state.itemsInCart.concat({
          id: action.payload.itemId,
          amount: action.payload.amount
        })
      }
    }
    case SET_FETCHING_STATUS: {
      return {
        ...state,
        isFetching: action.payload
      }
    }
    case SET_ERROR: {
      return {
        ...state,
        error: action.payload
      }
    }
    case SET_PRODUCT_LIST: {
      return {
        ...state,
        productList: action.payload
      }
    }
    case SET_CURRENCY: {
      return {
        ...state,
        currency: action.payload
      }
    }
    default:
      return state
  }
}

export const getProductsList = () => async (dispatch) => {
  try {
    const productsList = await reqProducts()
    dispatch(setProductList(productsList.data))
  } catch (err) {
    dispatch(setFetchingStatus(false))
    dispatch(setError('Error getting product list'))
    // eslint-disable-next-line no-console
    console.log('Error getting product list')
  }
}

export default shoppingReducer
