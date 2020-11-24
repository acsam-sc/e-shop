import React from 'react'
// import data from '../../../server/goods_small.json'
import Card from './card'

const CardList = (props) => {
  return (
    <div className="flex flex-grow flex-wrap w-full justify-center">
      <div className="flex md:text-2xl font-bold w-full justify-center p-4">Our Products</div>
      {props.productsArray.map((it) => {
        let amount = 0
        if (props.itemsInCartArray.includes(it.id)) {
          amount = props.itemsInCartArray.reduce((acc, item) => {
            const count = acc
            if (it.id === item) return count + 1
            return acc
          }, 0)
        }
        return (
          <Card
            key={it.id}
            id={it.id}
            title={it.title}
            image={it.image}
            price={it.price}
            description={it.description}
            amount={amount}
            currency={props.currency}
          />
        )
      })}
    </div>
  )
}

export default CardList
