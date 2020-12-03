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

  const showArray = () => {
    const PageNumber = (props) => {
      return (
        <button
          type="button"
          className={classnames('px-2', {
            'font-bold': props.pageNumber === page
          })}
          onClick={() => dispatch(setPage(props.pageNumber))}
        >
          {props.pageNumber}
        </button>
      )
    }

    if (pagesArray.length <= 10) {
      return pagesArray.map((it) => <PageNumber key={it.index} pageNumber={it.pageNumber} />)
    }
    return pagesArray.reduce((acc, it) => {
      if (it.index === 0)
        return acc.concat(<PageNumber key={it.index} pageNumber={it.pageNumber} />)
      if (page <= 5 && it.index > 0 && it.index <= 4)
        return acc.concat(<PageNumber key={it.index} pageNumber={it.pageNumber} />)
      if (page > 5 && it.index === page - 3) return acc.concat(<span key={it.index}>...</span>)
      if (it.index === page - 2)
        return acc.concat(<PageNumber key={it.index} pageNumber={it.pageNumber} />)
      if (it.index === page - 1)
        return acc.concat(<PageNumber key={it.index} pageNumber={it.pageNumber} />)
      if (it.index === page)
        return acc.concat(<PageNumber key={it.index} pageNumber={it.pageNumber} />)
      if (page <= 5 && it.index === pagesArray.length - 2)
        return acc.concat(<span key={it.index}>...</span>)
      if (page > 5 && page < pagesArray.length - 2 && it.index === page + 1)
        return acc.concat(<span key={it.index}>...</span>)
      if (it.index === pagesArray.length - 1)
        return acc.concat(<PageNumber key={it.index} pageNumber={it.pageNumber} />)
      return acc
    }, [])
  }

  return (
    <div className="flex w-full h-10 justify-center text-xs md:text-base">
      <div>{showArray()}</div>
    </div>
  )
}

export default Paginator
