var designUrl = "/api/design/" + localStorage.selectedDesignId;

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
  },
	render: function() {
	    return (
	      <div className="designview">
	      <div className="headerMain">
            <a href="profile.html" style={{cursor:'pointer'}} className="headerContractorName">{localStorage.name}</a>
            <a style={{cursor:'pointer'}} className="headerSignOut">Sign Out</a>
          </div>
		      <DesignTitle data={this.state.data} />
		      <div className="row">
		      	<div className="col-md-6">
		      		<div className="row">
		      			<PhotoForm data={this.state.data}/>
		      		</div>
		      	</div>
		      	<div className="col-md-6">
		      		<div className="row">
		      			<ProductList data={this.state.data} />
		      		</div>
		      		<div className="row">
			      		<DescBox data={this.state.data} />
			      	</div>
		      		<div className="row" style={{marginTop: 1 + 'em'}}>
			      		<button className="btn-lg">Submit pitch</button>
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
	componentDidMount: function() {
	    var total = $('select.recommender option:selected').length;
		console.log(total);
	},
	render: function() {
		// TODO: Need design to come from marketplace select
		var productNodes;
		if (this.props.data != null && this.props.data.materials) {
			productNodes = this.props.data.materials.map(function(product) {
				return (
					<Product key={product.mid} category={product.category} quantity={product.quantity} name={product.name}>
					</Product>
				);
			})
		}
	    return (
	      <div className="productList">
	        <table className ="table">
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
	render: function() {
	    return (
	      	<tr>
	      		<td className="productName">
					<div className="recommendedProduct">
						<Recommended key={this.props.mid} category={this.props.category} quantity={this.props.quantity}/>
					</div>
				</td>
	      		<td className="productCategory">{this.props.category}</td>
	      		<td className="productQuantity">{this.props.quantity}</td>
	      		<td><button onClick={updateTotal}>Button</button></td>
	      	</tr>
	    );
  	}
});

var quantity;
var productTotal;

var Recommended = React.createClass({
	loadSimilarProducts: function() {
		$.ajax({
	      url: "https://api.builddirect.io/products/?query=" + this.props.category,
	      headers: {
	      	"Ocp-Apim-Subscription-Key": "f328d70c34574b408d3c8108fcae5ad9"
		  },
	      dataType: 'json',
	      cache: false,
	      success: function(data) {
			quantity = this.props.quantity;
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
	    this.loadSimilarProducts();
	    $('.recommender').select2({ width: '100%' });
	    // setInterval(this.loadDesignInfoFromServer, this.props.pollInterval);
  },
	render: function() {
		var productNodes;
		if ((this.state.data.data != null) && (quantity != null)){
			//TODO: POST new product to use
			productNodes = this.state.data.data.products.map(function(product) {
				productTotal = (Number(product.price)*Number(quantity)).toFixed(2);
				return (
					<option value={productTotal}>{product.title} (${Number(product.price).toFixed(2)}/{product.priceUnit} x {quantity} unit(s) = Total: ${productTotal})</option>
				);
			})
		}
		return (
			<select className="recommender">
				{productNodes}
			</select>
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
  <DesignView url={designUrl} pollInterval={2000}/>,
  document.getElementById('designview')
);	

function updateTotal() {
	var total = $('select.recommender option:selected').each(function() ;
	console.log(total);
};

setTimeout(
  function() {updateTotal();
  }, 1600);
