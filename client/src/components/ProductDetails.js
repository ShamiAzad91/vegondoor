import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
 const [product,setProduct] = useState([]);
 const params = useParams();
 console.log(params);

 useEffect(()=>{
  getProductDetails();
 },[])


 const getProductDetails = async()=>{
  let result = await fetch(
    `http://localhost:8000/api/product/single/${params.id}`,{
      headers:{
        authorization:`Bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    }
  );
  result = await result.json();
  // console.log('result is',result)
  setProduct(result);
 }
 console.log("product is ",product)



  return (
    <div className='main1'>
      {
        product.map((item)=>{
          return(
            <>
       <div className='photodiv'>
            <div className='pic'>
            <img src={item.photo} alt="image" />
            </div>
        </div>
        <div className="details">
            <h2> {item.name}</h2>
           <div className="description">
            <p>{item.desc}
            </p>

           </div>
                <h2>Price :${item.price}</h2>
                <h5>category:{item.category}</h5>
                <button>Add to cart</button>
        </div>
       </>

          )
        })
      }
       

    </div>
  )
}

export default ProductDetails