import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
const navigate = useNavigate();

useEffect(()=>{
  if(url){
    addPro()
  }
},[url])

const addPro = async()=>{
  let result = await fetch("http://localhost:8000/api/product/add", {
    method: "post",
    body: JSON.stringify({ name, desc, category, price, photo: url }),
    headers:{
      'Content-Type':'application/json',
      authorization:`Bearer ${JSON.parse(localStorage.getItem('token'))}`
    }
  });
  result = await result.json();
  // console.log(result,'is here');
  // console.log('result.status',result.status)
if(result.error){
  return alert(result.error)
}else{
   alert(result.message);
   navigate("/")
  
}

}


  const addProduct = async () => {
    console.log(name, price, desc, category, image);
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta91clone");
    fetch("https://api.cloudinary.com/v1_1/cnqcnq/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data,'is');
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });

     

    // let result = await fetch("http://localhost:8000/api/product/add", {
    //   method: "post",
    //   body: JSON.stringify({ name, desc, category, price, photo: url }),
    //   headers:{
    //     'Content-Type':'application/json',
    //     authorization:`Bearer ${JSON.parse(localStorage.getItem('token'))}`
    //   }
    // });
    // result = await result.json();
    // console.log(result,'is here')
    // if (result.status === "Success") {
    //   alert('successfully added');
    //   navigate('/')
    // } else {
    //   alert(result.error);
    //   return false;
    // }
  };

  return (
    <div className="product">
      <h1>Add Product Here</h1>
      <input
        type="text"
        placeholder="enter product name"
        className="inputBox"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="enter product desc"
        className="inputBox"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        type="text"
        placeholder="enter product price"
        className="inputBox"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="enter product categories"
        className="inputBox"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <div className="filen">
        <input
          type="file"
          placeholder="upload image"
          className="inputBox"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>
      <button className="btn" type="button" onClick={addProduct}>
        Add product
      </button>
    </div>
  );
};

export default AddProduct;
