


var Marketplace = React.createClass({

  // console.log(this.props.url);
  loadDesignsFromServer: function() {
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
    this.loadDesignsFromServer();
    // setInterval(this.loadDesignsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="marketplace">
      </div>
    );
  }
});

ReactDOM.render(
  <Marketplace url="/api/design" pollInterval={2000} />,
  document.getElementById('marketplace')
);
