import { reqProducts, reqCurrencyCoefficient, postLog } from '../../api/api'

const ADD_ITEM_TO_CART = 'e-shop/ADD_ITEM_TO_CART'
const REMOVE_ITEM_FROM_CART = 'e-shop/REMOVE_ITEM_FROM_CART'
const DECREASE_ITEM_QUANTITY = 'e-shop/DECREASE_ITEM_QUANTITY'
const SET_FETCHING_STATUS = 'e-shop/SET_FETCHING_STATUS'
const SET_ERROR = 'e-shop/SET_ERROR'
const SET_PRODUCT_LIST = 'e-shop/SET_PRODUCT_LIST'
const SET_CURRENCY = 'e-shop/SET_CURRENCY'
const SET_SUMMARY_ITEMS = 'e-shop/SET_SUMMARY_ITEMS'
const SET_CURRENCY_COEFFICIENT = 'e-shop/SET_CURRENCY_COEFFICIENT'
const SET_SORTING = 'e-shop/SET_SORTING'
const SET_PAGE = 'e-shop/SET_PAGE'
const SET_COUNT = 'e-shop/SET_COUNT'
const SET_TOTAL_COUNT = 'e-shop/SET_TOTAL_COUNT'

const initialState = {
  isFetching: false,
  currency: 'EUR',
  error: null,
  productList: [],
  itemsInCart: [],
  cartItemsSummary: 0,
  currencyCoefficient: 1,
  sortedBy: null,
  page: 1,
  count: 20,
  totalCount: 20
}

const setProductList = (productList) => ({ type: SET_PRODUCT_LIST, payload: productList })
const setFetchingStatus = (status) => ({ type: SET_FETCHING_STATUS, payload: status })
const setError = (error) => ({ type: SET_ERROR, payload: error })
const setSummaryItems = () => ({ type: SET_SUMMARY_ITEMS })
const setSortingAC = (sortedBy) => ({ type: SET_SORTING, payload: sortedBy })
export const setPage = (page) => ({ type: SET_PAGE, payload: page })
const setCurrencyCoefficient = (coefficient) => ({
  type: SET_CURRENCY_COEFFICIENT,
  payload: coefficient
})

const addItemToCartAC = (item, amount) => ({
  type: ADD_ITEM_TO_CART,
  payload: { item, amount }
})

const decreaseItemQuantityAC = (item, amount) => ({
  type: DECREASE_ITEM_QUANTITY,
  payload: { item, amount }
})

const removeItemFromCartAC = (itemId) => ({
  type: REMOVE_ITEM_FROM_CART,
  payload: itemId
})

const setTotalCount = (totalCount) => ({ type: SET_TOTAL_COUNT, payload: totalCount })
const setCurrency = (currency) => ({ type: SET_CURRENCY, payload: currency })

export const setCount = (count) => ({ type: SET_COUNT, payload: count })

const shoppingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART: {
      if (state.itemsInCart.filter((it) => it.id === action.payload.item.id).length > 0) {
        return {
          ...state,
          itemsInCart: state.itemsInCart.map((item) => {
            if (item.id === action.payload.item.id)
              return { ...item, amount: action.payload.amount }
            return item
          })
        }
      }
      return {
        ...state,
        itemsInCart: state.itemsInCart.concat({
          ...action.payload.item,
          amount: action.payload.amount
        })
      }
    }
    case DECREASE_ITEM_QUANTITY: {
      return {
        ...state,
        itemsInCart: state.itemsInCart.map((item) => {
          if (item.id === action.payload.item.id) return { ...item, amount: action.payload.amount }
          return item
        })
      }
    }
    case REMOVE_ITEM_FROM_CART: {
      return {
        ...state,
        itemsInCart: state.itemsInCart.filter((item) => item.id !== action.payload)
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
    case SET_CURRENCY_COEFFICIENT: {
      return {
        ...state,
        currencyCoefficient: action.payload
      }
    }
    case SET_SORTING: {
      return {
        ...state,
        sortedBy: action.payload
      }
    }
    case SET_PAGE: {
      return {
        ...state,
        page: action.payload
      }
    }
    case SET_COUNT: {
      return {
        ...state,
        count: action.payload
      }
    }
    case SET_TOTAL_COUNT: {
      return {
        ...state,
        totalCount: action.payload
      }
    }
    case SET_SUMMARY_ITEMS: {
      return {
        ...state,
        cartItemsSummary: state.itemsInCart.reduce((acc, item) => {
          const count = acc
          return count + item.amount
        }, 0)
      }
    }
    default:
      return state
  }
}

export const getProductsList = (query) => async (dispatch) => {
  dispatch(setError(null))
  dispatch(setFetchingStatus(true))
  try {
    const productsList = await reqProducts(query)
    dispatch(setProductList(productsList.data.items))
    dispatch(setTotalCount(productsList.data.totalCount))
    dispatch(setFetchingStatus(false))
  } catch (err) {
    dispatch(setError('Error getting product list'))
    dispatch(setFetchingStatus(false))
    // eslint-disable-next-line no-console
    console.log('Error getting product list')
  }
}

export const getCurrencyCoefficient = (currency) => async (dispatch, getState) => {
  dispatch(setError(null))
  postLog(`Currency changed from ${getState().shoppingReducer.currency} to ${currency}`)
  if (currency === 'EUR') {
    dispatch(setCurrency(currency))
    dispatch(setCurrencyCoefficient(1))
  } else {
    dispatch(setFetchingStatus(true))
    try {
      const coefficient = await reqCurrencyCoefficient(currency)
      dispatch(setFetchingStatus(false))
      dispatch(setCurrency(currency))
      dispatch(setCurrencyCoefficient(coefficient.data.rates[currency]))
    } catch (err) {
      dispatch(setFetchingStatus(false))
      dispatch(setError('Error getting exchange rate'))
      // eslint-disable-next-line no-console
      console.log('Error getting exchange rate')
    }
  }
}

export const addItemToCart = (item, amount) => async (dispatch) => {
  dispatch(addItemToCartAC(item, amount))
  dispatch(setSummaryItems())
  postLog(`"${item.title}" added to cart, amount: ${amount}`)
}

export const removeItemFromCart = (item) => async (dispatch) => {
  dispatch(removeItemFromCartAC(item.id))
  dispatch(setSummaryItems())
  postLog(`"${item.title}" removed from cart`)
}

export const decreaseItemQuantity = (item, amount) => async (dispatch) => {
  if (amount >= 0) {
    dispatch(decreaseItemQuantityAC(item, amount))
    dispatch(setSummaryItems())
    postLog(`"${item.title}" amount decreased to ${amount}`)
  }
}

export const setSorting = (sortedBy) => async (dispatch) => {
  dispatch(setPage(1))
  switch (sortedBy) {
    case 'a-z':
      dispatch(setSortingAC('a-z'))
      break
    case 'z-a':
      dispatch(setSortingAC('z-a'))
      break
    case 'priceAsc':
      dispatch(setSortingAC('priceAsc'))
      break
    case 'priceDesc':
      dispatch(setSortingAC('priceDesc'))
      break
    default:
  }
}

export default shoppingReducer
