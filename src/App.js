import React, { Component } from 'react';
import Drag from './Drag';
import Drop from './Drop';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        {id: 1},
        {id: 2},
        {id: 3}
      ],
      centers: []
    }
  }

  end (id, center) {
    console.log(id)
    let {centers} = this.state;
    console.log(this.state);
    let calres = centers.filter(i => i.id === id).map(item => {
      let [x1, y1] = center;
      let [x2, y2] = item.center;
      return {
        ...item,
        space: Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)).toFixed(1)
      }
    }).filter(i => Number(i.space) < 100).length;
    console.log(calres);
  }
  sendCenter (id, center) {
    this.setState({
      centers: [
        ...this.state.centers,
        {
          id,
          center
        }
      ]
    })
  }
  render() {
    let {list} = this.state;
    return (
      <div className="App">
        {
          list.map(item => <Drag id={item.id} end={this.end.bind(this)} />)
        }
        <Drop check={this} sendCenter={this.sendCenter.bind(this)} id={3}/>
      </div>
    );
  }
}

export default App;
