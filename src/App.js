import React, { Component } from "react";
import Header from "./Header.js";
import NotesList from "./NotesList.js";

class App extends Component {
  state = {
    notes: [
      {
        id: Date.now(),
        title: "",
        description: "",
        doesMatchSearch: true
      }
    ],
    searchText: ""
  };
  addNote = () => {
    const newNote = {
      id: Date.now(),
      title: "",
      description: "",
      doesMatchSearch: true
    };
    const newNotes = [newNote, ...this.state.notes];
    this.setState({ notes: newNotes });
  };
  onType = (editMeId, updatedKey, updatedValue) => {
    const updateIdMatch = (note) => {
      if (note.id !== editMeId) {
        return note;
      } else {
        if (updatedKey === "title") {
          return {
            ...note,
            title: updatedValue
          };
        } else {
          return {
            ...note,
            description: updatedValue
          };
        }
      }
    };
    const updatedNotes = this.state.notes.map(updateIdMatch);
    this.setState({ notes: updatedNotes });
  };
  onSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const updatedNotes = this.state.notes.map((note) => {
      if (!searchText) {
        /*If the search field is empty then the doesMatchSearch is true for each note */
        return {
          ...note,
          doesMatchSearch: true
        };
      } else {
        const title = note.title.toLowerCase();
        const description = note.description.toLocaleLowerCase();
        const titleMatch = title.includes(searchText);
        const descriptionMatch = description.includes(searchText);
        const hasMatch = titleMatch || descriptionMatch;
        return {
          ...note,
          doesMatchSearch: hasMatch
        };
      }
    });
    this.setState({
      searchText: searchText,
      notes: updatedNotes
    });
  };
  remove = (deleteMeId) => {
    const notIdMatch = (note) => note.id !== deleteMeId;
    const updatedNotes = this.state.notes.filter(notIdMatch);
    this.setState({ notes: updatedNotes });
  };
  cocmponentDidUpdate() {
    const stringifiedNotes = JSON.stringify(this.state.notes);
    localStorage.setItem("savedNotes", stringifiedNotes);
  }
  componentDidMount() {
    const stringifiedNotes = localStorage.getItem("savedNotes");
    if (stringifiedNotes) {
      const savedNotes = JSON.parse(stringifiedNotes);
      this.setState({ notes: savedNotes });
    }
  }
  render() {
    return (
      <div>
        <Header
          searchText={this.state.searchText}
          addNote={this.addNote}
          onSearch={this.onSearch}
        />
        <NotesList
          notes={this.state.notes}
          onType={this.onType}
          remove={this.remove}
        />
      </div>
    );
  }
}

export default App;
