var contractor_pid = "0";
var Login = React.createClass({
  getInitialState: function() {
    return {login: true, username: '', password: ''};
  },
  componentDidMount: function() {
  },
  handleUsernameChange: function(e) {
    this.setState({username: e.target.value});
  },
  handlePasswordChange: function(e) {
    this.setState({password: e.target.value});
  },
  handleClick: function() {
    this.setState({login: !this.state.login});
  },
  loadProfileInfoFromServer: function() {
    $.ajax({
      url: this.props.personjson,
      dataType: 'json',
      cache: false,
      success: function(data) {
        // loop and find username email and set session PID
        for(var i =  0; i < data.length; i++) {
          if(data[i] && data[i].user === this.state.username && data[i].pass === this.state.password) {
            // set session variable
            contractor_pid = data[i].pid;
          }
        }
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.personjson, status, err.toString());
      }.bind(this)
    });
  },
  handleSubmitClick: function() {
      if(this.state.login) { 
        this.loadProfileInfoFromServer();
      } else {
          $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                this.setState({data: comments});
                console.error(this.props.url, status, err.toString());
            }.bind(this)
            });
      }
  },
  render: function() {
    return (
      <div className="LoginStuffs">
        <div className="mainLogin">
          <div className="loginmodal-container">
            <h1>{this.state.login ? 'Login to Your Account' : 'Create Your Account'}</h1>
            <br/>
            <form>
              <input type="text" name="user" placeholder="Username" value={this.state.username}
                onChange={this.handleUsernameChange}/>
              <input type="password" name="pass" placeholder="Password" value={this.state.password}
                onChange={this.handlePasswordChange}/>
              <input type="button" name="login" className="login loginmodal-submit" 
                value={this.state.login ? 'Login' : 'Create Account'} onClick={this.handleSubmitClick}/>
            </form>
            <div className="login-help">
              <a style={{cursor:'pointer'}} onClick={this.handleClick}>
                {this.state.login ? 'Register' : 'I already have an Account'}
              </a> 
              - 
              <a style={{cursor:'pointer'}}>Forgot Password</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <Login personjson="/api/person"/>,
  document.getElementById('login')
);