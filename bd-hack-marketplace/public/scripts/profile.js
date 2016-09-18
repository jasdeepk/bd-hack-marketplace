var Profile = React.createClass({
  render: function() {
    return (
      <div>
        <div className="headerMain">
              <a href="profile.html" style={{cursor:'pointer'}} className="headerContractorName">{localStorage.name}</a>
              <a style={{cursor:'pointer'}} className="headerSignOut">Sign Out</a>
        </div>
        <div className="commentBox">
          <ProfileInfo personjson="/api/person" />
          <ProfileProjects designjson="/api/design" />
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
        //if data...get current user....
        //this.setState({persondata: data});
         this.setState({personName: "Bob", personImg: "picturehere", personDesc: "descriptionhere"});
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
        <h2 className="personImg">
          {this.state.personImg}
        </h2>
        <h2 className="personDesc">
          {this.state.personDesc}
        </h2>
      </div>
    );
  }
});

var ProfileProjects = React.createClass({
  loadProfileProjectsFromServer: function() {
    $.ajax({
      url: this.props.designjson,
      dataType: 'json',
      cache: false,
      success: function(data) {
        //if data...get all users projects....
        //this.setState({personDesigns: data});
         this.setState({personDesigns: [{designName: "a", designImg: "img"},{designName: "b", designImg: "img"}] });
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.designjson, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadProfileProjectsFromServer();
  },
  getInitialState: function() {
    return {personDesigns: {} };
  },
  render: function() {
    return (
      <div className="personDesigns">
        <h1>Ongoing Projects</h1>
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
        //if data...get all users reviews....
        //this.setState({personReviews: data});
         this.setState({personReviews: [{reviewName: "Bill", reviewRating: "4"},{reviewName: "Betty", reviewRating: "3"}] });
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
    return {personReviews: {} };
  },
  render: function() {
    return (
      <div className="personReviews">
        <h1>Reviews</h1>
      </div>
    );
  }
});

ReactDOM.render(
  <Profile />,
  document.getElementById('profile')
);