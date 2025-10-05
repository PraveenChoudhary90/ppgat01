// import { useSelector } from "react-redux";
// import Table from 'react-bootstrap/Table';
// import axios from "axios";

// const Checkout = () => {
//   const Product = useSelector(state => state.mycart.cart);
//   let totalamount = 0;
//   let count = 0;

//   const ans = Product.map((key, index) => {
//     count++;
//     totalamount += key.qty * key.price;
//     return (
//       <tr key={index}>
//         <td>{count}</td>
//         <td>
//           <img src={`http://localhost:8000/${key.defaultImage}`} alt="" width="80" height="90" />
//         </td>
//         <td>{key.name}</td>
//         <td>{key.brand}</td>
//         <td>{key.color}</td>
//         <td>${key.price}</td>
//         <td>{key.qty}</td>
//         <td>${key.qty * key.price}</td>
//       </tr>
//     );
//   });

//   // ✅ PayPal Payment Handler
//   const handlePay = async () => {
//     try {
//       const res = await axios.post("http://localhost:8000/api/pay", {
//         total: totalamount,
//         cartItems: Product
//       });

//       if (res.data.approvalUrl) {
//         window.location.href = res.data.approvalUrl;
//       }
//     } catch (error) {
//       console.log("Full Error Response:", error?.response?.data || error.message);
//       alert("Error processing payment.");
//     }
//   };

//   return (
//     <>
//       <h1>Check Out Details</h1>
//       <h2>Total Amount: ${totalamount.toFixed(2)}</h2>

//       <Table striped bordered hover>
//         <thead>
//           <tr>
//             <th>Count</th>
//             <th>Image</th>
//             <th>Name</th>
//             <th>Brand</th>
//             <th>Color</th>
//             <th>Price</th>
//             <th>Quantity</th>
//             <th>Total</th>
//           </tr>
//         </thead>
//         <tbody>{ans}</tbody>
//       </Table>

//       <button
//         onClick={handlePay}
//         style={{
//           padding: "10px 20px",
//           backgroundColor: "#0070ba",
//           color: "#fff",
//           border: "none",
//           borderRadius: "5px",
//           // marginTop: "20px"
//         }}
//       >
//         Pay with PayPal
//       </button>
//     </>
//   );
// };

// export default Checkout;

import { useSelector } from "react-redux";
import Table from 'react-bootstrap/Table';
import axios from "axios";

const Checkout = () => {
  const Product = useSelector(state => state?.mycart?.cart || []);
  const totalamount = Product.reduce((sum, item) => sum + item.qty * item.price, 0);

  const handlePay = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/pay", {
        total: totalamount,
        cartItems: Product
      });

      if (res.data.approvalUrl) {
        window.location.href = res.data.approvalUrl;
      }
    } catch (error) {
      console.error("Payment failed:", error.response?.data || error.message);
      alert("Error processing payment.");
    }
  };

  return (
    <>
      <h1>Check Out Details</h1>
      <h2>Total Amount: ${totalamount.toFixed(2)}</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Brand</th>
            <th>Color</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Product.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                <img src={`http://localhost:8000/${item.defaultImage}`} alt={item.name} width="80" height="90" />
              </td>
              <td>{item.name}</td>
              <td>{item.brand}</td>
              <td>{item.color}</td>
              <td>${item.price}</td>
              <td>{item.qty}</td>
              <td>${(item.qty * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <button
        onClick={handlePay}
        disabled={Product.length === 0}
        style={{
          padding: "10px 20px",
          backgroundColor: Product.length === 0 ? "#ccc" : "#0070ba",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: Product.length === 0 ? "not-allowed" : "pointer"
        }}
      >
        Pay with PayPal
      </button>
    </>
  );
};

export default Checkout;

