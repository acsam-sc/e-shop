import React from 'react'
import Head from './head'
import Header from './Header/header'
import CardList from './CardList/cardlist'

const Dummy = () => {
  return (
    <div className="flex flex-col min-h-screen w-auto">
      <Head title="Hello" />
      <Header />
      <CardList />
      {/* <Footer /> */}
    </div>
  )
}

Dummy.propTypes = {}

export default React.memo(Dummy)
