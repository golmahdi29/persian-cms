import React, { useState } from 'react'
import NewProduct from '../NewProduct/NewProduct'
import ProductTable from '../ProductTable/ProductTable'

export default function Products() {

  const [allProduct, setAllProduct] = useState([])

  const getAllProduct = () => {
    fetch('http://localhost:4000/api/products/')
      .then(datas => datas.json())
      .then(data => setAllProduct(data.reverse()))
      .catch(err => console.log(err))
}

  return (
    <>
      <NewProduct getAllProduct={getAllProduct} />
      <ProductTable getAllProduct={getAllProduct} allProduct={allProduct} />
    </>
  )
}
