

import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch } from 'react-redux';
import { Addtocart } from '../CartSlice';

function Home() {
  
  const [mydata, setMydata]  =useState([]);
  
  const dispatch = useDispatch();


  const LoadData =async ()=>{
    const api = "http://localhost:8000/student/display";
    const response = await axios.get(api);
    console.log(response.data);
    setMydata(response.data);
  }


  useEffect(()=>{
    LoadData();
  },[])


  const ans =mydata.map((key)=>{
    return(
      <>
          <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={`http://localhost:8000/${key.defaultImage}`} />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          
          <h5>{key.name}</h5>
          <h5>{key.brand}</h5>
          <h5>{key.color}</h5>
          <h5 style={{color:"red"}}>{key.price}</h5>

        </Card.Text>
        <Button variant="warning" onClick={()=>{dispatch(Addtocart({id:key._id,name:key.name,brand:key.brand,
          color:key.color,price:key.price,defaultImage:key.defaultImage, image:key.image, qty:1}))}}>Add to Cart</Button>
      </Card.Body>
    </Card>

      </>
    )
  })

  return (
    <>
    <h1>Home Page</h1>
    <div style={{display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"40px"}}>
      {ans}
    </div>
    </>
  )
}

export default Home