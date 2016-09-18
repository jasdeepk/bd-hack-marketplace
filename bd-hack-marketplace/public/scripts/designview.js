var designUrl = "/api/design/" + localStorage.selectedDesignId;

var grandTotal;

function updateTotal() {
	grandTotal=0;
	$('select.recommender option:selected').each(function() {
		grandTotal += parseInt($(this).val());
		return grandTotal;
	});
	$("#productgrandtotal").remove();
	$("#grandtotal").append("<div id='productgrandtotal'>Total: $" + grandTotal.toFixed(2) + "</div>")
}

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
  	updateProduct: function(data) {
		var selectedMaterials = $('.recommender').find(":selected");
		
		var mids = data.materials.map(function(product) {
			return product.mid;
		})

		var joinedMaterialsAndMids = [];
		for (var i = selectedMaterials.length - 1; i >= 0; i--) {
			var material = selectedMaterials[i].innerText.substr(0, selectedMaterials[i].innerText.indexOf('('));
			joinedMaterialsAndMids.push({mid: mids[i], material:  material.trim()});
		};
		$.ajax({
	      url: designUrl,
	      dataType: 'json',
	      type: 'PUT',
      	  data: {joinedMaterialsAndMids:joinedMaterialsAndMids},
	      cache: false,
	      success: function(data) {
	      },
	      error: function(xhr, status, err) {
	        console.error(this.props.url, status, err.toString());
	      }
	    });
	},
	render: function() {
	    return (
	      <div className="container designview">
		      
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
		      			<div className="col-md-6">
		      				<h4><div id="grandtotal"></div></h4>
	      				</div>
	      				<div className="col-md-6">
	      					<div className="col-md-offset-8 col-md-4">
				      			<h4><button className="btn productpost" onClick={() => {this.updateProduct(this.state.data);updateTotal();}} >Update</button></h4>
	      					</div>
	      				</div>
		      		</div>
      				<div className="row">
      					<div className="col-md-12">
	      					<div className="alert alert-success collapse">
	      						<a href="#" className="close" data-hide="alert" aria-label="close">&times;</a>
						  		<strong>Design products have been updated!</strong>
							</div>
						</div>
					</div>
		      		<div className="row">
			      		<DescBox data={this.state.data} />
			      	</div>
		      		<div className="row" style={{marginTop: 1 + 'em'}}>
			      		<button className="btn" onClick={()=> {window.location = "pitch.html"}}>Submit pitch</button>
			      	</div>
		      	</div>
		      </div>
	      </div>
	    );
  	}
});

$(document).ready(function(){
    $('button.productpost').click(function(){
        $('.alert').show();
    }) 
});

$(function(){
    $("[data-hide]").on("click", function(){
        $(this).closest("." + $(this).attr("data-hide")).hide();
    });
});

var DesignTitle = React.createClass({
	render: function() {
		var title;
		if (this.props.data != null) {
			title = 
				<div className="row">
					<div className="col-md-12">
						<h1 key={this.props.data.did}>{this.props.data.name}</h1>
						<div className="row">
							<div className="col-mid-offset-1 col-md-6">
								<h5>Posted on: {this.props.data.postdate}</h5>
								<h5>Work Period: {this.props.data.startdeadline} to {this.props.data.enddeadline}</h5>
							</div>
						</div>
					</div>
				</div>
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
						<Recommended key={this.props.mid} name={this.props.name} category={this.props.category} quantity={this.props.quantity}/>
					</div>
				</td>
	      		<td className="productCategory">{this.props.category}</td>
	      		<td className="productQuantity">{this.props.quantity}</td>
	      	</tr>
	    );
  	}
});

var quantity;
var name;
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
			name = this.props.name;
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
	    $('.recommender').select2({ width: '25em'});
	    // setInterval(this.loadDesignInfoFromServer, this.props.pollInterval);
  },
	render: function() {
		var productNodes;
		if ((this.state.data.data != null) && (quantity != null)){
			//TODO: POST new product to use
			productNodes = this.state.data.data.products.map(function(product) {
				productTotal = (Number(product.price)*Number(quantity)).toFixed(2);
				if (name === product.title) {
					return (
						<option key={product.skuNumber} name={product.title} value={productTotal} selected>{product.title} (${Number(product.price).toFixed(2)}/{product.priceUnit} x {quantity} unit(s) = Total: ${productTotal})</option>
					);
				}
				else {
					return (
						<option key={product.skuNumber} value={productTotal}>{product.title} (${Number(product.price).toFixed(2)}/{product.priceUnit} x {quantity} unit(s) = Total: ${productTotal})</option>
					);
				}
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


setTimeout(
  function() {updateTotal();
  }, 2000);
