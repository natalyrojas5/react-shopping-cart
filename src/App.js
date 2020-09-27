import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import './App.css'

/* COMIDAS IMGS -----------------*/
import { ceviche, huancaina, causaDeAtun, majarisco, chaufa, tallarin, caldoDGallina } from '../src/assets';


/* PAGES ------------------*/
const PAGE_foodsS = 'foodss';
const PAGE_CART = 'cart';

/* LOCALSTORAGE COMIDAS ------------*/
const foodssLS = JSON.parse(localStorage.getItem('foodss')) || '[]';

function App() {
  const [cart, setCart] = useState(foodssLS);
  const [foods] = useState([
    {
      name: 'Ceviche',
      price: 12.50,
      image: ceviche
    },
    {
      name: 'Huancaina',
      price: 5.40,
      image: huancaina
    },
    {
      name: 'Causa de Atun',
      price: 14.30,
      image: causaDeAtun
    },
    {
      name: 'Majarisco',
      price: 40.50,
      image: majarisco
    },
    {
      name: 'Chaufa',
      price: 30.50,
      image: chaufa
    },
    {
      name: 'Tallarin',
      price: 30.50,
      image: tallarin
    },
    {
      name: 'Caldo de Gallina',
      price: 30.50,
      image: caldoDGallina
    },
  ])

  const [page, setPage] = useState(PAGE_CART);

  useEffect(() => {
    localStorage.setItem('foodss', JSON.stringify(cart));

  }, [cart])

  const addCart = (foods) => {
    debugger
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Comida agregada',
      showConfirmButton: false,
      timer: 1500
    })
    setCart([...cart, { ...foods }])
  }

  const removeCart = (removefoods) => {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Comida eliminada',
      showConfirmButton: false,
      timer: 1500
    })
    setCart(cart.filter((foods) => foods !== removefoods))
  }
  /* NAVIGATION ------------------- */
  const navigationTo = (pageNext) => {
    setPage(pageNext);
  }

  /* SHOW PAGES ----------------------------*/
  const renderCart = () => (
    foods?.map((foods, id) => (
      <div className="col-12 col-sm-6 col-md-4 col-xl-3  text-center my-4" key={id}>
        <img src={foods.image} className="rounded w-100 image-foods" alt={foods.name} />
        <div className="m-2">
          <h1 className="h4">{foods.name}</h1>
          <div className="d-flex justify-content-center">
            <p className="h5 mr-2">S/.</p>
            <p className="h5 font-weight-normal">{foods.price}</p>
          </div>
        </div>
        <button
          type="button"
          className="btn btn-warning btn-block"
          onClick={() => addCart(foods)}>Agregar</button>
      </div>
    ))
  )

  const renderfoodss = () => (
    cart?.length > 0 ?
      cart?.map((foods, id) => (
        <div className="col-12 col-sm-6 col-md-6 col-xl-3  text-center my-4" key={id}>
          <img src={foods.image} className="rounded w-100 image-foods" alt={foods.name} />
          <div className="m-2">
            <h1 className="h4">{foods.name}</h1>
            <div className="d-flex justify-content-center">
              <p className="h5 mr-2">S/.</p>
              <p className="h5 font-weight-normal">{foods.price}</p>
            </div>
          </div>
          <button
            type="button"
            className="btn btn-warning btn-block"
            onClick={() => removeCart(foods)}>Remover</button>
        </div>
      ))
      :
      <div className="col-sm-12 text-center ">
        <p className="h4">No se encontro recetas</p>
      </div>
  )

  return (
    <div className="container mt-4">
      <div className="row">
        <h1 className="mx-auto font-weight-bold mb-4">Carrito de Compras</h1>
        <p>Hecho con React JSX</p>
      </div>
      <div className="row mb-4">
        <div className="col-sm-12">
          <div className="d-flex-custom">
            <button
              className="btn btn-warning"
              onClick={() => navigationTo(PAGE_foodsS)}
            >
              Ver comidas agregados
            </button>

            <button
              className="btn btn-danger d-flex align-items-center px-4"
              onClick={() => navigationTo(PAGE_CART)}>
              <div className="m-auto">
                <span className="mr-3">Ir a carrito</span>
              <span className="mr-3">({cart.length})</span>
              <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-cart" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm7 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
                
              </svg>
              </div>
            </button>
          </div>
        </div>

      </div>
      <div className="row">

        {page === PAGE_CART && renderCart()}
        {page === PAGE_foodsS && renderfoodss()}

      </div>
    </div>
  );
}

export default App;
