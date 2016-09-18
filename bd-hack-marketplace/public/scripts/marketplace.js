var userUrl = "/api/person/" + localStorage.pid;

var Marketplace = React.createClass({

  loadUserFromServer: function() {
    $.ajax({
      url: this.props.userUrls,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({userData: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.userUrls, status, err.toString());
      }.bind(this)
    });
  },
  loadDesignsFromServer: function() {
    $.ajax({
      url: this.props.designsUrl,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({designData: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.designsUrl, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {designData: [], userData: []};
  },
  componentDidMount: function() {
    this.loadDesignsFromServer();
    this.loadUserFromServer();
  },
  render: function() {
      var designs = this.state.designData.map(function(design) {
        return (
          <a href="design_detail.html" className="list-group-item" key={design.did}>
            <div className="media">
              <div className="media-left">
                <img className="media-object" src={design.img} width="200" height="200"></img>
              </div>
              <div className="media-body">
                <br /> 
                <h2 className="media-heading">{design.name}</h2>
                <h4 className="media-heading">Room Type: {design.rooomtype}</h4>
                <h4 className="media-heading">Starts on: {design.startdeadline} Ends on: {design.enddeadline}</h4>
                <h4 className="media-heading">{design.sqrft} Sqft</h4>
              </div>
            </div>
          </a>
        );
      });

      return (
        <div>
          <div className="headerMain">
            <a href="profile.html" style={{cursor:'pointer'}} className="headerContractorName">{localStorage.name}</a>
            <a style={{cursor:'pointer'}} className="headerSignOut">Sign Out</a>
          </div>
          <div className="list-group">
            {designs}
          </div>
        </div>
      );
  }
});

ReactDOM.render(
  <Marketplace designsUrl="/api/design" userUrls={userUrl} pollInterval={2000} />,
  document.getElementById('marketplace')
);
