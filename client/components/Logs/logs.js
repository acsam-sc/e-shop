import React, { useState, useEffect } from 'react'
import { getLogs } from '../../api/api'

const Logs = () => {
  const [logsArray, setLogsArray] = useState([])

  useEffect(() => {
    try {
      getLogs().then((response) => setLogsArray(response.data))
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log('Error getting logs from server')
    }
  }, [])

  return (
    <div className="flex flex-col w-full">
      <span className="flex w-full justify-center md:text-2xl">Logs</span>
      {logsArray.map((logItem, index) => {
        const date = new Date(logItem.date)
        return (
          <div key={logItem.date} className="text-sm md:text-base">
            <span className="pl-2">{index + 1})</span>
            <span className="px-2">
              {`${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `}
            </span>
            <span className="px-2">{logItem.action}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Logs
