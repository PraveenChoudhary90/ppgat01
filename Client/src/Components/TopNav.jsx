import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { MdLocalGroceryStore } from "react-icons/md";
import { useSelector } from 'react-redux';

const TopNav =()=>{


  const navigate =useNavigate();
    
  const Product = useSelector(state=>state.mycart.cart);
  console.log(Product);
  const proLength = Product.length;


    return(
        <>
        <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand as={Link}   to="home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link}   to="home">Home</Nav.Link>
            <Nav.Link as={Link}   to="about">About</Nav.Link>
            <Nav.Link  as={Link}  to="insert">InsertFrom</Nav.Link>
          </Nav>
        <MdLocalGroceryStore onClick={()=>{navigate("/cartdata")}} />{proLength}
        </Container>
      </Navbar>
        </>
    )
}

export default TopNav;