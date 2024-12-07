import logo from "./logo.svg";
import "./App.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { createContext, useState } from "react";
import data from "./data.js";
import { Routes, Route, Link, userNavigate, Outlet, useNavigate } from 'react-router-dom'
import Detail from './routes/Detail.js'
import axios from 'axios';
import Cart from './routes/cart.js'


export let Context1= createContext()


function App() {

  let [shoes, setShoes] = useState(data)
  let [재고] = useState([10,11,12])

  let navigate = useNavigate();

  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail')}}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
                <div className="main-bg"></div>
                <div className="container">
                  <div className="row">
          
                       {shoes.map((a,i)=>{
                          return<Card shoes={shoes[i]} i={i+1}></Card>
                        })}  
          
                  </div>
                </div>
                <button onClick={()=>{
                  axios.get('https://codingapple1.github.io/shop/data2.json')
                  .then((결과)=>{
                    console.log(결과.data)
                    let copy=[...shoes, ...결과.data];
                    setShoes(copy);
                  })
                  

                }}>더보기</button>
                </>
              }/>
        <Route path="/detail/:id" element={
          <Context1.Provider value={{재고}}>
          <Detail shoes={shoes}/>
          </Context1.Provider>
        }/>

        <Route path="/cart" element={<Cart/>} />

      </Routes>
    </div>
  );
}

function Card(props){
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes'+props.i+'.jpg'} width="80%" />
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.price }</p>
    </div>
  )
}

function About(){
  return(
    <div>
      <h4>회사 정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}


export default App;
