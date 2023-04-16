import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Card from './card'
import Paginator from '../Paginator/paginator'
import { getProductsList } from '../../redux/reducers/shopping'

const CardList = () => {
  const { itemsInCart, productList } = useSelector((state) => state.shoppingReducer)

  const { currency, currencyCoefficient, sortedBy, page, count } = useSelector(
    (state) => state.shoppingReducer
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductsList(`sortby=${sortedBy}&page=${page}&count=${count}`))
  }, [dispatch, sortedBy, page, count])

  return (
    <div className="flex flex-col flex-grow w-full items-center">
      <div className="flex md:text-2xl font-bold w-full justify-center p-4">Our Products</div>
      <Paginator />
      <div className="flex flex-wrap justify-center">
        {productList.map((it) => {
          let amount = 0
          const itemArr = itemsInCart.filter((item) => item.id === it.id)
          if (itemArr.length > 0) {
            amount = itemArr[0].amount
          }
          return (
            <Card
              key={it.id}
              it={it}
              amount={amount}
              currency={currency}
              currencyCoefficient={currencyCoefficient}
            />
          )
        })}
      </div>
      <Paginator />
    </div>
  )
}

export default React.memo(CardList)
