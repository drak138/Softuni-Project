import styles from './header.module.css'
import {useEffect, useState } from 'react';
import { db, auth } from '../../firebase';
import {setDoc, doc, getDoc, deleteDoc, updateDoc, addDoc} from 'firebase/firestore'
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,signOut, deleteUser, updatePassword, updateEmail} from 'firebase/auth'
import validator from 'validator'
import { async } from '@firebase/util';
import { Routes,Route,Link} from 'react-router-dom';

export const Header = () =>{

   const[DocF,setDocF]=useState(Boolean)
   const[DocF2,setDocF2]=useState(Boolean)
   const[DocF3,setDocF3]=useState(Boolean)
   const[DocUid,setDocUid]=useState('')
   const[DocUid2, setDocUid2]=useState('')
    const[regUsername,setRegUsername]=useState('')

    const [emailError, setEmailError] = useState('')

    const[userP,setUserP]=useState('')

    const[showIntrested,setShowIntrested]=useState(false)

    const[follow,setFollow]=useState(false)

    const[followEtherium,setFollowEtherium]=useState(Boolean)

    const[followingEth,setFollowingEth]=useState(Boolean)

    const[followBNB,setFollowBNB]=useState(Boolean)

    const[followingBNB,setFollowingBNB]=useState(Boolean)

    const[followBTC,setFollowBTC]=useState(Boolean)

    const[followingBTC,setFollowingBTC]=useState(Boolean)

    const[userChangePass,setUserChangePass]=useState('')

    const[confirmPass2,setConfirmPass2]=useState('')

    const[expand, setExpand]=useState(false)

    const[showChangePass, setShowChangePass]=useState(false)

    const[regPassword,setRegPassword]=useState('')

    const[confirmPass,setConfirmPass]=useState('')

    const[regEmail,setRegEmail]=useState('')

    const[loginPassword,setLoginPassword]=useState('')

    const[loginEmail,setLoginEmail]=useState('')

    const [CurUser, setUser]=useState('')

    const [delUser,setDelUser]=useState('')

    const [userN,setUserN]=useState('')

    const[userE,setUserE]=useState('')

    const [logisClicked,setlogisClicked]=useState(false);

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
       const docRefP=doc(db,"Users",user.user.uid)
       const docRefF=doc(db,"Users",user.user.uid)
       const docRefE=((doc(db,"Users",user.user.uid)))
       const docName= await getDoc(docRef)
       const docE= await getDoc(docRefE)
       setDocF2(docName.data().followedBNB)
       setDocF3(docName.data().followedBtc)
       setDocF(docName.data().followedEtherium)
       setDocUid(docRefF)
       setUserChangePass(docRefP)
       setDelUser(docRef)
       setUserN(docName.data().displayName)
       setUserE(docE.data().Email)
       setUserP(docName.data().Password)
       setPassType("password")
       setShowPass(false)
       setPassType2("password")
       setShowPass2(false)
       setPassType3("password")
       setShowPass3(false)
       console.log(DocF)
   }catch (error){
           console.log(error.message)
       }
       onAuthStateChanged(auth, (currentUser) => {
           setUser(currentUser);
         })
         setShowPass(false)
   }
    const login= async ()=>{
        try{
            const user= await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            )
            const docRef=(doc(db,"Users",user.user.uid))
            const docRefE=((doc(db,"Users",user.user.uid)))
            const docRefP=doc(db,"Users",user.user.uid)
            const docRefF=(doc(db,"Users",user.user.uid))
            const docTest= await getDoc(docRefF)
            const docName = await getDoc(docRef)
            const docE= await getDoc(docRefE)
            // setDocUid2(docRefF)
            setDocUid(docRefF)
            setDocF3(docName.data().followedBtc)
            setDocF2(docName.data().followedBNB)
            setDocF(docName.data().followedEtherium)
            setFollowingBNB(docE.data().followedBNB)
            setFollowingEth(docE.data().followedEtherium)
            setFollowingBTC(docE.data().followedBtc)
            setDelUser(docRef)
            setUserE(docName.data().Email)
            setUserN(docName.data().displayName)
            setUserP(docName.data().Password)
            setUserChangePass(docRefP)
            setlogisClicked(false)
            setPassType("password")
            setPassType2("password")
            setShowPass2(false)
            setPassType3("password")
            setShowPass3(false)
            console.log(DocF)
        } catch (error){
          console.log(error.message)
        setlogisClicked(true)
        if(error.message==("Firebase: Error (auth/wrong-password).")){
          setError("Wrong Password")
        }
        else if(error.message==("Firebase: Error (auth/invalid-email).")){
          setError("Invalid E-mail")
        } 
        else if(error.message==("Firebase: Error (auth/user-not-found).")){
          setError("Wrong user E-mail")
        }
        else{
          setError("")
        }
        }
        onAuthStateChanged(auth, (currentUser) => {
          // if(DocF===false){
          //   setFollowEtherium(prevFollowEtherium=>!prevFollowEtherium)
          //   setDocF(prevsetDocF=>!prevsetDocF)
          // }
          // else if(DocF===true){
          //   setFollowEtherium(prevFollowEtherium=>!prevFollowEtherium)
          //   setDocF(prevsetDocF=>!prevsetDocF)
          // }
            setUser(currentUser);
          })
          console.log(DocUid2)
    }

     const togglePassword=()=>{
    setShowPass(current=>!current)
    if(showPass){
      setPassType("password")
    }
    else{
      setPassType("text")
    }
    console.log(showPass)
    console.log(passType)
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
      setFollowingEth(false)
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
    const newPass=(regPassword)
    const changePass=()=>{
      try{
        updatePassword(CurUser,newPass)
      } catch(error){

      }
      try{
        updateDoc(userChangePass,{Password:regPassword})
      }catch(error){

      }
      setFollowingEth(false)
      setPassType("password")
      setShowPass(false)
      setPassType2("password")
      setShowPass2(false)
      setPassType3("password")
      setShowPass3(false)
      signOut(auth)
      setLoginEmail("")
      setLoginPassword("")
        setShowDel(false)
        setShowProfile(false);
        setExpand(false)
        setShowChangePass(false)
        setConfirmPass("")
        setConfirmPass2("")
        setError("")
        
    }
    const changeUsername=()=>{
      try{
        updateDoc(userChangePass,{displayName:regUsername})
      } catch(error){

      }
      setFollowingEth(false)
      setPassType("password")
      setShowPass(false)
      setPassType2("password")
      setShowPass2(false)
      setPassType3("password")
      setShowPass3(false)
      signOut(auth);
      setRegEmail("")
      setLoginEmail("")
      setLoginPassword("")
      setShowDel(false)
        setShowProfile(false);
        setExpand(false)
        setShowChangePass(false)
        setConfirmPass("")
        setConfirmPass2("")
        setEditN(false)
        setError("")
        
    }
    const newEmail=(regEmail)
    const changeEmail=async ()=>{
      try{
        await updateEmail(CurUser, newEmail)
        await updateDoc (userChangePass,{Email:regEmail})
        setPassType("password")
        setFollowingEth(false)
      setShowPass(false)
      setPassType2("password")
      setShowPass2(false)
      setPassType3("password")
      setShowPass3(false)
      signOut(auth);
      setRegEmail("")
      setLoginEmail("")
      setLoginPassword("")
      setShowDel(false)
        setShowProfile(false);
        setExpand(false)
        setShowChangePass(false)
        setConfirmPass("")
        setConfirmPass2("")
        setError("")
      }catch(error){
        console.log(error.message)
        setEditE(true)
        if(error.message==("Firebase: Error (auth/email-already-in-use).")){
          setError("E-mail already in use")
        }
      }
        
    }
    const deleteuser=async()=>{
      try{
      await deleteUser(CurUser)
      } catch(error){

      }
      signOut(auth);
      setFollowingEth(false)
      setPassType("password")
      setShowPass(false)
      setPassType2("password")
      setShowPass2(false)
      setPassType3("password")
      setShowPass3(false)
      deleteDoc(delUser);
      setShowProfile(false);
      setExpand(false)
      setLoginEmail("")
      setLoginPassword("")
      setShowChangePass(false)
      console.log(showProfile)
      setRegPassword("")
      setConfirmPass("")
      setConfirmPass2("")
      setError("")  
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

    const closeReg=()=>{
      setregisClicked(false)
      setPassType("password")
      setShowPass(false)
      setPassType2("password")
      setShowPass2(false)
      setRegUsername("")
      setRegEmail("")
      setRegPassword("")
      setConfirmPass("")
      setConfirmPass2("")
      setError("")
    }    

    const closeLog=()=>{
      setlogisClicked(false)
      setPassType("password")
      setShowPass(false)
      setLoginEmail("")
      setLoginPassword("")
      setError("")
      setLoginEmail("")
      setLoginPassword("")
      setShowChangePass(false)
      setRegPassword("")
      setConfirmPass("")
      setConfirmPass2("")
      setError("")
    }

  const handleLog=()=>{
    setlogisClicked(current=>!current)
    setregisClicked(false)
  }
  const handleReg=()=>{
    setlogisClicked(false)
    setregisClicked(current=>!current)
    console.log(regisClicked)
  }
  const closeProf=()=>{
    setShowProfile(false)
    setPassType("password")
      setShowPass(false)
      setPassType2("password")
      setShowPass2(false)
      setPassType3("password")
      setShowPass3(false)
      setConfirmPass("")
      setConfirmPass2("")
      setShowChangePass(false)
      setEditE(false)
      setRegPassword("")
      setEditN(false)
  }
  useEffect(()=>{
    setDocF(current=>!current)
    setFollowEtherium(current=>!current)
  },[followingEth])

  useEffect(()=>{
    setDocF2(current=>!current)
    setFollowBNB(current=>!current)
  },[followingBNB])
  
  useEffect(()=>{
    setDocF3(current=>!current)
    setFollowBTC(current=>!current)
  },[followingBTC])

  const showfollow=()=>{
    setShowIntrested(current=>!current)
    setFollow(current=>!current)
  }
  const followEth1=async ()=>{
    setDocF(current=>!current)
    setFollowingEth(current=>!current)
        try{
     await updateDoc(DocUid,{followedEtherium:followEtherium})}
     catch(error){
     console.log(error.message)
     }
     if(DocF===true){
      setFollowEtherium(current=>!current)
     }
        }
        const followBnb=async()=>{
          setDocF2(current=>!current)
          setFollowingBNB(current=>!current)
          try{
            await updateDoc(DocUid,{followedBNB:followBNB})
          }catch(error){
            console.log(error.message)
          }
          if(DocF2===true){
            setFollowBNB(current=>!current)
          }
        }

        const followBtc=async()=>{
        setDocF3(current=>!current)
        setFollowingBTC(current=>!current)
        try{
          await updateDoc(DocUid,{followedBtc:followBTC})
        }catch(error){

        }
        console.log(DocF3)
          console.log(followBTC)
          console.log(followingBTC)
        if(DocF3===true){
          setFollowBTC(current=>!current)
        }
        }
     function Follow(){
      const round =(number)=>{
        return number ? +number.toFixed(2):null
      }

      const[EthP1,setEthP1]=useState([])
      const[EthP2,setEthP2]=useState({})
      const url=`/v8/finance/chart/BTC-USD?region=US&lang=en-US&includePrePost=false&interval=60m&useYfid=true&range=7d&corsDomain=finance.yahoo.com&.tsrc=finance`
     useEffect(()=>{
      fetch(url)
              .then((res) =>res.json()
              )
              .then((data)=>{
                console.log(data.chart);
                setEthP1([[data.chart.result[0].indicators.quote[0].close[0]].map(round)])
                // const quote=data.chart.result[0].indicators.quote.map((index)=>
                // ({
                //   y:[Price1.open[index],Price1.high[index],Price1.low[index],Price1.close[index]].map(round)}))
                console.log(EthP1)
              })
     },[])
      return(
      <div className={styles.followWrapper}>
      <p>{EthP1}</p>
      </div>
     )
    }
//   const followBNB=async()=>{
//     try{
//       setFollowBNB(current=>!current)
//      updateDoc(doc(db,"Users",User.uid),{followedBNB:followBnb})
//      setFollowingBNB(current=>!current)
//     }
// catch(error){
//   console.log(error.message)

// }
// }
    return(
        <header style={styles} className={styles.container}>
            <Link to='/' src={"./logo.png"}><img style={{right:expand? "151.4%":null}} src={require ("./logo.png")} alt="logo here" /></Link>
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
            <Link to="/follow">Intrested</Link>
            <button onClick={logout}>signOut</button>
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
                <i onClick={closeReg} style={{cursor:'pointer', position:'absolute',top:'1%',left:'96%'}} className="fa-solid fa-x"></i>
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
                        {confirmPass==regPassword? <p style={{color:'green', margin:'0', marginTop:'0.5rem', fontSize:'1.3rem', letterSpacing:'1px'}}>Passwords Match</p>:null}</div>:null
                        }
                    </div>
                    <p onClick={handleLog} style={{margin:'0',color:'blue',cursor:'pointer'}}>Already have an account</p>
                    {confirmPass==regPassword?<div>
                        <button style={{color:'white', backgroundColor:'transparent', border:'none'}} onClick={register}>Register</button>
                    </div>:
                    <div><button>Register</button></div>}
                </div>
            </div>:null
           } 
            {
            logisClicked?<div className={styles.login}>
            <div>
            <i onClick={closeLog} style={{cursor:'pointer', position:'absolute',top:'1%',left:'96%'}} className="fa-solid fa-x"></i>
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
                  <p>{ErrorM}</p>
                   {loginPassword?<button onClick={login}>LogIn</button>:<p style={{color:'red', margin:'auto', fontSize:'20px'}}>Password must be filled</p>}
                  </div>
            </div>:null
           }          
               {showProfile?<div className={styles.editProfile}>
               <i onClick={closeProf} style={{cursor:'pointer', position:'absolute',top:'1%',left:'96%'}} className="fa-solid fa-x"></i>
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
                     {regEmail==userE?<span style={{marginRight:'2rem'}}>E-mail must be new</span>
                     :<span style={{marginRight:'4rem'}} ><button style={{float:'none'}} disabled={!(/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,})$/.test(regEmail))} onClick={changeEmail}>Edit E-mail
                     </button></span>
                     }
                     <span style={{color:'green'}}>{emailError}</span>
                     </div>
                     :<span style={{marginLeft: '40px',marginRight: '19px'}}>You need to fill new E-mail</span>
                     }
                     <span style={{margin:'auto',marginTop:'0.5rem', color:'red'}}>{ErrorM}</span>
               </div>
                </div>:
                <div className={styles.Email}>
               <label htmlFor="EditUserName">E-Mail:</label>
               <p>{userE}</p>
               <button style={{margin:'auto'}} onClick={handleEditE}>Edit E-mail</button>
               </div>
                }
                <div className='interested'>
                  <button onClick={showfollow} style={{margin:'auto'}}>Intrest</button>
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
            <div style={{position:'relative', width:'18px', height:'18px',border:'2px solid black',right:'1px', backgroundColor: followingBNB ==true? 'blue':''}}>
            {
              followingBNB==true?<i style={{color:'white', position:'relative',bottom:'4px',fontSize:'20px'}} className='fa-solid fa-check'/>:null
            }
            </div>
             Follow BNB
                </li>                   
                <li  style={{gap:'77px', cursor:'pointer'}} onClick={followBtc}>
            <div style={{position:'relative', width:'18px', height:'18px',border:'2px solid black',right:'1px', backgroundColor: followingBTC ==true? 'blue':''}}>
            {
              followingBTC==true?<i style={{color:'white', position:'relative',bottom:'4px',fontSize:'20px'}} className='fa-solid fa-check'/>:null
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
                        {regPassword && confirmPass2==regPassword? <p style={{color:'green', margin:'0', marginTop:'0.5rem', fontSize:'1.3rem', letterSpacing:'1px'}}>Passwords Match</p>:null}</div>:null
                        }
                    </div>
                    {confirmPass==userP?
                    <div>
                    {confirmPass2?
                    <div>{confirmPass2==regPassword? <p style={{cursor:'pointer'}} onClick={changePass}>Change password</p>:<p>You can't change password</p>}</div>:<p>Must fill all fields</p>} </div>
                    :<div><p>Incorrect Password</p></div>}
                 </div>:null}
          </div>:null}
          <Routes>
              <Route path="/follow" element={<Follow/>}></Route>
            </Routes>
       </header>
      )}
