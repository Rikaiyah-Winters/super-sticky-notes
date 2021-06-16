import React, { Component } from "react";

class Note extends Component {
  updateTitle = (e) => {
    const updatedValue = e.target.value;
    const editMeId = this.props.note.id;
    this.props.onType(editMeId, "title", updatedValue);
  };
  updateDescription = (e) => {
    const updatedValue = e.target.value;
    const editMeId = this.props.note.id;
    this.props.onType(editMeId, "description", updatedValue);
  };
  clickDelete = () => this.props.remove(this.props.note.id);
  render() {
    return (
      <li className="note">
        <input
          value={this.props.note.title}
          className="note__title"
          type="text"
          placeholder="Title"
          onChange={this.updateTitle}
        />
        <textarea
          value={this.props.note.description}
          className="note__description"
          placeholder="Description..."
          onChange={this.updateDescription}
        />
        <span onClick={this.clickDelete} className="note__delete">
          X
        </span>
      </li>
    );
  }
}

export default Note;
