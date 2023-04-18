import {useEffect, useState} from 'react';
import { Auth, onAuthStateChanged } from "firebase/auth";
import { Routes,Route,Link} from 'react-router-dom';
import styles from './header.module.css'
export function Follow (followBtc,followBnb,followEth) {
  const[EthP1,setEthP1]=useState([])

  const[followingEth1,setFollowingEth1]=useState(false)



  const[followingBNB,setFollowingBNB]=useState(false)



  const[followingBTC,setFollowingBTC]=useState(false)
      const[EthP2,setEthP2]=useState([])
      const[BNBP1,setBNBP1]=useState([])
      const[BNBP2,setBNBP2]=useState([])
      const[BtcP1,setBtcP1]=useState([])
      const[BtcP2,setBtcP2]=useState([])
      const urlEth1=`/v8/finance/chart/ETH-USD?region=US&lang=en-US&includePrePost=false&interval=60m&useYfid=true&range=8d&corsDomain=finance.yahoo.com&.tsrc=finance`
      const urlEth2='https://price-api.crypto.com/price/v1/exchange/ethereum'
      const urlBNB1=`/v8/finance/chart/BNB-USD?region=US&lang=en-US&includePrePost=false&interval=60m&useYfid=true&range=8d&corsDomain=finance.yahoo.com&.tsrc=finance`
      const urlBNB2='https://price-api.crypto.com/price/v1/exchange/bnb'
      const urlBtc1=`/v8/finance/chart/BTC-USD?region=US&lang=en-US&includePrePost=false&interval=60m&useYfid=true&range=8d&corsDomain=finance.yahoo.com&.tsrc=finance`
      const urlBtc2='https://price-api.crypto.com/price/v1/exchange/bitcoin'
    
      useEffect(() => {
        setFollowingEth1({followEth})
        console.log(followingEth1);
      },[]);
    
      const round = (number) => {
        return number ? +number.toFixed(2) : null;
      };
    
      function EthChange() {
        if (EthP2 > EthP1) {
          return (
            <span>
              The price has risen with
              <span style={{ color: "green" }}>
                {(((EthP2 - EthP1) / EthP1) * 100).toFixed(2) + "%"}{" "}
                <i className="fa-solid fa-sort-up"></i>
              </span>
            </span>
          );
        } else if (EthP1 > EthP2) {
          return (
            <span>
              The price has fallen with
              <span style={{ color: "red" }}>
                {(((EthP1 - EthP2) / EthP1) * 100).toFixed(2) + "%"}{" "}
                <i className="fa-solid fa-caret-down"></i>
              </span>
            </span>
          );
        }
      }
        
      function BNBChange(){  
        if(BNBP2>BNBP1){
          return<span>The price has risen with<span style={{color:'green'}}>{(((BNBP2-BNBP1)/BNBP1)*100).toFixed(2) + "%"} <i className="fa-solid fa-sort-up"></i></span></span>
        }else if(BNBP1>BNBP2){
          return<span>The price has fallen with<span style={{color:'red'}}>{(((BNBP1-BNBP2)/BNBP1)*100).toFixed(2)+ "%"} <i className="fa-solid fa-caret-down"></i></span></span>
        }
      
    }
    function BtcChange(){  
      if(BtcP2>BtcP1){
        return<span>The price has risen with<span style={{color:'green'}}>{(((BtcP2-BtcP1)/BtcP1)*100).toFixed(2) + "%"} <i className="fa-solid fa-sort-up"></i></span></span>
      }else if(BtcP1>BtcP2){
        return<span>The price has fallen with<span style={{color:'red'}}>{(((BtcP1-BtcP2)/BtcP1)*100).toFixed(2)+ "%"} <i className="fa-solid fa-caret-down"></i></span></span>
      }
    
  }
      const now = new Date()

        const oneWeek= new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7)
      useEffect(()=>{
      fetch(urlEth1)
              .then((res) =>res.json()
              )
              .then((data)=>{
                setEthP1([[data.chart.result[0].indicators.quote[0].close[0]].map(round)])
              })
     },[])
     useEffect(() => 
     {
         {
             fetch(urlEth2)
             .then((res) =>res.json()
             )
               .then((data) => 
               {
                 setEthP2((data.fiat.usd).toFixed(2))
               }
              )
     
          .catch((error) => {
             console.log(error)
           })
         }
     }, [])

     useEffect(()=>{
      fetch(urlBNB1)
              .then((res) =>res.json()
              )
              .then((data)=>{
                setBNBP1([[data.chart.result[0].indicators.quote[0].close[0]].map(round)])
              })
     },[])

     useEffect(() => 
     {
         {
             fetch(urlBNB2)
             .then((res) =>res.json()
             )
               .then((data) => 
               {
                 setBNBP2((data.fiat.usd).toFixed(2))
               }
              )
     
          .catch((error) => {
             console.log(error)
           })
         }
     }, [])

     useEffect(()=>{
      fetch(urlBtc1)
              .then((res) =>res.json()
              )
              .then((data)=>{
                setBtcP1([[data.chart.result[0].indicators.quote[0].close[0]].map(round)])
              })
     },[])

     useEffect(() => 
     {
         {
             fetch(urlBtc2)
             .then((res) =>res.json()
             )
               .then((data) => 
               {
                 setBtcP2((data.fiat.usd).toFixed(2))
               }
              )
     
          .catch((error) => {
             console.log(error)
           })
         }
     }, [])
  return(
    <div className={styles.followWrapper}>
     
      <div style={{float:'right',margin:'1% 1% 0 0'}}><Link style={{textDecoration:'none',color:'white'}} to="/"><i className="fa-solid fa-x"></i></Link></div>
      {followingBNB||followingBTC||followingEth1?
      <div>
     <div className={styles.followEth}> 
      {followingEth1?<div><h2>Etherium</h2>
    <span style={{fontSize:'1.2rem'}}>Price on:{oneWeek.toLocaleDateString()} was : {"$" + EthP1} and has gone to: {"$" + EthP2}. {<EthChange/>}</span></div>:null}
    </div>
    <div className={styles.followEth}>
    {followingBNB?<div><h2>BNB</h2>
    <span style={{fontSize:'1.2rem'}}>Price on:{oneWeek.toLocaleDateString()} was : {"$" + BNBP1} and has gone to: {"$" + BNBP2}. {<BNBChange/>}</span></div>:null}
    </div>
    <div className={styles.followEth}>
    {followingBTC?<div><h2>Btc</h2>
    <span style={{fontSize:'1.2rem'}}>Price on:{oneWeek.toLocaleDateString()} was : {"$" + BtcP1} and has gone to: {"$" + BtcP2}. {<BtcChange/>}</span></div>:null}
    </div>
    </div>:<h2>You have to follow a currency. You can do this by going to profile then in Intrests</h2>}
    </div> 
   )
      }
