import React, { Component } from 'react';
import Mecano from './components/Mecano'
import './App.css';

export default class App extends Component {
  	render() { 
		return (
			<div className="App">
				{/* other stuff */}
				
				{/* mecano */}
				<Mecano/>		
			</div>
		);
  	}
}

