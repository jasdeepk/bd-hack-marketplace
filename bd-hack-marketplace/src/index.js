import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

var data = 
  [
    {
        "did": "1",
        "name": "Design 1",
        "img": "picture/url/here",
        "pid": "1",
        "rooomtype": "Bathroom",
        "startdeadline": "2016-10-28",
        "enddeadline": "2016-12-23",
        "postdate": "2016-09-17",
        "location": "Vancouver, BC",
        "materials": [{"mid": "1", "name": "carpet flooring"},{"mid": "2", "name": "wood shelving"}],
        "sqrft": "20",
        "desc": "This project is awesome! I want to hire someone to fix up my bathroom.",
    },
    {
        "did": "2",
        "name": "Design 2",
        "img": "picture/url/here",
        "pid": "1",
        "rooomtype": "Bedroom",
        "startdeadline": "2016-10-29",
        "enddeadline": "2016-12-24",
        "postdate": "2016-09-18",
        "location": "Richmond, BC",
        "materials": [{"mid": "1", "name": "carpet flooring"},{"mid": "2", "name": "wood shelving"}],
        "sqrft": "20",
        "desc": "This project is awesome! I want to hire someone to fix up my bedroom.",
    },
    {
        "did": "3",
        "name": "Design 3",
        "img": "picture/url/here",
        "pid": "2",
        "rooomtype": "Master Bedroom",
        "startdeadline": "2016-11-28",
        "enddeadline": "2017-01-23",
        "postdate": "2016-10-11",
        "location": "Tssawasawasawassen, BC",
        "materials": [{"mid": "1", "name": "carpet flooring"},{"mid": "2", "name": "wood shelving"}],
        "sqrft": "20",
        "desc": "This project is awesome! I want to hire someone to fix up my bathroom.",
    },
    {
        "did": "4",
        "name": "Design 4",
        "img": "picture/url/here",
        "pid": "2",
        "rooomtype": "Garage",
        "startdeadline": "2016-03-28",
        "enddeadline": "2017-06-24",
        "postdate": "2016-02-17",
        "location": "Surrey, BC",
        "materials": [{"mid": "1", "name": "carpet flooring", "category": "flooring", "quantity": "100"},{"mid": "2", "name": "wood shelving", "category": "shelving", "quantity": "10"}],
        "sqrft": "20",
        "desc": "This project is awesome! I want to hire someone to fix up my garage.",
    },
];

// TODO: Needs to be from contractor click on marketplace
var did = 3;
var design = data[did];

var DesignView = React.createClass({
	// getInitialState: function() {
	//     return {data: []};
	// },
	// componentDidMount: function() {
	//     $.ajax({
	//       url: this.props.url,
	//       dataType: 'json',
	//       cache: false,
	//       success: function(data) {
	//         this.setState({data: data});
	//       }.bind(this),
	//       error: function(xhr, status, err) {
	//         console.error(this.props.url, status, err.toString());
	//       }.bind(this)
	//     });
	// },
	render: function() {
	    return (
	      <div className="designView">
		      <h1>Design View</h1>
		      <div className="row">
		      	<PhotoForm />
		      	<ProductList data={this.props.data} />
		      </div>
		      <div className="row">
		      	<div className 
		      	<DescForm />
		      </div>
	      </div>
	    );
  	}
});

var PhotoForm = React.createClass({
	render: function() {
	    return (
	      <div className="photoForm">
	      	<Photo>URL</Photo>
	      </div>
	    );
  	}
});

var Photo = React.createClass({
	render: function() {
	    return (
	      <div className="photo">
	      </div>
	    );
  	}
});

var ProductList = React.createClass({
	render: function() {
		var productNodes = this.props.data.materials.map(function(product) {
			console.log(product);
			return (
				<Product key={product.mid} category={product.category} quantity={product.quantity}>
				{product.title}
				</Product>
			);
		})
	    return (
	      <div className="productList">
	        <h3>Design Products</h3>
	        {productNodes}
	      </div>
	    );
  	}
});

var Product = React.createClass({
	render: function() {
	    return (
	      <div className="product">
	      	<h6 className="productTitle">{this.props.title}</h6>
	        <ul className ="list-group">
	        	<li className="list-group-item productCategory">{this.props.category}</li>
	        	<li className="list-group-item productQuantity">{this.props.quantity}</li>
	        </ul>	
	      </div>
	    );
  	}
});

var DescForm = React.createClass({
	render: function() {
	    return (
	      <div className="descForm">
	      	<textarea rows="4" cols="50" name="comment" form="usrform">
	      	Enter the description for your design here</textarea>
	      </div>
	    );
  	}
});

ReactDOM.render(
  <DesignView data={design}/>,
  document.getElementById('designview')
);	
