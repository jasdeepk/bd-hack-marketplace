var userUrl = "/api/person/" + localStorage.pid;

var Profile = React.createClass({
  componentDidMount: function() {
    document.getElementById("headerName").innerHTML = localStorage.getItem("name");
  },
  render: function() {
    return (
      <div>
        
        <div className="commentBox">
          <ProfileInfo personjson={userUrl} />
          <ProfileTransactions transactionjson="/api/transaction" />
          <ProfileReviews reviewjson="/api/review" />
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
        // TODO: (waitin for logged in user with session data)
        //for all persons {
            if (data != null){
          // if person.pid == session.user.pid {
              this.setState({personName: data.name , personImg: data.img, personDesc: data.desc});
            }
            // break;
          // }
        // }
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
        <h1>Profile</h1>
        <h2 className="personName">
          {this.state.personName}
        </h2>
        <div className="media-left">
          <img className="media-object img-circle" src={this.state.personImg} width="200" height="200"></img>
        </div>
        <h3 className="personDesc">
          {this.state.personDesc}
        </h3>
      </div>
    );
  }
});

var ProfileTransactions = React.createClass({
  loadProfileTransactionsFromServer: function() {
    $.ajax({
      url: this.props.transactionjson,
      dataType: 'json',
      cache: false,
      success: function(data) {
        // TODO: (waitin for logged in user with session data)
        //for all transactions {
          // if transaction.pid == session.user.pid {
            // add to a list
            this.setState({personTransactions: [data[0], data[1]] });
          // }
        // }
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
    return {personTransactions: [] };
  },
  render: function() {
    var transactions = this.state.personTransactions.map(function(transaction) {
      return (
        <li className="list-group-item" key={transaction.tid}>
          <div className="media">
            <div className="media-body">
              <br /> 
              <h2 className="media-heading">Pid: {transaction.pid}</h2>
              <h2 className="media-heading">Did: {transaction.did}</h2>
              <h4 className="media-heading">Message: {transaction.msg}</h4>
              <h4 className="media-heading">Rate: {transaction.rate}</h4>
              <h4 className="media-heading">Status: {transaction.status}</h4>
            </div>
          </div>
        </li>
      );
    });
    
    // TODO: get all the designs of the transactions and display their stuff too 
    return (
      <div className="personTransactions">
        <h1>Ongoing Projects</h1>
          <ul className="list-group">
            {transactions}
          </ul>
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
        // TODO: (waitin for logged in user with session data)
        //for all reviews {
          // if review.pid == session.user.pid {
            // add to a list
            this.setState({personReviews: [data[0], data[1]] });
          // }
        // }
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
        <li className="list-group-item" key={review.crid}>
          <div className="media">
            <div className="media-body">
              <br /> 
              <h2 className="media-heading">Pid: {review.pid}</h2>
              <h2 className="media-heading">Text: {review.text}</h2>
              <h4 className="media-heading">rating: {review.rating}</h4>
            </div>
          </div>
        </li>
      );
    });
    
    return (
      <div className="personReviews">
        <h1>Reviews</h1>
          <ul className="list-group">
            {reviews}
          </ul>
      </div>
    );
  }
});

ReactDOM.render(
  <Profile />,
  document.getElementById('profile')
);