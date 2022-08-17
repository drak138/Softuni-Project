import { Header} from './components/header/Header';
import Menu from'./components/menu/Menu'
import './App.css';
import React from 'react';
import { All } from './components/menu/all';
import {Route,Routes} from 'react-router-dom'
import{BitcoinPrice,EtheriumPrice,BNBPrice} from './components/menu/menu function/Crypto-values/CryptoPrices'

function App(props) {
  
    
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
