import React, { useEffect,useState } from 'react'

const Cart = () => {
  const [data, setData] = useState([]);

  useEffect(()=>{
cartdetails();
  },[])

  const cartdetails = async()=>{
    let userId = JSON.parse(localStorage.getItem('user'))._id
    let result = await fetch(`http://localhost:8000/api/cart/${userId}`,{
      headers:{
        authorization:`Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    });
    result = await result.json();
    result = result.result.cart
    // console.log('result,res',result.result.cart);
    setData(result);

  }
  console.log('22',data);

  return (
 <div>
 {
  data.length>0 ?  data.map((item)=>{
    return(
      <div className='cart'key={item._id}>
      <div className='cartitem' >
           <img src={item.photo}
            alt="" width={50} />
            <span>{item.name}</span>
            <button>-</button>
            <span>1</span>
            <button>+</button>
            <span className='mrp'>{item.price}</span>
            <button className='del'>delete</button>
    </div>
    </div>
    )
  })
  :<><h1>No item in the cart</h1></>
 
 }
 </div>
  )
}

export default Cart