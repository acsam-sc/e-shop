import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Head from './head'
import Header from './Header/header'
import CardList from './CardList/cardlist'
import { getProductsList } from '../redux/reducers/shopping'

const App = () => {
  const dispatch = useDispatch()

  const productsArray = useSelector((state) => state.shoppingReducer.productList)
  const currency = useSelector((state) => state.shoppingReducer.currency)
  const itemsInCartArray = useSelector((state) => state.shoppingReducer.itemsInCart)

  useEffect(() => {
    dispatch(getProductsList())
  }, [dispatch])

  return (
    <div className="flex flex-col min-h-screen w-auto">
      <Head title="Hello" />
      <Header />
      <CardList
        productsArray={productsArray}
        currency={currency}
        itemsInCartArray={itemsInCartArray}
      />
      {/* <Footer /> */}
    </div>
  )
}

App.propTypes = {}

export default React.memo(App)
