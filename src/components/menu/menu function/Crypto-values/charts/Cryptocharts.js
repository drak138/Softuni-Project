import Chart from 'react-apexcharts'
import style from '../Crypto.module.css'
import React,{ useEffect, useState } from 'react'
export const BitCoinChart =()=>{
    const round =(number)=>{
      return number ? +number.toFixed(2):null
    }
    const[series,setSeries]=useState([{
      name: "Price"
    }],
    [{
      data:[]
      }]
      )
    const url=`/v8/finance/chart/BTC-USD?region=US&lang=en-US&includePrePost=false&interval=60m&useYfid=true&range=8d&corsDomain=finance.yahoo.com&.tsrc=finance`
    useEffect(() => 
      {
          let timeoutId;
          async function getLatestPrice()
          {
              fetch(url)
              .then((res) =>res.json()
              )
              .then((data) => 
                {
                  const quote= data.chart.result[0].indicators.quote[0]
                  const prices=data.chart.result[0].timestamp.map((timestamp, index)=>
                (
                   {
                    x: new Date(timestamp*1000),
                    y: [ quote.open[index], quote.high[index], quote.low[index], quote.close[index]].map(round)
                   }))
                    
                   setSeries
                    ([{
                      data:prices
                    }])
                }
                )
             
           .catch((error) => {
              console.log(error);
            });
          }
          getLatestPrice();
          return()=>{
            clearTimeout(timeoutId)
          }
      }, []);
    const chart={
      series: [{
        name: "Price",
        data:[]          
      }],
      options: {
        chart: {
          type: 'line',
          height: 250
        },
        // title: {
        //     text: 'BitCoin',
        //     align: 'left'
        //   },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      }
    };
    return (
      <div style={{width:'95%',zIndex:'0'}} className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={chart.options}
              className={style.apexchartsToolbar}
              series={series}
              type="line"
              width="70%"
            />
          </div>
        </div>
        </div>
        );
    }
export const EthChart =()=>{
    const round =(number)=>{
      return number ? +number.toFixed(2):null
    }
    const[series,setSeries]=useState(
      [{
        name: "Price"
      }],
      [{
      data: []
    }])
    const url=`/v8/finance/chart/ETH-USD?region=US&lang=en-US&includePrePost=false&interval=60m&useYfid=true&range=8d&corsDomain=finance.yahoo.com&.tsrc=finance`
    useEffect(() => 
      {
          let timeoutId;
          async function getLatestPrice()
          {
              fetch(url)
              .then((res) =>res.json()
              )
              .then((data) => 
                {
                  const quote= data.chart.result[0].indicators.quote[0]
                  const prices= data.chart.result[0].timestamp.map((timestamp, index)=>
                (
                   {
                    x: new Date(timestamp*1000),
                    y: [quote.open[index], quote.high[index], quote.low[index], quote.close[index]].map(round)}))    
                setSeries([{
                      data:prices
                    }])
                   }
                )
             
           .catch((error) => {
              console.log(error);
            });
          }
          getLatestPrice();
          return()=>{
            clearTimeout(timeoutId)
          }
      }, []);
    const chart={
      options: {
        chart: {
          type: 'line',
          height: 250
        },
        // title: {
        //   text: 'Etherium',
        //   align: 'left'
        // },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      }
    };
    return (
      <div style={{width:'95%', zIndex:'0'}} className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={chart.options}
              series={series}
              type="line"
              width="70%"
            />
          </div>
        </div>
      </div>
    );
  }
  export const BNBChart =()=>{
    const round =(number)=>{
      return number ? +number.toFixed(2):null
    }
    const[series,setSeries]=useState(
      [{
        name: "Price"
      }],
      [{
      data: []
    }])
    const url=`/v8/finance/chart/BNB-USD?region=US&lang=en-US&includePrePost=false&interval=60m&useYfid=true&range=8d&corsDomain=finance.yahoo.com&.tsrc=finance`
    useEffect(() => 
      {
          let timeoutId;
          async function getLatestPrice()
          {
              fetch(url)
              .then((res) =>res.json()
              )
              .then((data) => 
                {
                  const quote= data.chart.result[0].indicators.quote[0]
                  const prices= data.chart.result[0].timestamp.map((timestamp, index)=>
                (
                   {
                    x: new Date(timestamp*1000),
                    y: [quote.open[index], quote.high[index], quote.low[index], quote.close[index]].map(round)}))
                    setSeries([{
                      data:prices
                    }])
                   }
                )
             
           .catch((error) => {
              console.log(error);
            });
          }
          getLatestPrice();
          return()=>{
            clearTimeout(timeoutId)
          }
      }, []);
    const chart={
      options: {
        chart: {
          type: 'line',
          height: 250
        },
        // title: {
        //   text: 'BNB',
        //   align: 'left'
        // },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true
          }
        }
      }
    };
    return (
      <div style={{width:'95%',zIndex:'0'}} className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={chart.options}
              series={series}
              type="line"
              width="70%"
            />
          </div>
        </div>
      </div>
    );
  }
