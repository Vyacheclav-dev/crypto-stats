import React, { FC, useEffect, useRef, useState } from 'react'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

export type Candlestick = [number, number, number, number, number, number]
export type Candlesticks = Candlestick[]

interface CharItem {
  day: string
  sum: number
}

export interface Props {
  candlesticks: Candlesticks,
  candle: string | number
}

const CandlesticksChart: FC<Props> = ({ candlesticks, candle }: Props) => {
  const [options, setOptions] = useState<any>({})
  const needUpdate = useRef<boolean>(true)

  const updateChart = (candlesticks: Candlestick[] = []) => {
    const chartData: CharItem[] = []
    let afterDate = new Date().toLocaleDateString().split('.')

    candlesticks.map((candlestick: Candlestick, idx: number) => {
      chartData.push({
        day: new Date(+afterDate[2], +afterDate[1] - 1, +afterDate[0] - idx).toLocaleDateString(),
        sum: candlestick[candle]
      })
    })

    const opts: any = {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      accessibility: {
        announceNewData: {
          enabled: false
        }
      },
      xAxis: {
        type: 'category'
      },
      yAxis: {
        title: {
          text: 'Candle amount',
          format:  'point.y $'
        }
      } as any,
      legend: {
        enabled: false
      },
      tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b> of total<br/>'
      },
      series: [
        {
          name: 'Dates',
          data: chartData
            ?.reverse()
            ?.map((item: CharItem) => {
              return {
                name: item.day,
                y: item.sum
              }
            })
        }
      ] as any,
      plotOptions: {
        series: {
          color: 'rgb(44, 175, 254)',
          borderWidth: 0,
          dataLabels: {
            enabled: true,
            format: '{point.y}$'
          }
        }
      }
    }

    setOptions({ ...opts })
  }

  useEffect(() => {
    candlesticks && candlesticks?.length > 0 && updateChart(candlesticks)
  }, [candlesticks, candle])

  useEffect(() => {
    const checkWidth = () => {
      if (needUpdate.current && window.innerWidth < 650) {
        needUpdate.current = false
        setOptions(prev => ({
            ...prev,
            plotOptions: { series: { dataLabels: { enabled: false } } }
          })
        )
      }

      if (!needUpdate.current && window.innerWidth > 650) {
        needUpdate.current = true
        setOptions(prev => ({
            ...prev,
            plotOptions: { series: { dataLabels: { enabled: true } } }
          })
        )
      }
    }

    window.addEventListener('resize', checkWidth)

    return () => window.removeEventListener('resize', checkWidth)
  }, [])


  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      containerProps={{ style: { width: '90%', maxWidth: 700 } }}
    />
  )
}

export default CandlesticksChart