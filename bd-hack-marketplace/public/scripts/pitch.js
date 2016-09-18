var Pitch = React.createClass({
	loadDesignsFromServer: function(){
		$.ajax({
      		url: this.props.url,
      		dataType: 'json',
      		cache: false,
      		success: function(data) {
        	this.setState({designData: data[1]});
      		}.bind(this),
      		
      		error: function(xhr, status, err) {
        	console.error(this.props.url, status, err.toString());
     		}.bind(this)
    	});
	},
	getInitialState: function() {
		return {designData: []};
	},
	componentDidMount: function() {
		this.loadDesignsFromServer();
	},
	render:function() {
		console.log(this.state.designData);
		var ddata = this.state.designData[1];
		console.log(ddata);
		return (	
			 <div>
			 	<li className="list-group-item" key={this.state.designData.did}>
            <div className="media">
              <div className="media-left">
                <img className="media-object" src={this.state.designData.img} width="200" height="200"></img>
              </div>
              <div className="media-body">
                <br /> 
                <h2 className="media-heading">{this.state.designData.name}</h2>
                <h4 className="media-heading">Room Type: {this.state.designData.rooomtype}</h4>
                <h4 className="media-heading">Starts on: {this.state.designData.startdeadline} Ends on: {this.state.designData.enddeadline}</h4>
                <h4 className="media-heading">{this.state.designData.sqrft} Sqft</h4>
              </div>
            </div>
          </li>
			 	<input type="text" /> <br/>
			   	<input type="text" />
				<button> Buy </button>
			 </div>
		);
	}
});

ReactDOM.render(
	<Pitch url="/api/design" />, 
	document.getElementById('pitch')
);