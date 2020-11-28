import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from './head'
import Header from './Header/header'
import CardList from './CardList/cardlist'
import { setRequestUrl } from '../redux/reducers/shopping'

const App = () => {
  const dispatch = useDispatch()

  // const serverURL = window.location.origin
  const serverURL = window.location.origin
  const productsArray = useSelector((state) => state.shoppingReducer.productList)
  const currency = useSelector((state) => state.shoppingReducer.currency)
  const itemsInCartArray = useSelector((state) => state.shoppingReducer.itemsInCart)
  const cartItemsSummary = useSelector((state) => state.shoppingReducer.cartItemsSummary)
  const currencyCoefficient = useSelector((state) => state.shoppingReducer.currencyCoefficient)
  const requestURL = useSelector((state) => state.shoppingReducer.requestURL)
  const isSortedPriceAsc = useSelector((state) => state.shoppingReducer.isSortedPriceAsc)
  const isSortedAZ = useSelector((state) => state.shoppingReducer.isSortedAZ)

  useEffect(() => {
    dispatch(setRequestUrl(serverURL))
    // dispatch(getProductsList())
  }, [dispatch, serverURL])

  return (
    <div className="flex flex-col min-h-screen w-auto">
      <Head title="Hello" />
      <Header
        cartItemsSummary={cartItemsSummary}
        requestURL={requestURL}
        isSortedPriceAsc={isSortedPriceAsc}
        isSortedAZ={isSortedAZ}
      />
      <CardList
        productsArray={productsArray}
        currency={currency}
        currencyCoefficient={currencyCoefficient}
        itemsInCartArray={itemsInCartArray}
      />
      {/* <Footer /> */}
    </div>
  )
}

App.propTypes = {}

export default React.memo(App)
