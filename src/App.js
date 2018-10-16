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
  componentDidUpdate(prevProps, prevState) {
    if(prevState.areaX !== this.state.areaX || prevState.areaY !== this.state.areaY){
      this.buildMap()
    }
  }
  buildMap(){
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
        currRow.push({x: col, y: row})
      }
    }
    this.setState({map: map})
  }

  move(e){
    switch(e.key){
      case 'ArrowRight':
          this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentX: this.state.currentX + 1})
      
          if(this.state.currentX + 1 > this.state.areaX * 5) {
            this.setState({areaX: this.state.areaX + 1})
          }
          break;
      case 'ArrowLeft':
          this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentX: this.state.currentX - 1})

          if(this.state.currentX - 1 < ((this.state.areaX - 1) * 5) + 1) {
            this.setState({areaX: this.state.areaX - 1})
          }
          break;
      case 'ArrowUp':
          this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentY: this.state.currentY + 1})

          if(this.state.currentY + 1 > this.state.areaY * 5) {
            this.setState({areaY: this.state.areaY + 1})
          }
          break;
      case 'ArrowDown':
          this.setState({prevX: this.state.currentX, prevY: this.state.currentY, currentY: this.state.currentY - 1})
          
          if(this.state.currentY - 1 < ((this.state.areaY - 1) * 5) + 1) {
            this.setState({areaY: this.state.areaY - 1})
          }
          break;
      default: return null
    }
  }

  render() {
    return (
      <div className="App" onKeyDown={this.move}>
        <button onClick={this.buildMap} ></button>
        {this.state.map[0] && 
          this.state.map.map((row, r) => {
            return (
              <div className='row'>
              {row.map((spot, j) => {
                return (
                  <div style={{height: '50px', width: '50px', border: 'solid black 1px'}}>
                    {spot.x === this.state.currentX && spot.y === this.state.currentY 
                      ? <img style={{height: '50px', width: '50px'}} src='https://s1.piq.land/2015/07/23/wyTJ7WMj9DgDrDoJ3xYODfGq_400x400.png' alt='hello'/>
                      : <h6>{spot.x + ':' + spot.y}</h6>
                    }
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
