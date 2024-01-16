import React from "react";

function SingleProduct({
  Productdata,
  Productdata: {
    id,
    title,
    description,
    price,
    rating,
    stock,
    brand,
    category,
    thumbnail,
  },
  captureEdit,
  changeEditState,
  showReportdata,
}) {
  return (
    <tr key={id}>
      <td>{id}</td>
      <td>{title}</td>
      <td>{description}</td>
      <td>{price}</td>
      <td>{rating}</td>
      <td>{stock}</td>
      <td>{brand}</td>
      <td>{category}</td>
      <td>
        <img src={thumbnail} width="20%" height="20%"></img>
      </td>
      <td>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            captureEdit(Productdata);
            changeEditState(Productdata);
          }}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          className="btn btn-success btn-sm"
          onClick={() => {
            showReportdata(Productdata);  
            captureEdit(Productdata);          
          }}
        >
          Report
        </button>
      </td>
    </tr>
  )
}

export default SingleProduct;
