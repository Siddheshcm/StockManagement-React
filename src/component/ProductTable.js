import React, { useEffect, useState } from "react";
import ProductList from "./ProductList";
import "./Pagination/pagination.scss";

const API = "https://dummyjson.com/products";

const ProductTable = () => {
  const [productdata, setProducts] = useState([]);

  const fetchUsers = async (url) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.products.length > 0) {
        setProducts(data.products);
        saveStateToLocalStorage(data.products);
      }     
    } catch (e) {
      console.error(e);
    }
  };

 // save data to localStorage
 const saveStateToLocalStorage = (data) => {  
  localStorage.setItem(
      "state",
      JSON.stringify(data)
  );
};

// Fetch data from local storage
const getStateFromLocalStorage = () => {
  let data = localStorage.getItem("state");
  if (data !== undefined) {
      return JSON.parse(data);
  }
};

  useEffect(() => {
    let saveddata = getStateFromLocalStorage()
    console.log(saveddata)
   if (saveddata != null && saveddata.length > 0) {    
    setProducts(saveddata);
   } else {
    console.log(saveddata)
    fetchUsers(API);
   }   
  }, []);

  // update customers on page after edit
  function onUpdateProduct(updatedProduct) {
    const updatedProducts = productdata.map((product) => {
      if (product.id === updatedProduct.id) {        
        product.stock = product.stock - updatedProduct.saleqty 
        return product;
      } else {
        return product;
      }
    });
    setProducts(updatedProducts);
    saveStateToLocalStorage(updatedProducts);
  }
  return (
    <>
      <div className="container">
        <ProductList
          productdata={productdata}
          onUpdateProduct={onUpdateProduct}
        ></ProductList>
      </div>
    </>
  );
};
export default ProductTable;
