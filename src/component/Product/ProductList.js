import React, { useState, useMemo } from "react";
import SingleProduct from "../Product/SingleProduct";
import Pagination from "../Pagination/Pagination";
import "../Pagination/pagination.scss";
import MsgBox from "../Utilities/MsgBox";
import SaleEntryFormFunc from "../SaleEntry/SaleEntryFormFunc";
import DailySalesReport from "../Report/DailySalesReport";

// import EditProduct from './EditProduct'
let PageSize = 5;
function ProductList({ productdata, onUpdateProduct }) {
  // state for conditional render of edit form
  const [isEditing, setIsEditing] = useState(false);
  const [showReport, setShowReport] = useState(false);
  // state for edit form inputs
  const [editForm, setEditForm] = useState({
    id: "",
    title: "",
    desc: "",
    price: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
  });

  const [msgProps, setmsgProps] = useState(null);

  const ShowMsg = (msgText, Msgtype) => {
    setmsgProps({
      msgText: msgText,
      Msgtype: Msgtype,
    });
    setTimeout(() => {
      setmsgProps(null);
    }, 2000);
  };
  // console.log("test1")
  // console.log(productdata)
  // console.log("test2")
  // when PATCH request happens; auto-hides the form, pushes changes to display
  function handleProductUpdate(updatedProduct) {
    setIsEditing(false);
    onUpdateProduct(updatedProduct);
  }

  // capture user input in edit form inputs
  function handleChange(e) {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  }

  // needed logic for conditional rendering of the form - shows the Product you want when you want them, and hides it when you don't
  function changeEditState(Product) {
    if (Product.id === editForm.id) {
      setIsEditing((isEditing) => !isEditing); // hides the form
      setShowReport((showReport) => isEditing);
    } else if (isEditing === false) {
      setIsEditing((isEditing) => !isEditing); // shows the form
      setShowReport((showReport) => isEditing);
    }
  }

  //capture the Product you wish to edit, set to state
  function captureEdit(clickedProduct) {
    let filtered = productdata.filter(
      (Product) => Product.id === clickedProduct.id
    );
    setEditForm(filtered[0]);
  }
  function showReportdata(Product) {
    if (Product.id === editForm.id) {
      setShowReport((showReport) => !showReport); // hides the form
      setIsEditing((isEditing) => showReport);
    } else if (showReport === false) {
      setShowReport((showReport) => !showReport); // shows the form
      setIsEditing((isEditing) => showReport);
    }
  }
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    if (Array.isArray(productdata)) {
      return productdata.slice(firstPageIndex, lastPageIndex);
    } else {
      return null;
    }
  }, [currentPage, productdata]);

  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Desc</th>
              <th scope="col">Price</th>
              <th scope="col">Rating</th>
              <th scope="col">Stock</th>
              <th scope="col">Brand</th>
              <th scope="col">Category</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {currentTableData &&
            Array.isArray(currentTableData) &&
            currentTableData.length > 0
              ? currentTableData.map((product) => (
                  <SingleProduct
                    key={product.id}
                    Productdata={product}
                    captureEdit={captureEdit}
                    changeEditState={changeEditState}
                    showReportdata={showReportdata}
                  />
                ))
              : null}
          </tbody>
        </table>
        {currentTableData &&
        Array.isArray(currentTableData) &&
        currentTableData.length > 0 ? (
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={productdata.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        ) : null}
      </div>
      {isEditing ? (
        <SaleEntryFormFunc
          editForm={editForm}
          handleChange={handleChange}
          handleProductUpdate={handleProductUpdate}
          ShowMsg={ShowMsg}
        />
      ) : null}

      {showReport ? (
        <DailySalesReport
          Productforrpt={editForm}
          handleChange={handleChange}
        />
      ) : null}
      <br />
      <MsgBox alert={msgProps} />
      <br />
      <br />
      <br />
      <br />
      <br />
      <h4>Thank you for visiting</h4>
    </>
  );
}
export default ProductList;
