import { useDispatch, useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { Decrement, Increment, RemoveItem } from "../CartSlice";

const CartData = ()=>{
    const dispatch = useDispatch();
    const Product = useSelector(state=>state.mycart.cart);
    console.log(Product);
   var totalamount = 0;
  let count = 0;
  const ans  = Product.map(key=>{
    count++;
    totalamount+=key.qty*key.price;
    return(
        <>
        <tr>
            <td>{count}</td>
            <td><img src={`http://localhost:8000/${key.defaultImage}`} alt="" width="80" height="90" /></td>
            <td>{key.name}</td>
            <td>{key.brand}</td>
            <td>{key.color}</td>
            <td>{key.price}</td>
            <td>
                <FaMinus style={{marginRight:"20px", fontSize:"20px"}} onClick={()=>{dispatch(Decrement({id:key.id}))}} />
                {key.qty}
                <FaPlus style={{marginLeft:"20px", fontSize:"20px"}} onClick={()=>{dispatch(Increment({id:key.id}))}} />
                </td>
            <td>{key.qty*key.price}</td>
            <td onClick={()=>{dispatch(RemoveItem({id:key.id}))}} >Delete</td>
        </tr>
        </>
    )
  })

    return(
        <>
        <h1>Total Amount:{totalamount}</h1>
         <Table striped bordered hover>
      <thead>
        <tr>
          <th>Count</th>
          <th>Image</th>
          <th>Name</th>
          <th>Brand</th>
          <th>Color</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Total</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {ans}
      </tbody>
      </Table>
        
        </>
    )
}


export default CartData;