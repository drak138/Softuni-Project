import React, { useState } from 'react';
import styles from '../Menu.module.css'
import { BNB,Bitcoin } from './clickers/clickers';
import{EtheriumPrice,BNBPrice} from './Crypto-values/CryptoPrices'
function Crypto(props){
   const  [isActive,setisActive]=useState(false);
   
    const [showcrypto,setShowcrypto]=useState(false);

    const [isActiveEth,setisActiveEth]=useState(true);

    const [isActiveBNB,setisActiveBNB]=useState(false);

    const [isActiveBit,setisActiveBit]=useState(false);

    return(
      <div className='CryptoWrapper'>
          
          <button className={styles.crypto}>
        <p onClick={()=>setShowcrypto(!showcrypto)}>crypto <i className='fa-solid fa-arrow-down'></i></p>
        {
        showcrypto?<ul className='toggle-down' type="none">
          <div className={styles.line2}/>
          <li style={{gap:'10px'}} onClick={()=>props.handleClickEth(setisActiveEth(current => !current))}>
            <div style={{position:'relative', width:'18px', height:'18px',border:'2px solid black', right:'18px', backgroundColor: isActiveEth ? 'blue':''}}>
            {
            isActiveEth?<i style={{color:'white', position:'relative',bottom:'4px',fontSize:'20px'}} className='fa-solid fa-check'/>:null
            }
            </div>
            etherium
          </li>
          <div className={styles.line2}/>
          <li style={{gap:'77px'}} onClick={()=>props.handleClickBNB(setisActiveBNB(current => !current))}>
            <div style={{position:'relative', width:'18px', height:'18px',border:'2px solid black',right:'1px', backgroundColor: isActiveBNB ? 'blue':''}}>
            {
              isActiveBNB?<i style={{color:'white', position:'relative',bottom:'4px',fontSize:'20px'}} className='fa-solid fa-check'/>:null
            }
            </div>
            
            Bnb
          </li>
          <div className={styles.line2}/>
          <li  onClick={()=>props.handleClickBit(setisActiveBit(current => !current))}>
            
          <div handleClickBit={isActiveBit=>setisActiveBit(current => !current)} style={{position:'relative', width:'18px', height:'18px',border:'2px solid black',right:'42px', backgroundColor:  isActiveBit ? 'blue':''}}>
            
            {
            isActiveBit?<i style={{color:'white', position:'relative',bottom:'4px',fontSize:'20px'}} className='fa-solid fa-check'/>:null
            }
            </div>
            bitcoin
            </li>
        </ul>:null
        }
      </button>
      </div>
    )
}
