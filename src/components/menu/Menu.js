import styles from './Menu.module.css'
import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase';
import {addDoc, getDocs, collection, setDoc, doc, getDoc, deleteDoc, updateDoc,} from 'firebase/firestore'
import {getAuth,createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,signOut, deleteUser, updatePassword} from 'firebase/auth'
import  Crypto  from './menu function/crypto';
import handleClickBNB from './menu function/crypto'
import{BitcoinPrice,EtheriumPrice,BNBPrice} from './menu function/Crypto-values/CryptoPrices'
function Menu(props){
  const [showcrypto,setShowcrypto]=useState(false);

  const [ShowMessage,setShowMessage]=useState(false)

  const [User, setUser]=useState()
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
   signOut(auth);
  }, [])

  const [isActiveEth,setisActiveEth]=useState(true);

  const [isActiveBNB,setisActiveBNB]=useState(false);

  const [isActiveBit,setisActiveBit]=useState(false);

    const [isActive,setisActive]=useState(false);

    const handleClick=()=>{
        setisActive(current => !current);
        setisActiveBit(true);
        setisActiveBNB(true);
    }
   
    return(
      <div className='wrapper'>  
    <section className={styles.menu}>
    <div className={styles.wrapper}>
    <div className='Crypto'>
          
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
          {User?<li  onClick={()=>props.handleClickBit(setisActiveBit(current => !current))}>
            
          <div handleClickBit={isActiveBit=>setisActiveBit(current => !current)} style={{position:'relative', width:'18px', height:'18px',border:'2px solid black',right:'42px', backgroundColor:  isActiveBit ? 'blue':''}}>
            
            {
            isActiveBit?<i style={{color:'white', position:'relative',bottom:'4px',fontSize:'20px'}} className='fa-solid fa-check'/>:null
            }
            </div>
            Bitcoin
            </li>:<p style={{fontSize:'21px', fontWeight:'400'}}>you have to be logged in</p>}
        </ul>:null
        }
      </button>
      </div>
      {User?<button onClick={handleClick}>
        <p>
          all
        </p>
      </button>:<button onClick={()=>setShowMessage(current=>!current)}><p>all</p></button>
      }
      {ShowMessage?<div onClick={()=> setShowMessage(false)} style={{backgroundColor: '#46507c',border: '2px solid black',borderRadius: '20px',position: 'absolute',zIndex: '1',display:'flex',flexDirection:'column',alignItems:'center', top:'20%'}}><h2>You have to be logged in to use this function</h2><h3>Click to close</h3></div>:null}
    </div>
    </section>
    <section className={styles.cryptoWrapper}>
    {
    isActiveEth?<EtheriumPrice/>:null
    } 
    {
        isActiveBNB?<BNBPrice/>:null
    }
    {
      isActiveBit?<BitcoinPrice/>:null
    }
    </section>
    <div className='line'/>
    
    </div>
    )
    

}
export default Menu