import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ProductList = () => {
    const navigate = useNavigate();

    const [product,setProduct] = useState([]);
useEffect(()=>{
    getProducts();
},[])

const getProducts = async()=>{
    let  result = await fetch(`http://localhost:8000/api/product/all`,{
        headers:{
            authorization:`Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });
    result = await result.json();
    console.log(result);
    setProduct(result);
}
// console.log('productlist is',product)


const handleAddToCart = async(productId)=>{
const userId = JSON.parse(localStorage.getItem('user'))._id
// console.log("userId",userId)
    let result = await fetch(`http://localhost:8000/api/cart/${userId}`,{
        method:'post',
        body:JSON.stringify({productId}),
        headers:{
            'Content-Type':'application/json',
            authorization:`Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });

    result = await result.json();
    console.log(result,'here is asdd');
    if(result.status === 'success'){
        alert(result.message)
    }else{
       return alert(result.error)
    }
}


  return (
    <div className="main">

{
    product.map((item)=>{
        return(
            <div className='cards' key={item._id}>
            <div className="image1">
            <img src={item.photo} alt="image is here" />
            </div>
            <div className="title">
    <h1>{item.name}</h1>
            </div>
            <div className="desc">
                <p>{item.desc} </p>
                    <h3 className='price'>${item.price}</h3>
                <button onClick={()=>handleAddToCart(item._id)}>Add to cart</button>
                <Link to={'/product/details/'+item._id} >Details</Link>

            </div>
            </div>
            

        )
    })
}

   
    </div>
  )
}

export default ProductList