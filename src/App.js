import { Header} from './components/header/Header';
import Menu from'./components/menu/Menu'
import './App.css';
import React, { useState } from 'react';
import { All } from './components/menu/all';
import {Route,Routes} from 'react-router-dom'
import Follow from './components/header/prices/Prices';
import{BitcoinPrice,EtheriumPrice,BNBPrice} from './components/menu/menu function/Crypto-values/CryptoPrices'
// import { Auth, onAuthStateChanged } from "firebase/auth";

function App(props) {
  const[showMenu,setShow]=useState(true)


  return (
    <div className="App">
      <Header showInterested={setShow} />
    <div className='line'/>
    {showMenu?<></>:<div className='blockView'></div>}
    <Menu/>
      <Routes>
              
              <Route path="/etherium" element={<EtheriumPrice/>}></Route>
              <Route path="/BNB" element={<BNBPrice/>}></Route>
              <Route path="/BTC" element={<BitcoinPrice/>}></Route>
              <Route path="/All" element={<All/>}></Route>
      </Routes>    

    </div>
  );
};
export default App;

