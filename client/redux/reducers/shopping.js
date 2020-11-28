import { reqProducts, reqCurrencyCoefficient } from '../../api/api'

const ADD_ITEM_TO_CART = 'e-shop/ADD_ITEM_TO_CART'
const SET_FETCHING_STATUS = 'e-shop/SET_FETCHING_STATUS'
const SET_ERROR = 'e-shop/SET_ERROR'
const SET_PRODUCT_LIST = 'e-shop/SET_PRODUCT_LIST'
const SET_CURRENCY = 'e-shop/SET_CURRENCY'
const SET_SUMMARY_ITEMS = 'e-shop/SET_SUMMARY_ITEMS'
const SET_CURRENCY_COEFFICIENT = 'e-shop/SET_CURRENCY_COEFFICIENT'
const SET_REQUEST_URL = 'e-shop/SET_REQUEST_URL'
const SET_PRICE_SORTING = 'e-shop/SET_PRICE_SORTING'
const SET_AZ_SORTING = 'e-shop/SET_AZ_SORTING'

const initialState = {
  requestURL: 'http://127.0.0.1/api/v1/products?',
  isFetching: false,
  currency: 'EUR',
  error: null,
  productList: [],
  itemsInCart: [],
  cartItemsSummary: 0,
  currencyCoefficient: 1,
  isSortedPriceAsc: false,
  isSortedAZ: false
}

const setProductList = (productList) => ({ type: SET_PRODUCT_LIST, payload: productList })
const setFetchingStatus = (status) => ({ type: SET_FETCHING_STATUS, payload: status })
const setError = (error) => ({ type: SET_ERROR, payload: error })
const setSummaryItems = () => ({ type: SET_SUMMARY_ITEMS })
const setPriceSortingAC = (isSortedPriceAsc) => ({
  type: SET_PRICE_SORTING,
  payload: isSortedPriceAsc
})
const setAZSortingAC = (isSortedAZ) => ({ type: SET_AZ_SORTING, payload: isSortedAZ })
const setCurrencyCoefficient = (coefficient) => ({
  type: SET_CURRENCY_COEFFICIENT,
  payload: coefficient
})
const setRequestUrlAC = (requestURL) => ({ type: SET_REQUEST_URL, payload: requestURL })

const addItemToCartAC = (itemId, amount) => ({
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
    case SET_REQUEST_URL: {
      return {
        ...state,
        requestURL: action.payload
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
    case SET_PRICE_SORTING: {
      return {
        ...state,
        isSortedPriceAsc: action.payload
      }
    }
    case SET_AZ_SORTING: {
      return {
        ...state,
        isSortedAZ: action.payload
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
  dispatch(setFetchingStatus(true))
  try {
    const productsList = await reqProducts(query)
    dispatch(setFetchingStatus(false))
    dispatch(setProductList(productsList.data))
  } catch (err) {
    dispatch(setFetchingStatus(false))
    dispatch(setError('Error getting product list'))
    // eslint-disable-next-line no-console
    console.log('Error getting product list')
  }
}

export const setRequestUrl = (requestURL) => async (dispatch) => {
  dispatch(setRequestUrlAC(requestURL))
  dispatch(getProductsList(`${requestURL}/api/v1/products`))
}

export const getCurrencyCoefficient = (requestURL, currency) => async (dispatch) => {
  if (currency === 'EUR') {
    dispatch(setCurrency(currency))
    dispatch(setCurrencyCoefficient(1))
  } else {
    dispatch(setFetchingStatus(true))
    try {
      const coefficient = await reqCurrencyCoefficient(requestURL, currency)
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

export const addItemToCart = (itemId, amount) => async (dispatch) => {
  dispatch(addItemToCartAC(itemId, amount))
  dispatch(setSummaryItems())
}

export const getSortedListAZ = (requestURL) =>
  getProductsList(`${requestURL}/api/v1/products?sortby=a-z`)

export const getSortedListPriceAsc = (requestURL) =>
  getProductsList(`${requestURL}/api/v1/products?sortby=priceAsc`)

export const getSortedListZA = (requestURL) =>
  getProductsList(`${requestURL}/api/v1/products?sortby=z-a`)

export const getSortedListPriceDesc = (requestURL) =>
  getProductsList(`${requestURL}/api/v1/products?sortby=priceDesc`)

export const setPriceSorting = (requestURL, isSortedPriceAsc) => async (dispatch) => {
  if (isSortedPriceAsc) {
    dispatch(setPriceSortingAC(false))
    dispatch(getSortedListPriceAsc(requestURL))
  } else {
    dispatch(setPriceSortingAC(true))
    dispatch(getSortedListPriceDesc(requestURL))
  }
}

export const setAZSorting = (requestURL, isSortedAZ) => async (dispatch) => {
  if (isSortedAZ) {
    dispatch(getSortedListZA(requestURL))
    dispatch(setAZSortingAC(false))
  } else {
    dispatch(getSortedListAZ(requestURL))
    dispatch(setAZSortingAC(true))
  }
}

export default shoppingReducer
