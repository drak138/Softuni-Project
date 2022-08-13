import { Header} from './components/header/Header';
import Menu from'./components/menu/Menu'
import './App.css';
import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { All } from './components/menu/all';
import {onAuthStateChanged,signOut} from 'firebase/auth'
import {Route,Routes} from 'react-router-dom'
import{BitcoinPrice,EtheriumPrice,BNBPrice} from './components/menu/menu function/Crypto-values/CryptoPrices'

function App(props) {
  
const [ShowMessage,setShowMessage]=useState(false)
    
  return (
    <div className="App">
      <Header/>
    <div className='line'/>
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
