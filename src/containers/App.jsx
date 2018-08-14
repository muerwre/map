import React from 'react';
import {Map} from "$containers/Map";

export class App extends React.Component {
  startDrawing = () => {
    setMode('draw');
  };

  render(){
    return (
      <div onClick={this.startDrawing}>

        <Map />

      </div>
    )
  }
};
