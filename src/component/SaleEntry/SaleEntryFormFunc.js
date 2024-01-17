import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MsgBox from "../Utilities/MsgBox";

function SaleEntryFormFunc({ editForm, handleProductUpdate, handleChange }) {
  let { id, title } = editForm;
  //const [SalesSubmitted, setSalesSubmitted] = useState({});
  const [formData, setFormData] = useState({ Salesqty: "0", Salesdate: "" });
  const [startDate, setStartDate] = useState(new Date());
  const [msgProps, setmsgProps] = useState({
    msgText: "",
    Msgtype: "success",
    msgBoxDisplay: "visually-hidden",
  });

  // Fetch data from local storage
  const getSalesdataFromLocalStorage = () => {
    let data = localStorage.getItem("Salesdata");
    if (data !== undefined) {
      return JSON.parse(data);
    }
  };

  // save data to localStorage
  const saveSalesdataToLocalStorage = (data) => {
    localStorage.setItem("Salesdata", JSON.stringify(data));
  };

  // PATCH request; calls handleProductUpdate to push changes to the page
  function handleEditForm(e) {
    e.preventDefault();

    if (formData.Salesqty <= 0) {
      setmsgProps({
        msgText: "Sale Quantity cannot be less than One.",
        Msgtype: "danger",
        msgBoxDisplay: "visually",
      });
      // alert("Sale Quantity cannot be less than Zero.");
      return;
    }
    if (startDate === null) {
      setmsgProps({
        msgText: "Sales Date is Invalid.",
        Msgtype: "danger",
        msgBoxDisplay: "visually",
      });
      //alert("Sales Date is Invalid");
      return;
    }
    let dateObj = new Date(startDate);
    if (dateObj === "Invalid Date") {
      setmsgProps({
        msgText: "Sales Date is Invalid.",
        Msgtype: "danger",
        msgBoxDisplay: "visually",
      });
      //alert("Sales Date is Invalid");
      return;
    }

    let savedata = getSalesdataFromLocalStorage();
    let Salesdata = {
      id: id,
      title: title,
      saleqty: formData.Salesqty,
      salesdate: startDate,
    };
    if (savedata != null && savedata.length > 0) {
      savedata.push(Salesdata);
    } else {
      savedata = [];
      savedata.push(Salesdata);
    }
    saveSalesdataToLocalStorage(savedata);

    handleProductUpdate(Salesdata);

    // fetch(`http://localhost:9292/products/${id}`, {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(editForm),
    // })
    //   .then((resp) => resp.json())
    //   .then((updatedProduct) => {
    //     handleProductUpdate(updatedProduct);
    //   });
    alert("Data saved successfully.")
  }

  //   const handleChangeform = (event) => {
  //     const name = event.target.name;
  //     const value = event.target.value;
  //     setFormData(values => ({...values, [name]: value}))
  //   }
  const handleChangeform = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Sales Entry Form</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary"></h6>
        <div className="card-text">
          <div className="container">
            <form
              className="row gy-2 gx-3 align-items-center"
              onSubmit={handleEditForm}
            >
              <div className="col-auto">
                <label className="visually" htmlFor="autoSizingInput">
                  Code
                </label>
                <input
                  type="text"
                  className="form-control"
                  value={id}
                  id="autoSizingInput"
                  placeholder="Code"
                  onChange={handleChange}
                  disabled
                />
              </div>
              <div className="col-auto">
                <label className="visually" htmlFor="autoSizingInputGroup">
                  Title
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    id="autoSizingInputGroup"
                    placeholder="Title"
                    onChange={handleChange}
                    value={title}
                    disabled
                  />
                </div>
              </div>
              <div className="col-auto">
                <label className="visually" htmlFor="autoSizingSelect">
                  Quantity
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="autoSizingInputGroup"
                    name="Salesqty"
                    placeholder="Quantity"
                    onChange={handleChangeform}
                    value={formData.Salesqty}
                    required
                  />
                </div>
              </div>
              <div className="col-auto">
                <label className="visually" htmlFor="autoSizingInputGroup">
                  Sale Date
                </label>
                <div className="input-group">
                  <DatePicker
                    name="Salesdate"
                    className="form-control"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    required
                  />
                </div>
              </div>
              <div className="col-auto">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
            <br />
            {msgProps.msgText.length > 0 ? (
              <MsgBox
                msgText={msgProps.msgText}
                Msgtype={msgProps.Msgtype}
                Displaynone={msgProps.msgBoxDisplay}
              ></MsgBox>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
export default SaleEntryFormFunc;
