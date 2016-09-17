var Login = React.createClass({
  getInitialState: function() {
    return {login: true};
  },
  componentDidMount: function() {
  },
  handleClick: function() {
      this.setState({login: !this.state.login});
  },
  render: function() {
    console.log(this.state.data);
    return (
      <div className="LoginStuffs">
        <div className="mainLogin">
          <div className="loginmodal-container">
            <h1>{this.state.login ? 'Login to Your Account' : 'Create Your Account'}</h1>
            <br/>
            <form>
              <input type="text" name="user" placeholder="Username"/>
              <input type="password" name="pass" placeholder="Password"/>
              <input type="submit" name="login" className="login loginmodal-submit" 
                value={this.state.login ? 'Login' : 'Create Account'}/>
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
  <Login />,
  document.getElementById('login')
);
