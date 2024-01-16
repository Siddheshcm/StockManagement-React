import React, { Component } from "react";

export default class SaleEntryForm extends Component {
  constructor(props) {
    super(props);
    //   this.state = {
    //     isGoing: true,
    //     numberOfGuests: 2
    //   };

    this.handleInputChange = this.handleInputChange.bind(this);
  }
// PATCH request; calls handleCustomerUpdate to push changes to the page
 handleEditForm(e) {
    e.preventDefault();
    // fetch(`http://localhost:9292/customers/${id}`, {
    //     method: "PATCH",
    //     headers: {
    //         "Content-Type" : "application/json"
    //     },
    //     body: JSON.stringify(editForm),
    // })
    //     .then(resp => resp.json())
    //     .then(updatedCustomer => {
    //         handleCustomerUpdate(updatedCustomer)})

}
  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Sales Entry Form</h3>
        <form className="row gy-2 gx-3 align-items-center" onSubmit={this.handleEditForm}>
          <div className="col-auto">
            <label className="visually-hidden" htmlFor="autoSizingInput">
              Code
            </label>
            <input
              type="text"
              className="form-control"
              value={this.props.editForm.id}
              id="autoSizingInput"
              placeholder="Code" onChange={this.handleInputChange}
              disabled
            />
          </div>
          <div className="col-auto">
            <label className="visually-hidden" htmlFor="autoSizingInputGroup">
              Title
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="autoSizingInputGroup"
                placeholder="Title" onChange={this.handleInputChange}
                value={this.props.editForm.title}
                disabled
              />
            </div>
          </div>
          <div className="col-auto">
            <label className="visually-hidden" htmlFor="autoSizingSelect">
              Quantity
            </label>
            <div className="input-group">
              <input
                type="number"
                className="form-control"
                id="autoSizingInputGroup"
                placeholder="Quantity" onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col-auto">
            <label className="visually-hidden" htmlFor="autoSizingInputGroup">
              Sale Date
            </label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="autoSizingInputGroup" 
                placeholder="Date" onChange={this.handleInputChange}
              />
            </div>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}
