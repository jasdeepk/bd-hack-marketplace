var Pitch = React.createClass({
	loadDesignsFromServer: function(){
		$.ajax({
      		url: this.props.designUrl,
      		dataType: 'json',
      		cache: false,
      		success: function(data) {
        	this.setState({designData: data[parseInt(localStorage.selectedDesignId)-1]});
          console.log(parseInt(localStorage.selectedDesignId));
      		}.bind(this),
      		
      		error: function(xhr, status, err) {
        	console.error(this.props.designsUrl, status, err.toString());
      	    }.bind(this)
    	});
	},
  loadTransactionsFromServer: function(){
    $.ajax({
          url: this.props.transactionUrl,
          dataType: 'json',
          cache: false,
          success: function(data) {
          this.setState({transactionData: data});
          }.bind(this),
          
          error: function(xhr, status, err) {
          console.error(this.props.transactionUrl, status, err.toString());
            }.bind(this)
      });
  },
	handleCommentSubmit: function(transaction) {
    var transactions = this.state.transactionData;
    console.log(this.state.transactionData);
    transaction.id = Date.now();
    var newTransaction = transactions.concat([transaction]);
    this.setState({data: newTransaction});
    console.log(this.state.data);
    $.ajax({
      url: this.props.transactionUrl,
      dataType: 'json',
      type: 'POST',
      data: transaction,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: transactions});
        console.error(this.props.transactionUrl, status, err.toString());
      }.bind(this)
    });
  },
	getInitialState: function() {
		return {designData: [], transactionData: []};
	},
	componentDidMount: function() {
		this.loadDesignsFromServer();
    this.loadTransactionsFromServer();
    document.getElementById("headerName").innerHTML = localStorage.getItem("name");
	},
	render:function() {

		return (	
			 <div className="pitchDiv">
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
			 	<CommentForm onCommentSubmit={this.handleCommentSubmit} />
			 </div>
		);
	}
});

var CommentForm = React.createClass({
  getInitialState: function() {
    return {msg: '', rate: ''};
  },
  handleMsgChange: function(e) {
    this.setState({msg: e.target.value});
  },
  handleRateChange: function(e) {
    this.setState({rate: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var msg = this.state.msg.trim();
    var rate = this.state.rate.trim();
    var pid = localStorage.pid;
    var did = localStorage.selectedDesignId;
    var name = localStorage.selectedDesignName;
    var image = localStorage.selectedDesignImage;
    if (!rate || !msg) {
      return;
    }
    this.props.onCommentSubmit({msg: msg, rate: rate, pid: pid, did:did, name:name, image:image});
    this.setState({msg: '', rate: ''});
    window.location = "profile.html";
  },
  render: function() {
    return (
      <div className="commentDiv">
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          className="msgBox"
          type="text"
          placeholder="Enter your suggested changes"
          value={this.state.msg}
          onChange={this.handleMsgChange}
        /> <br />
        <input
          className="rateBox"
          type="text"
          placeholder="Charge rate"
          value={this.state.rate}
          onChange={this.handleRateChange}
        />
        <input className="test" type="submit" onClick={this.handleSubmit} value="Post" />
      </form>
      </div>
    );
  }
});

ReactDOM.render(
	<Pitch designUrl="/api/design/" transactionUrl="/api/transaction" />, 
	document.getElementById('pitch')
);