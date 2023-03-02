import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
const [email,setEmail] = useState('');
const [password,setPassword] = useState('');
const navigate = useNavigate();

useEffect(()=>{
    const auth = localStorage.getItem("user");
    if(auth){
        navigate("/");
    }
},[])

  const collectData = async()=>{
    console.log(email,password);
 if(!email || !password){
  alert('plz include all the fields');
  return false;
 }
   
let result = await fetch('http://localhost:8000/api/auth/signin',{
  method:'post',
  body:JSON.stringify({email,password}),
  headers:{
    'Content-Type':'application/json'
  }
})
result = await result.json();
// console.log(result);

if(result.status === 'success'){
  alert(result.message);
  navigate('/')
  localStorage.setItem('user',JSON.stringify(result.user));
  localStorage.setItem("token",JSON.stringify(result.auth));

}else{
  return alert(result.error)
}


  }

  return (
    <div className='signin'>
        <h1>Signin</h1>


        <input type="text"className='inputBox' placeholder='enter your email'
        value={email}  onChange={(e)=>setEmail(e.target.value)}

     />

        <input type="password" className='inputBox' placeholder='enter your password' 
        value={password}  onChange={(e)=>setPassword(e.target.value)}

         />

        <button onClick={collectData} type='button' className='btn'>Sign in</button>
    </div>
  )
}

export default Signup