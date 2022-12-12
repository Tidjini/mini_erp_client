import React from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { collection, getDocs, onSnapshot, doc } from "firebase/firestore";
import { showMessage } from "app/store/actions/fuse";
let changes = 1;

class Car extends React.Component {
  constructor() {
    super();

    this.state = { color: "red" };

    console.log(this);
  }

  changeColor = () => {
    console.log(changes++);
    this.setState({ color: "blue " + changes });
  };
  render() {
    return (
      <div>
        <h2>Hi, I am a {this.state.color}Car!</h2>
        <button type="button" onClick={this.changeColor}>
          Change color
        </button>
      </div>
    );
  }
}

export default Car;
