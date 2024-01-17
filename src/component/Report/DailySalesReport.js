import React from "react";

export default function DailySalesReport({ Productforrpt, handleChange }) {
  // Fetch data from local storage
  const getSalesdataFromLocalStorage = () => {
    let data = localStorage.getItem("Salesdata");
    if (data !== undefined) {
      return JSON.parse(data);
    }
  };

  // PATCH request; calls handleProductUpdate to push changes to the page
  function LoadReportData() {
    let savedata = getSalesdataFromLocalStorage();
    if (savedata != null && savedata.length > 0) {
      let filtered = savedata.filter(
        (Product) => Product.id === Productforrpt.id
      );
      return filtered;
    } else {
      return null;
    }
  }

  return (
    <div className="card" >
      <div className="card-body">
        <h5 className="card-title">Daily Sales Data</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary"></h6>
        <div className="card-text">
          <div className="container">
            {LoadReportData().length > 0 ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Sale Qty</th>
                    <th scope="col">Sale Date</th>
                  </tr>
                </thead>
                <tbody>
                  {LoadReportData().map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.title}</td>
                      <td>{item.saleqty}</td>
                      <td>{item.salesdate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h3>No Data found</h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
