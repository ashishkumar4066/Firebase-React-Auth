import React, { Component } from "react";
import { firestore } from "../config/firebase-config";
class CreateGuideModal extends Component {
  state = {
    title: "",
    content: "",
  };
  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onCreateGuide = (e) => {
    e.preventDefault();
    firestore
      .collection("guides")
      .add({ title: this.state.title, content: this.state.content });
    this.props.onFetchData();
  };
  render() {
    return (
      <div>
        <div id="modal-create" className="modal">
          <div className="modal-content">
            <h4>Create Guide</h4>
            <br />
            <form id="create-form" onSubmit={(e) => this.onCreateGuide(e)}>
              <div className="input-field">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={this.state.title}
                  onChange={(e) => this.onChangeHandler(e)}
                  required
                />
                <label htmlFor="title">Guide Title</label>
              </div>
              <div className="input-field">
                <textarea
                  id="content"
                  className="materialize-textarea"
                  name="content"
                  value={this.state.content}
                  onChange={(e) => this.onChangeHandler(e)}
                  required
                ></textarea>
                <label htmlFor="content">Guide Content</label>
              </div>
              <button className="btn yellow darken-2 z-depth-0">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateGuideModal;
