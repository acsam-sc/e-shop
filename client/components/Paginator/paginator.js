import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { setPage } from '../../redux/reducers/shopping'

const Paginator = () => {
  const dispatch = useDispatch()

  const { page, count, totalCount } = useSelector((state) => state.shoppingReducer)

  const pagesArray = new Array(Math.ceil(totalCount / count)).fill(null).map((it, index) => {
    return { index, pageNumber: index + 1 }
  })

  return (
    <div className="flex w-full h-10 justify-center">
      <div>
        {pagesArray.map((it) => {
          return (
            <button
              type="button"
              key={it.index}
              className={classnames('px-2', {
                'font-bold': it.pageNumber === page
              })}
              onClick={() => dispatch(setPage(it.pageNumber))}
            >
              {it.pageNumber}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default Paginator
