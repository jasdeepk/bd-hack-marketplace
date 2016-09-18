
// TODO: Needs to be from contractor click on marketplace
var did = 3;
// var design = data[did];

var DesignView = React.createClass({
	
	loadDesignInfoFromServer: function() {
	    $.ajax({
	      url: this.props.url,
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
	        this.setState({data: data});
	      }.bind(this),
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }.bind(this)
	    });
	},
	getInitialState: function() {
	    return {data: []};
	},
	componentDidMount: function() {
    this.loadDesignInfoFromServer();
    // setInterval(this.loadDesignInfoFromServer, this.props.pollInterval);
    document.getElementById("headerName").innerHTML = localStorage.getItem("name");
  },
	render: function() {
	    return (
	      <div className="designview">
		      <DesignTitle data={this.state.data[did]} />
		      <div className="row">
		      	<div className="col-md-6">
		      		<div className="row">
		      			<PhotoForm data={this.state.data[did]}/>
		      		</div>
		      		<div className="row" style={{marginTop: 1 + 'em'}}>
			      		<button className="btn-lg">Submit pitch</button>
			      	</div>
		      	</div>
		      	<div className="col-md-6">
		      		<div className="row">
		      			<ProductList data={this.state.data[did]} />
		      		</div>
		      		<div className="row">
			      		<DescBox data={this.state.data[did]} />
			      	</div>
		      	</div>
		      </div>
	      </div>
	    );
  	}
});

var DesignTitle = React.createClass({
	render: function() {
		var title;
		if (this.props.data != null) {
			title = <h1 key={this.props.data.did}>{this.props.data.name}
			</h1>
		}
	    return (
	      <div className="photoForm">
	      {title}
	      </div>
	    );
  	}
})

var PhotoForm = React.createClass({
	render: function() {
		var image;
		if (this.props.data != null) {
			image = <Photo key={this.props.data.did} img={this.props.data.img}>
			</Photo>
		}
	    return (
	      <div className="photoForm">
	      {image}
	      </div>
	    );
  	}
});

var Photo = React.createClass({
	render: function() {
	    return (
	      	<img src={this.props.img} className="img-thumbnail" height="500" width="500"/>
	    );
  	}
});

var ProductList = React.createClass({
	render: function() {
		// TODO: Need design to come from marketplace select
		var productNodes;
		if (this.props.data != null) {
			productNodes = this.props.data.materials.map(function(product) {
				return (
					<Product key={product.mid} category={product.category} quantity={product.quantity} name={product.name}>
					</Product>
				);
			})
		}
	    return (
	      <div className="productList">
	        <table className ="table table-hover table-inverse">
	        	<thead>
				    <tr>
				      <th>Product</th>
				      <th>Category</th>
				      <th>Quantity</th>
				    </tr>
				</thead>
	        	<tbody>
        			{productNodes}
        		</tbody>
	        </table>	
	      </div>
	    );
  	}
});

var Product = React.createClass({
	componentDidMount: function(){
    	$('.recommender').select2({ width: '100%' });
    },
	render: function() {
	    return (
	      	<tr>
	      		<td className="productName">
					<select className="recommender" multiple="multiple">
					  <option value="AL">Alabama</option>
					  <option value="WY">Wyoming</option>
					</select>
				</td>
	      		<td className="productCategory">{this.props.category}</td>
	      		<td className="productQuantity">{this.props.quantity}</td>
	      	</tr>
	    );
  	}
});

var DescBox = React.createClass({
	render: function() {
		var desc;
		if (this.props.data != null) {
			desc = <Desc key={this.props.data.did} desc={this.props.data.desc}>
			</Desc>
		}
	    return (
	      <div className="descBox">
	      	<h3>Design Description</h3>
	      	{desc}
	      </div>
	    );
  	}
});

var Desc = React.createClass({
	render: function() {
		return (
		  <div className="desc">
	      	<p className="designDescription">{this.props.desc}</p>
	      </div>
	    );
	}
});

ReactDOM.render(
  // <DesignView data={design}/>,
  <DesignView url="/api/design" pollInterval={2000}/>,
  document.getElementById('designview')
);	
