import React, { useState, useEffect,useRef } from "react";
import {EthChart, BitCoinChart,BNBChart } from "./charts/Cryptocharts";
import style from "./Crypto.module.css"
export const BitcoinPrice = () => {
    const [price, setPrice] = useState(null);

    const prevPrice=usePrevious(price)

    const [loading, setLoading] = useState(true);
     const url='https://price-api.crypto.com/price/v1/exchange/bitcoin'
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
                // console.log(data);
                setPrice(data.fiat.usd);
                // setSymbol(data[0].symbol);
                setLoading(false); 
                timeoutId= setTimeout(getLatestPrice, 10000);
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
    return (
            <div className={style.btc}>
              <div className={style.nameWrapper}>  
            <img src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579" alt="" />
            <p className={style.name}>
                BitCoin
            </p>
              </div>
            <section className={style.btcPriceWrapper}>
          <span className={style.btcPrice} style={{color:price < prevPrice ? 'red':'#18B000',
          transition: "all .5s ease",
          WebkitTransition: "all 1.5s ease",
          MozTransition: "all 1.5s ease"}}>
            {loading ? "LOADING" : "$" + price.toFixed(2)}
          </span>
            </section>
            <BitCoinChart />
          </div>  
      );    




     //Ref for the price to remember
      function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
          }, [value]);
          return ref.current;
        }
}

export const EtheriumPrice = () => {
    const [price, setPrice] = useState(null);

    const prevPrice=usePrevious(price)

    const [loading, setLoading] = useState(true);
    
    const url='https://price-api.crypto.com/price/v1/exchange/ethereum'
    useEffect(() => 
    {
        let timeoutId;
        async function getLatestPrice()
        {
            fetch(url)
            .then((res) => res.json())
              .then((data) => 
              {
                // console.log(data);
                setPrice(data.fiat.usd);
                // setSymbol(data[0].symbol);
                setLoading(false);
                timeoutId= setTimeout(getLatestPrice, 10000);
              }
              )
    
         .catch((error) => {
            console.log(error);
          });
        }
        getLatestPrice()

        return()=>{
          clearTimeout(timeoutId)
        }
    }, [setPrice]);
    return (
      <div className={style.eth}>
       <div className={style.nameWrapper}>  
         <img src="https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880" alt="" />
         <p className={style.name}>
          Etherium
         </p>
      </div>
    <section className={style.ethPriceWrapper}>
  <span className={style.ethPrice} style={{color:price < prevPrice ? 'red':'#18B000',
          transition: "all .5s ease",
          WebkitTransition: "all 1.5s ease",
          MozTransition: "all 1.5s ease"}}>
    {loading ? "LOADING" : "$" + price.toFixed(2)}
  </span>
    </section>
       <EthChart/>
      </div>
      );  
      


      //Ref for the price to remember
      function usePrevious(value) {
        const ref = useRef();
        useEffect(() => {
            ref.current = value;
          }, [value]);
          return ref.current;
        }
}

export const BNBPrice = () => {
  const [price, setPrice] = useState(null);

  const prevPrice=usePrevious(price)

  const [loading, setLoading] = useState(true);
  
  const url='https://price-api.crypto.com/price/v1/exchange/bnb'
  useEffect(() => 
  {
      let timeoutId;
      async function getLatestPrice()
      {
          fetch(url)
          .then((res) => res.json())
            .then((data) => 
            {
              // console.log(data);
              setPrice(data.fiat.usd);
              // setSymbol(data[0].symbol);
              setLoading(false);
              timeoutId= setTimeout(getLatestPrice, 10000);
            }
            )
  
       .catch((error) => {
          console.log(error);
        });
      }
      getLatestPrice()

      return()=>{
        clearTimeout(timeoutId)
      }
  }, [setPrice]);
  return (
    
    <div className={style.bnb}>
     <div className={style.nameWrapper}>  
       <img src="https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1644979850" alt="" />
       <p className={style.name}>
        BNB
       </p>
    </div>
  <section className={style.bnbPriceWrapper}>
<span className={style.bnbPrice} style={{color:price < prevPrice ? 'red':'#18B000',
          transition: "all .5s ease",
          WebkitTransition: "all 1.5s ease",
          MozTransition: "all 1.5s ease"}}>
  {loading ? "LOADING" : "$" + price.toFixed(2)}
</span>
  </section>
     <BNBChart/>
    </div>
    
    );  
    

    //Ref for the price to remember
    function usePrevious(value) {
      const ref = useRef();
      useEffect(() => {
          ref.current = value;
        }, [value]);
        return ref.current;
      }
}
