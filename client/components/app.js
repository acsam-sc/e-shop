import React from 'react'
import { Route } from 'react-router-dom'
import Head from './head'
import Header from './Header/header'
import CardList from './CardList/cardlist'
import Basket from './Basket/basket'
import Footer from './Footer/footer'
import Logs from './Logs/logs'

const App = () => {
  return (
    <div className="flex flex-col min-h-screen w-auto items-center">
      <Head title="Hello" />
      <Header />
      <Route exact path="/" component={() => <CardList />} />
      <Route exact path="/basket" component={() => <Basket />} />
      <Route exact path="/basket" component={() => <Footer />} />
      <Route exact path="/logs" component={() => <Logs />} />
    </div>
  )
}

App.propTypes = {}

export default React.memo(App)
