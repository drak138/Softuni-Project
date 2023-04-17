import styles from './header.module.css'
import {useEffect, useState} from 'react';
import { db, auth} from '../../firebase';
import {setDoc, doc, getDoc, deleteDoc, updateDoc} from 'firebase/firestore'
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,signOut, deleteUser, updatePassword, updateEmail,sendPasswordResetEmail} from 'firebase/auth'
import validator from 'validator'
import { Routes,Route,Link} from 'react-router-dom';

export const Header = () =>{

   const[DocUid,setDocUid]=useState('')
    const[regUsername,setRegUsername]=useState('')

    const [emailError, setEmailError] = useState('')

    const[userP,setUserP]=useState('')



    const[follow,setFollow]=useState(false)



    const[followingEth,setFollowingEth]=useState(Boolean)



    const[followingBNB,setFollowingBNB]=useState(Boolean)



    const[followingBTC,setFollowingBTC]=useState(Boolean)

    const[userEdit,setUserEdit]=useState('')

    const[confirmPass2,setConfirmPass2]=useState('')

    const[expand, setExpand]=useState(false)

    const[showChangePass, setShowChangePass]=useState(false)

    const[regPassword,setRegPassword]=useState('')

    const[confirmPass,setConfirmPass]=useState('')

    const[regEmail,setRegEmail]=useState('')

    const[loginPassword,setLoginPassword]=useState('')

    const[loginEmail,setLoginEmail]=useState('')

    const [CurUser, setUser]=useState('')

    const [userN,setUserN]=useState('')

    const[userE,setUserE]=useState('')

    const [logisClicked,setlogisClicked]=useState(false);

    const [forgot,setForgot]=useState(false)

   const [regisClicked,setregisClicked]=useState(false);

  const [ErrorM, setError]=useState('')

  const[showPass,setShowPass]=useState(false)
  
  const[passType,setPassType]=useState("password")

  const[showPass2,setShowPass2]=useState(false)

  const[passType2,setPassType2]=useState("password")

  const[showPass3,setShowPass3]=useState(false)

  const[passType3,setPassType3]=useState("password")

  const[showProfile,setShowProfile]=useState(false)

  const[showDel,setShowDel]=useState(false)

  const [editN, setEditN]=useState(false)
  const [editE, setEditE]=useState(false)
    
  
     const register= async ()=>{
      setregisClicked(current=>!current)
        try{
       const user = await createUserWithEmailAndPassword(auth, regEmail, regPassword)
       await setDoc(doc(db, "Users",user.user.uid ), {displayName: regUsername, Email: regEmail, Password: regPassword, followedEtherium:false,followedBNB:false, followedBtc:false})
       const docRef=(doc(db,"Users",user.user.uid))
       const docName= await getDoc(docRef)
       setFollowingBNB(docName.data().followedBNB)
       setFollowingEth(docName.data().followedEtherium)
       setFollowingBTC(docName.data().followedBtc)
       setDocUid(docRef)
       setUserEdit(docRef)
       setUserN(docName.data().displayName)
       setUserE(docName.data().Email)
       setUserP(docName.data().Password)
       close()
   }catch (error){
           console.log(error.message)
       }
       onAuthStateChanged(auth, (currentUser) => {
           setUser(currentUser);
         })
         setShowPass(false)
   }


    const ForgotPass=async()=>
    {
      setlogisClicked(false)
      setForgot(true)
    }

    const SendEmail=async()=>{
      try{
        await sendPasswordResetEmail(auth, loginEmail)
   .then(() =>
       {
        setForgot(false)
        setlogisClicked(true)
        setError('')
       }
       ).catch((error)=>
       {
     console.log(error.message)
     if(error.message===("Firebase: Error (auth/user-not-found).")){
      setError("Wrong user E-mail")}
      else if(error.message===("Firebase: Error (auth/invalid-email).")){
        setError("Invalid E-mail")
      }
      })
    }catch(error){
      console.log(error.message) 
  }
}
    const login= async ()=>{
        try{
            const user= await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            )
            try{
              updatePassword(CurUser,loginPassword)
            } catch(error){
      
            }
            try{
              updateDoc(userEdit,{Password:loginPassword})
            }catch(error){
      
            }
            const docRef=(doc(db,"Users",user.user.uid))
            const docName = await getDoc(docRef)
            setDocUid(docRef)
            setFollowingBNB(docName.data().followedBNB)
            setFollowingEth(docName.data().followedEtherium)
            setFollowingBTC(docName.data().followedBtc)
            setUserE(docName.data().Email)
            setUserN(docName.data().displayName)
            setUserP(docName.data().Password)
            setUserEdit(docRef)
            close()
        } catch (error){
          console.log(error.message)
        setlogisClicked(true)
        if(error.message===("Firebase: Error (auth/wrong-password).")){
          setError("Wrong Password")
        }
        else if(error.message===("Firebase: Error (auth/invalid-email).")){
          setError("Invalid E-mail")
        } 
        else if(error.message===("Firebase: Error (auth/user-not-found).")){
          setError("Wrong user E-mail")
        }
        else{
          setError("")
        }
        }
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
          })
          
    }
     const togglePassword=()=>{
    setShowPass(current=>!current)
    if(showPass){
      setPassType("password")
    }
    else{
      setPassType("text")
    }
     }

     
     const togglePassword2=()=>{
      setShowPass2(current=>!current)
      if(showPass2){
        setPassType2("password")
      }
      else{
        setPassType2("text")
      }
     }
     const togglePassword3=()=>{
      setShowPass3(current=>!current)
      if(showPass3){
        setPassType3("password")
      }
      else{
        setPassType3("text")
      }
     }
     
    const logout=async()=>{
      await signOut(auth);
      close()
    }
    const newPass=(regPassword)
    const changePass=()=>{
      try{
        updatePassword(CurUser,newPass)
      } catch(error){

      }
      try{
        updateDoc(userEdit,{Password:regPassword})
      }catch(error){

      }
      close()
        
    }
    const changeUsername=()=>{
      try{
        updateDoc(userEdit,{displayName:regUsername})
      } catch(error){

      }
      close()
    }
    const newEmail=(regEmail)
    const changeEmail=async ()=>{
      try{
        await updateEmail(CurUser, newEmail)
        await updateDoc (userEdit,{Email:regEmail})
        close()
      }catch(error){
        console.log(error.message)
        setEditE(true)
        if(error.message===("Firebase: Error (auth/email-already-in-use).")){
          setError("E-mail already in use")
        }
      }
        
    }
    const deleteuser=async()=>{
      try{
      await deleteUser(CurUser)
      } catch(error){

      }
      logout() 
    };

    const validateEmail = (e) => {
      var email = e.target.value
    
      if (validator.isEmail(email)) {
        setEmailError('Valid Email :)')
      } else {
        setEmailError('Enter valid Email!')
      }
    }

    const emailChangeHandler=(e)=>{
        setRegEmail(e.target.value)
        validateEmail(e)
    }

    const handleEditN=()=>{
      setEditN(current=>!current)
      setRegUsername("")
    }
    
    const handleEditE=()=>{
      setEditE(current=>!current)
    }

    const showchangePass=()=>{
      setShowChangePass(current=>!current)
      setRegPassword("")
      setConfirmPass("")
    }

  const handleLog=()=>{
    setForgot(false)
    setlogisClicked(current=>!current)
    setregisClicked(false)
    setError('')
  }
  const handleReg=()=>{
    setForgot(false)
    setlogisClicked(false)
    setregisClicked(current=>!current)
    setError('')
  }
  const close=()=>{
    setlogisClicked(false)
    setregisClicked(false)
    setShowProfile(false)
    setPassType("password")
    setPassType("password")
    setShowPass(false)
    setPassType2("password")
    setShowPass2(false)
    setPassType3("password")
    setShowPass3(false)
      setShowProfile(false);
      setExpand(false)
      setShowDel(false)
      setRegEmail("")
      setLoginEmail("")
      setLoginPassword("")
      setShowChangePass(false)
      setConfirmPass("")
      setConfirmPass2("")
      setError("")
      setShowPass(false)
  }

  const showfollow=()=>{
    // setShowIntrested(current=>!current)
    setFollow(current=>!current)
  }
  const followEth1=async ()=>{
    setFollowingEth(current=>!current)
        try{
     await updateDoc(DocUid,{followedEtherium:!followingEth})}
     catch(error){
     console.log(error.message)
     }
        }
        const followBnb=async()=>{
          setFollowingBNB(current=>!current)
          try{
            await updateDoc(DocUid,{followedBNB:!followingBNB})
          }catch(error){
            console.log(error.message)
          }
          // if(DocF2==true){
          //   setFollowBNB(current=>!current)
          // }
        }

        const followBtc=async()=>{
 
        setFollowingBTC(current=>!current)
        try{
          await updateDoc(DocUid,{followedBtc:!followingBTC})
        }catch(error){
          console.log(error.message)
        }
        }
     function Follow(){
      const round =(number)=>{
        return number ? +number.toFixed(2):null
      }
      // const multiply=(number)=>{
      //   return number? +number *1000
      // }

      const[EthP1,setEthP1]=useState([])
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
      
      
      function EthChange(){  
          if(EthP2>EthP1){
            return<span>The price has risen with<span style={{color:'green'}}>{(((EthP2-EthP1)/EthP1)*100).toFixed(2) + "%"} <i className="fa-solid fa-sort-up"></i></span></span>
          }else if(EthP1>EthP2){
            return<span>The price has fallen with<span style={{color:'red'}}>{(((EthP1-EthP2)/EthP1)*100).toFixed(2)+ "%"} <i className="fa-solid fa-caret-down"></i></span></span>
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
        {followingBNB||followingBTC||followingEth?
        <div>
       <div className={styles.followEth}> 
        {followingEth?<div><h2>Etherium</h2>
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
    return(
        <header style={styles} className={styles.container}>
            <Link  to="/" src={"./logo.png"}><img src={require ("./logo.png")} alt="logo here" /></Link>
            {
            CurUser?
            <div 
            style={{border:expand? "solid":null,borderColor:expand? "white":null,borderWidth:expand? "2px":null,
            position:expand?'absolute':'relative',left:expand? '88.3%':null,
            backgroundColor:expand?'#46507c':null,
            top:expand? "35%":null}} 
            className={styles.profile}>

            <div
            onClick={()=>setExpand(!expand)} 
            className={styles.UserName}>{userN}</div> 

            {expand?<ul>
            <button onClick={()=>setShowProfile(current=>!current)}>Profile</button>
            {/* <button onClick={showfollow}>Intrested</button> */}
            <Link style={{fontSize:'1.2rem',color:'white',textDecoration:'none'}} onClick={close} to="/follow">Intrested</Link>
            <Link style={{fontSize:'1.2rem',color:'white',textDecoration:'none'}}  onClick={logout} to="/">signOut</Link>
            </ul>:null}
            </div>
            :
            <div>
              
             <button className={styles.button} onClick={handleLog} href="Log in">Log in</button>
             <button className={styles.button} onClick={handleReg} href="Register">Register</button>
            </div>}
            {
            regisClicked?<div className={styles.register}>
                <div>
                <i onClick={close} style={{cursor:'pointer', position:'absolute',top:'1%',left:'96%'}} className="fa-solid fa-x"></i>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input 
                         id="username" 
                         type="text" 
                         onChange={e=>setRegUsername(e.target.value)} 
                         value={regUsername}
                         name="username"/>
                    </div>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input 
                         id="email" 
                         type="email" 
                         onChange={e=>setRegEmail(e.target.value)} 
                         value={regEmail} 
                         name="email"/>
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <div style={{width: '97%', margin: '0', flexDirection: 'row', backgroundColor: 'white', border: '2px inset', borderTopColor: 'rgb(118, 118, 118)', borderLeftColor: 'rgb(118, 118, 118', borderBottomColor: 'rgb(133, 133, 133)', borderRightColor: 'rgb(133, 133, 133)', gap: '0', marginLeft: '1%'}}><input 
                          id="password" 
                          type={passType} 
                          onChange={(e)=>setRegPassword(e.target.value)} 
                          value={regPassword} 
                          name="password" onBlur={()=>setRegPassword(regPassword)}
                          style={{borderWidth:'0px', outline:'none',backgroundColor:'transparent'}}/>
                          {showPass?
                          <button style={{margin: '0', padding: '0', border: 'none'}} onClick={togglePassword}><i style={{color:'black'}} className="fa-solid fa-eye-slash"></i></button>
                          :<button style={{margin: '0', padding: '0', border: 'none'}} onClick={togglePassword}><i style={{color:'black'}} className="fa-solid fa-eye"></i></button>}
                          </div>
                    </div>
                    <div style={{display:'flex', gap:'0'}}>
                        <label style={{marginBottom:'1rem'}} htmlFor="confirmpassword">Confirm Password:</label>
                        <div style={{width: '97%', margin: '0', flexDirection: 'row', backgroundColor: 'white', border: '2px inset', borderTopColor: 'rgb(118, 118, 118)', borderLeftColor: 'rgb(118, 118, 118', borderBottomColor: 'rgb(133, 133, 133)', borderRightColor: 'rgb(133, 133, 133)', gap: '0', marginLeft: '1%'}}>
                        <input 
                        id="confirmpassword" 
                        type={passType2}
                        onChange={(e)=>setConfirmPass(e.target.value)} 
                        value={confirmPass} 
                        onBlur={()=>setConfirmPass(confirmPass)}
                        style={{borderWidth:'0px', outline:'none',backgroundColor:'transparent'}}/>
                        {showPass2?
                          <button style={{margin: '0', padding: '0', border: 'none'}} onClick={togglePassword2}><i style={{color:'black'}} className="fa-solid fa-eye-slash"></i></button>
                          :<button style={{margin: '0', padding: '0', border: 'none'}} onClick={togglePassword2}><i style={{color:'black'}} className="fa-solid fa-eye"></i></button>}
                        </div>
                        {
                        confirmPass?<div>{confirmPass!==regPassword? <p style={{color:'red', margin:'0', marginTop:'0.5rem', fontSize:'1.3rem', letterSpacing:'1px'}}>Passwords do not match</p>:null}
                        {confirmPass===regPassword? <p style={{color:'green', margin:'0', marginTop:'0.5rem', fontSize:'1.3rem', letterSpacing:'1px'}}>Passwords Match</p>:null}</div>:null
                        }
                    </div>
                    <p onClick={handleLog} style={{margin:'0',color:'blue',cursor:'pointer'}}>Already have an account</p>
                    {confirmPass===regPassword?<div>
                        <button style={{color:'white', backgroundColor:'transparent', border:'none'}} onClick={register}>Register</button>
                    </div>:
                    <div><button>Register</button></div>}
                </div>
            </div>:null
           } 
            {
            logisClicked?<div className={styles.login}>
            <div>
            <i onClick={close} style={{cursor:'pointer', position:'absolute',top:'1%',left:'96%'}} className="fa-solid fa-x"></i>
              <div>
                <label htmlFor="email">Email:</label>
                  <input 
                   id="email" 
                   type="email" 
                   onChange={e=>setLoginEmail(e.target.value)} 
                   value={loginEmail} 
                   name="email"
                   />
                </div>
                <div>
                <label htmlFor="password">Password:</label>
                 <div style={{width: '97%', margin: '0', flexDirection: 'row', backgroundColor: 'white', border: '2px inset', borderTopColor: 'rgb(118, 118, 118)', borderLeftColor: 'rgb(118, 118, 118', borderBottomColor: 'rgb(133, 133, 133)', borderRightColor: 'rgb(133, 133, 133)', gap: '0', marginLeft: '1%'}}>
                  <input 
                  id="password" 
                  type={passType}
                  onChange={(e)=>setLoginPassword(e.target.value)} 
                  value={loginPassword} 
                  style={{borderWidth:'0px', outline:'none',backgroundColor:'transparent'}}
                  name="password"/>
                  {showPass?<button style={{margin: '0',
                    padding: '0',
                    border: 'none'}} onClick={togglePassword}><i style={{color:'black'}} className="fa-solid fa-eye-slash"></i></button>:<button style={{margin: '0',
                    padding: '0',
                    border: 'none'}} onClick={togglePassword}><i style={{color:'black'}} className="fa-solid fa-eye"></i></button>}</div>
                </div>
                </div>
                <div>
                  {ErrorM?<p style={{margin:'0'}}>{ErrorM}</p>:null}
                  <button onClick={ForgotPass}>Forgot Password</button>
                   {loginPassword?<button onClick={login}>LogIn</button>:<p style={{color:'red', margin:'auto', fontSize:'20px'}}>Password must be filled</p>}
                  </div>
            </div>:null
           }
           {forgot?<div className={styles.Forgot}>
           <div>
                <label htmlFor="email">Email:</label>
                  <input 
                   id="email" 
                   type="email" 
                   onChange={e=>setLoginEmail(e.target.value)} 
                   value={loginEmail} 
                   name="email"
                   />
                </div>
                {ErrorM?<p>{ErrorM}</p>:null}
                <button onClick={SendEmail}>Send E-mail</button>
           </div>:null}          
               {showProfile?<div className={styles.editProfile}>
               <i onClick={close} style={{cursor:'pointer', position:'absolute',top:'1%',left:'96%'}} className="fa-solid fa-x"></i>
                {editN?<div className={styles.Name}>
               <label htmlFor="EditUserName">New Username:</label>
               <input 
                         id="username" 
                         type="text" 
                         onChange={e=>setRegUsername(e.target.value)} 
                         value={regUsername}
                         name="username"
                         placeholder='Enter new username'/>
                </div>:
                <div className={styles.Name}>
               <label htmlFor="EditUserName">Username:</label>
               <p>{userN}</p>
               </div>
                }
                 {editN?<div style={{display: 'flex', alignContent: 'center', justifyContent: 'space-between', color: 'white', fontSize: '20px'}}> <button onClick={()=>setEditN(false)}>Cancel</button>
                 {regUsername?
                 <div>
                  {regUsername!==userN?<button onClick={changeUsername}>Change Username</button>:<p style={{color:'red'}}> New Username can't match last Username</p>}</div>:
                 <p style={{marginRight:'50px'}}>You need to fill new Username</p>
                 }
                 </div>
                 :<button onClick={handleEditN}>Edit Username</button>}
                {editE?<div className={styles.Email}>
               <label htmlFor="EditUserE-mail">New E-mail:</label>
                <input 
                     id="E-mail" 
                     type="text" 
                     onChange={emailChangeHandler}
                     value={regEmail}
                     name="E-mail"
                     placeholder='Enter new E-mail'/>
                     <div style={{flexWrap:'wrap',marginTop: '15px',display: 'flex',position: 'relative', flexDirection: 'row', justifyContent: 'space-between', width: '99%'}}>
                      <button onClick={()=>setEditE(false)}>Cancel</button>
                     {regEmail?
                     <div>
                     {regEmail===userE?<span style={{marginRight:'2rem'}}>E-mail must be new</span>
                     :<span style={{marginRight:'4rem'}} >{emailError==="Enter valid Email!"?null:<button style={{float:'none'}} disabled={!(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(regEmail))} onClick={changeEmail}>Edit E-mail
                     </button>}</span>
                     }
                     {emailError==="Valid Email :)"?<span style={{color:'green'}}>{emailError}</span>:<span style={{color:'red'}}>{emailError}</span>}
                     </div>
                     :<span style={{marginLeft: '40px',marginRight: '19px'}}>You need to fill new E-mail</span>
                     }
                     {ErrorM?<span style={{margin:'auto',marginTop:'0.5rem', color:'red'}}>{ErrorM}</span>:null}
               </div>
                </div>:
                <div className={styles.Email}>
               <label htmlFor="EditUserName">E-Mail:</label>
               <p>{userE}</p>
               <button style={{margin:'auto'}} onClick={handleEditE}>Chamge E-mail</button>
               </div>
                }
                <div className='interested'>
                  <button onClick={showfollow} style={{margin:'auto'}}>Intrests</button>
                  {follow?
                  <ul type="none">
                  <li onClick={followEth1} style={{gap:'77px', cursor:'pointer'}}>
            <div style={{position:'relative', width:'18px', height:'18px',border:'2px solid black',right:'1px', backgroundColor: followingEth ===true? 'blue':''}}>
            {
              followingEth===true?<i style={{color:'white', position:'relative',bottom:'4px',fontSize:'20px'}} className='fa-solid fa-check'/>:null
            }
            </div>
             Follow Etherium
                </li>

                <li  style={{gap:'77px', cursor:'pointer'}} onClick={followBnb}>
            <div style={{position:'relative', width:'18px', height:'18px',border:'2px solid black',right:'1px', backgroundColor: followingBNB ===true? 'blue':''}}>
            {
              followingBNB===true?<i style={{color:'white', position:'relative',bottom:'4px',fontSize:'20px'}} className='fa-solid fa-check'/>:null
            }
            </div>
             Follow BNB
                </li>                   
                <li  style={{gap:'77px', cursor:'pointer'}} onClick={followBtc}>
            <div style={{position:'relative', width:'18px', height:'18px',border:'2px solid black',right:'1px', backgroundColor: followingBTC ===true? 'blue':''}}>
            {
              followingBTC===true?<i style={{color:'white', position:'relative',bottom:'4px',fontSize:'20px'}} className='fa-solid fa-check'/>:null
            }
            </div>
             Follow BTC
                </li>   
                  </ul>:null}
                </div>
                 <div className={styles.change}>
                  <button onClick={showchangePass}>Change password</button>
                  <button onClick={()=>setShowDel(current=>!current)} style={{color:'red'}} >Delete profile</button>
                 </div>
                 {showDel?<div className={styles.deleteProfile}>
                  <h1>Are you sure you want to delete your profile forever</h1>
                  <div>
                  <button onClick={deleteuser}>Yes</button>
                  <button onClick={()=>setShowDel(false)}>No</button>
                  </div>
                 </div>:null}
                 {showChangePass?<div className={styles.changePass}>
                    <div style={{fontSize: '20px',position: 'relative',marginBottom: '2rem',display:'flex',alignItems:'center'}}>
                      <label htmlFor="confirmPass">Current Password</label>
                      <div style={{width: '63%', margin: '0', flexDirection: 'row', backgroundColor: 'white', border: '2px inset', borderTopColor: 'rgb(118, 118, 118)', borderLeftColor: 'rgb(118, 118, 118', borderBottomColor: 'rgb(133, 133, 133)', borderRightColor: 'rgb(133, 133, 133)', gap: '0', marginLeft: '1%'}}>
                      <input 
                      style={{width:'91%',padding:'0',fontSize:'22px', borderWidth:'0px', outline:'none',backgroundColor:'transparent'}} 
                      id="confirmPassword" 
                      type={passType}
                      onChange={(e)=>setConfirmPass(e.target.value)} 
                      value={confirmPass} 
                      placeholder="Current password" 
                      onBlur={()=>setConfirmPass(confirmPass)}/>
                      {showPass?<button style={{margin: '0',
                    padding: '0',
                    border: 'none'}} onClick={togglePassword}><i style={{color:'black'}} className="fa-solid fa-eye-slash"></i></button>:<button style={{margin: '0',
                    padding: '0',
                    border: 'none'}} onClick={togglePassword}><i style={{color:'black'}} className="fa-solid fa-eye"></i></button>}
                      </div>
                    </div>
                    <div style={{fontSize: '20px',position: 'relative',marginBottom: '2rem'}}>
                       <div style={{marginBottom: '2rem',display:'flex',alignItems:'center'}}>
                        <label htmlFor="newPass">New Password</label>
                       <div style={{width: '68.7%', margin: '0', flexDirection: 'row', backgroundColor: 'white', border: '2px inset', borderTopColor: 'rgb(118, 118, 118)', borderLeftColor: 'rgb(118, 118, 118', borderBottomColor: 'rgb(133, 133, 133)', borderRightColor: 'rgb(133, 133, 133)', gap: '0', marginLeft: '1%'}}>
                        <input 
                        style={{width:'91%',padding:'0',fontSize:'22px', borderWidth:'0px', outline:'none',backgroundColor:'transparent'}} 
                        id="newPassword" 
                        type={passType3} 
                        onChange={(e)=>setRegPassword(e.target.value)}
                        value={regPassword} 
                        placeholder="New password"/>
                       {showPass3?
                          <button style={{margin: '0', padding: '0', border: 'none'}} onClick={togglePassword3}><i style={{color:'black'}} className="fa-solid fa-eye-slash"></i></button>
                          :<button style={{margin: '0', padding: '0', border: 'none'}} onClick={togglePassword3}><i style={{color:'black'}} className="fa-solid fa-eye"></i></button>
                        }
                    </div>
                    </div>
                    <div style={{fontSize: '20px',position: 'relative', display:'flex',alignItems:'center'}}>
                      <label htmlFor="confirmNewPass">Confirm new password</label>
                      <div style={{width: '53%', margin: '0', flexDirection: 'row', backgroundColor: 'white', border: '2px inset', borderTopColor: 'rgb(118, 118, 118)', borderLeftColor: 'rgb(118, 118, 118', borderBottomColor: 'rgb(133, 133, 133)', borderRightColor: 'rgb(133, 133, 133)', gap: '0', marginLeft: '1%'}}>
                      <input 
                      style={{width:'90%',padding:'0',fontSize:'22px', borderWidth:'0px', outline:'none',backgroundColor:'transparent'}}
                      id="confirmpassword" 
                      type={passType2}
                      onChange={(e)=>setConfirmPass2(e.target.value)} 
                      value={confirmPass2} 
                      placeholder="Confirm password" 
                      onBlur={()=>setConfirmPass2(confirmPass2)}/>
                        {showPass2?
                          <button style={{margin: '0', padding: '0', border: 'none'}} onClick={togglePassword2}><i style={{color:'black'}} className="fa-solid fa-eye-slash"></i></button>
                          :<button style={{margin: '0', padding: '0', border: 'none'}} onClick={togglePassword2}><i style={{color:'black'}} className="fa-solid fa-eye"></i></button>
                        }
                        </div>
                      </div>
                        {
                        confirmPass2?<div>{confirmPass2!==regPassword? <p style={{color:'red', margin:'0', marginTop:'0.5rem', fontSize:'1.3rem', letterSpacing:'1px'}}>Passwords do not match</p>:null}
                        {regPassword && confirmPass2===regPassword? <p style={{color:'green', margin:'0', marginTop:'0.5rem', fontSize:'1.3rem', letterSpacing:'1px'}}>Passwords Match</p>:null}</div>:null
                        }
                    </div>
                    {loginPassword && confirmPass===loginPassword || confirmPass===userP?
                    <div>
                    {confirmPass2?
                    <div>{confirmPass2===regPassword? <p style={{cursor:'pointer'}} onClick={changePass}>Change password</p>:<p>You can't change password</p>}</div>:<p>Must fill all fields</p>} </div>
                    :<div><p>Incorrect Password</p></div>}
                 </div>:null}
          </div>:null}
          <Routes>
              <Route path="/follow" element={<Follow/>}></Route>
            </Routes>
       </header>
      )}
