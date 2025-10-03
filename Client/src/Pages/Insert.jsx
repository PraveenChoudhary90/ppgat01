import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";

function Insert() {
   
  const [input, setInput] = useState("");
  const[image, setImage]  =useState("");

  const handelInput = (e)=>{
    const name=e.target.name;
    const value = e.target.value;
    setInput(values=>({...values, [name]:value}));
    console.log(input);
  }

  const handelImage = (e)=>{
    setImage(e.target.files);
    console.log(image);
  }


  const handelSubmit =async (e)=>{
    e.preventDefault();
    const api = "http://localhost:8000/student/insert";
    const formData = new FormData();
    for(let key in input){
     formData.append(key,input[key]);
    }

    for(let i = 0;i<image.length;i++){
      formData.append("image", image[i]);
    }

    const response = await axios.post(api, formData);
    console.log(response.data);
    alert(response.data.msg);
  }



  return (
    <>
    <h1>Insert Page</h1>
        <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail1">
        <Form.Label>Enter Product Name</Form.Label>
        <Form.Control type="text" name='name' value={input.name} onChange={handelInput} />
      </Form.Group>

       <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter Product Brand</Form.Label>
        <Form.Control type="text" name='brand' value={input.brand} onChange={handelInput} />
      </Form.Group>


      <Form.Group className="mb-3" controlId="formBasicEmail11">
        <Form.Label>Enter Color</Form.Label>
        <Form.Control type="text" name='color' value={input.color} onChange={handelInput} />
      </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail12">
        <Form.Label>Enter Price</Form.Label>
        <Form.Control type="text" name='price' value={input.price} onChange={handelInput} />
      </Form.Group>

       

       <Form.Group className="mb-3" controlId="formBasicEmail41">
        <Form.Label>Enter Imagurl </Form.Label>
        <Form.Control type="file" multiple  onChange={handelImage} />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={handelSubmit}>
        Submit
      </Button>
    </Form>

    </>
  )
}

export default Insert