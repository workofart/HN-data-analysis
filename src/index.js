import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import Nav from './components/Nav/Nav';

ReactDOM.render(
<div>
	<Nav />
	<App />
</div>,
  document.getElementById('root')
);
