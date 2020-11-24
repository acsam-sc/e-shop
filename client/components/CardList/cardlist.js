import React from 'react'
import data from '../../../server/goods_small.json'
import Card from './card'

const CardList = () => {
  return (
    <div className="flex flex-grow flex-wrap w-full justify-center">
      <div className="flex md:text-2xl font-bold w-full justify-center p-4">Our Products</div>
      {data.map((it) => (
        <Card
          key={it.id}
          title={it.title}
          image={it.image}
          price={it.price}
          description={it.description}
          amount={null}
          currency="USD"
        />
      ))}
    </div>
  )
}

export default CardList
