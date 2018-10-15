import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      currentX: 3,
      currentY: 3,

      prevX: 1,
      prevY: 1,

      areaX: 1,
      areaY: 1,

      map:{}
    }
    this.buildMap = this.buildMap.bind(this)
    this.move = this.move.bind(this)
  }
  buildMap(){
    console.log('built')
    let map = [];
    let currRow = [];
    for(let row = this.state.areaY * 5, col = -4 + (this.state.areaX * 5); row > -5 + (this.state.areaY * 5); col++){
      if(col === 5 * this.state.areaX){
        currRow.push({x: col, y: row});
        map.push(currRow)

        currRow = []

        col = -5 + (this.state.areaX * 5);
        row--
      } else {
        console.log('hit')
        currRow.push({x: col, y: row})
      }
    }
    this.setState({map: map})
  }

  move(e){
    if(e.key === 'ArrowRight'){
      this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentX: this.state.currentX + 1})

      if(this.state.currentX + 1 > this.state.areaX * 5) {
        this.setState({areaX: this.state.areaX + 1})
        this.buildMap()
        
      }
    } else if(e.key === 'ArrowLeft'){
      this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentX: this.state.currentX - 1})
      if(this.state.currentX -1 < this.state.areaX / (5 * this.state.areaX)) {
        this.setState({areaX: this.state.areaX - 1})
        this.buildMap()

      }
    } else if(e.key === 'ArrowUp'){
      this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentY: this.state.currentY + 1})
      if(this.state.currentY + 1 > this.state.areaY * 5) {
        this.setState({areaY: this.state.areaY + 1})
        this.buildMap()
        
      }
    } else if(e.key === 'ArrowDown'){
      this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentY: this.state.currentY - 1})
      if(this.state.currentY -1 < this.state.areaY / (5 * this.state.areaY)) {
        this.setState({areaY: this.state.areaY - 1})
        this.buildMap()
        
      }
    }
    
    // switch(e.key){
    //   case 'ArrowUp':
    //     return this.setState(this.state.currentX === 5 
    //       ? {prevX: this.state.currentX, prevY: this.state.currentY, currentX: this.state.currentX + 1, areaX: this.state.areaX + 1} 
    //       : {prevX: this.state.currentX, prevY: this.state.currentY, currentX: this.state.currentX + 1});
    //   case 'ArrowDown':
    //     return this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentX: this.state.currentX- 1});
    //   case 'ArrowLeft':
    //     return this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentY: this.state.currentY - 1});
    //   case 'ArrowRight':
    //     return this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentY: this.state.currentY + 1});
    //   default: console.log('missed')
    // }
  }

  render() {
    console.log(this.state)
    return (
      <div className="App" onKeyDown={this.move}>
        <button onClick={this.buildMap} ></button>
        {this.state.map[0] && 
          this.state.map.map((row, r) => {
            return (
              <div className='row'>
              {row.map((spot, j) => {
                return (
                  <div style ={spot.x === this.state.currentX && spot.y === this.state.currentY ? {backgroundColor: 'blue', height: '30px', width: '30px', border: 'solid black 1px'} :{height: '30px', width: '30px', border: 'solid black 1px'}}>
                    {spot.x + ':' + spot.y}
                  </div>
                )
              })}

              </div>
            )
          })
        }
      </div>
    );
  }
}

export default App;
