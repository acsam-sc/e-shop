import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Head from './head'
import Header from './Header/header'
import CardList from './CardList/cardlist'
import Basket from './Basket/basket'
import Footer from './Footer/footer'
import Logs from './Logs/logs'
import { getProductsList } from '../redux/reducers/shopping'

const App = () => {
  const dispatch = useDispatch()

  const productsArray = useSelector((state) => state.shoppingReducer.productList)
  const itemsInCartArray = useSelector((state) => state.shoppingReducer.itemsInCart)

  const {
    currency,
    cartItemsSummary,
    currencyCoefficient,
    sortedBy,
    page,
    count,
    totalCount
  } = useSelector((state) => state.shoppingReducer)

  useEffect(() => {
    dispatch(getProductsList(`sortby=${sortedBy}&page=${page}&count=${count}`))
  }, [dispatch, sortedBy, page, count])

  return (
    <div className="flex flex-col min-h-screen w-auto items-center">
      <Head title="Hello" />
      <Header cartItemsSummary={cartItemsSummary} sortedBy={sortedBy} currency={currency} />
      <Route
        exact
        path="/"
        component={() => (
          <CardList
            productsArray={productsArray}
            currency={currency}
            currencyCoefficient={currencyCoefficient}
            itemsInCartArray={itemsInCartArray}
            page={page}
            count={count}
            totalCount={totalCount}
          />
        )}
      />
      <Route
        exact
        path="/basket"
        component={() => (
          <Basket
            currency={currency}
            currencyCoefficient={currencyCoefficient}
            itemsInCartArray={itemsInCartArray}
            sortedBy={sortedBy}
          />
        )}
      />
      <Route
        exact
        path="/basket"
        component={() => (
          <Footer
            currency={currency}
            currencyCoefficient={currencyCoefficient}
            itemsInCartArray={itemsInCartArray}
          />
        )}
      />
      <Route exact path="/logs" component={() => <Logs />} />
    </div>
  )
}

App.propTypes = {}

export default React.memo(App)
