var userUrl = "/api/person/" + localStorage.pid;
var reviewUrl = "/api/personReviews/" + localStorage.pid;
var transactionUrl = "/api/personTransactions/" + localStorage.pid;
var GlobalFlag = false;

var Profile = React.createClass({
  componentDidMount: function() {
    document.getElementById("headerName").innerHTML = localStorage.getItem("name");
  },
  render: function() {
    return (
      <div>
        <div className="profile">
        <div className="col-md-8">
          <ProfileInfo personjson={userUrl} />
          <ProfileTransactions transactionjson={transactionUrl} />
</div>
          <div className="col-md-4">
          <ProfileReviews reviewjson={reviewUrl} />
          </div>
        </div>
      </div>
    );
  }
})

var ProfileInfo = React.createClass({
  loadProfileInfoFromServer: function() {
    $.ajax({
      url: this.props.personjson,
      dataType: 'json',
      cache: false,
      success: function(data) {
            if (data != null){
              this.setState({personName: data.name , personImg: data.img, personDesc: data.desc});
            }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.personjson, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadProfileInfoFromServer();
  },
  getInitialState: function() {
    return {personName: "", personImg: "", personDesc: ""};
  },
  render: function() {
    return (
      <div className="profileInfo">
        <div className="profileinfomodal-panel panel-default">
          <div className="profileinfomodal-panel-body">
            <div className="row">
              <div className="col-md-4">
                <div className="media-left">
                  <img className="media-object img-circle" src={this.state.personImg} width="200" height="200"></img>
                </div>
              </div>
              <div className="col-md-7"> 
                <h1 className="personName">
                  {this.state.personName}
                </h1>
                
                <h4 className="personDesc">
                  {this.state.personDesc}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var unrendered = true;
var ProfileTransactions = React.createClass({
  loadProfileTransactionsFromServer: function() {
    $.ajax({
      url: this.props.transactionjson,
      dataType: 'json',
      cache: false,
      success: function(data) {
        if (data != null){
          this.setState({personTransactions: data });
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.transactionjson, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadProfileTransactionsFromServer();
  },
  getInitialState: function() {
    return {personTransactions: [], transactionDesign: {} };
  },
  getTransactionDesign: function(transaction){
    var designjson = "/api/design/" + transaction.did;
    var temp;
    $.ajax({
      url: designjson,
      dataType: 'json',
      cache: false,
      async: false,
      success: function(data) {
        if (data != null){
          temp = data;
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.designjson, status, err.toString());
      }.bind(this)
    });
    
return (
<a href="design_detail.html" className="transactions-list-group-item" key={transaction.tid} onClick={() => { that.setSelectedDesign(transaction) }}>
          <div className="media">
            <div className="media-body">
              <br /> 
              <div className="col-md-4">
                <div className="media-left">
                  <img className="media-object img" src={temp.img} width="200" height="200"></img>
                </div>
              </div>
              <div className="col-md-8">
                <h2 className="media-heading">{temp.name}</h2>
                <br /> 
                <h4 className="media-heading">Message: {transaction.msg}</h4>
                <br /> 
                <h4 className="media-heading">Rate: {transaction.rate}</h4>
                <br /> 
                <h4 className="media-heading">Status: {transaction.status}</h4>
              </div>
            </div>
          </div>
        </a>
  )

  },
  setSelectedDesign: function(transaction) {
    localStorage.selectedDesignId = transaction.did;
  },
  render: function() {
    var that = this;
    var transactions = this.state.personTransactions.map(function(transaction) {
      return (
        that.getTransactionDesign(transaction)
      );
    });
    
    return (
      <div className="profileTransactions">
        <div className="profiletransactionmodal-panel panel-default">
          <div className="profiletransactionmodal-panel-head">
            <h1>Ongoing Projects</h1>
          </div>
          <div className="profiletransactionmodal-panel-body">
            <ul className="list-group">
              {transactions}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

var ProfileReviews = React.createClass({
  loadProfileReviewsFromServer: function() {
    $.ajax({
      url: this.props.reviewjson,
      dataType: 'json',
      cache: false,
      success: function(data) {
        if (data != null){
          this.setState({personReviews: data });
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.reviewjson, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadProfileReviewsFromServer();
  },
  getInitialState: function() {
    return {personReviews: [] };
  },
  render: function() {
    var reviews = this.state.personReviews.map(function(review) {
      return (
        <li className="reviews-list-group-item" key={review.crid}>
          <div className="media">
            <div className="media-body">
              <br /> 
              <h2 className="media-heading">{review.rating}/10</h2>
              <h4 className="media-heading">{review.text}</h4>
            </div>
          </div>
        </li>
      );
    });
    
    return (
      <div className="profileReviews">
        <div className="profilereviewmodal-panel panel-default">
          <div className="profilereviewmodal-panel-head">
            <h1>Reviews</h1>
          </div>
          <div className="profilereviewmodal-panel-head">
            <ul className="list-group">
              {reviews}
            </ul>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Profile />,
  document.getElementById('profile')
);