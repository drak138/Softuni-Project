import React, { useState } from 'react';
export const BNB=()=>{
    const [isActiveBNB,setisActiveBNB]=useState(false);

        const handleClick1=()=>{
            setisActiveBNB(current => !current);
        }
        return(<li onClick={handleClick1}>
            <div style={{position:'relative', width:'18px', height:'18px',border:'2px solid black',right:'1px', backgroundColor: isActiveBNB ? 'blue':''}}>
            {
            isActiveBNB?<i style={{color:'white', position:'relative',bottom:'4px',fontSize:'20px'}} className='fa-solid fa-check'/>:null
            }
            </div>
            BNB</li>
        )
}
export const Bitcoin=()=>{
    const [isActiveBit,setisActiveBit]=useState(false);

        const handleClick=()=>{
            setisActiveBit(current => !current);
        }
        return(
            <li onClick={handleClick}>
            <div style={{position:'relative', width:'18px', height:'18px',border:'2px solid black',right:'42px', backgroundColor: isActiveBit ? 'blue':''}}>
            {
            isActiveBit?<i style={{color:'white', position:'relative',bottom:'4px',fontSize:'20px'}} className='fa-solid fa-check'/>:null
            }
            </div>
            bitcoin</li>
        )
}