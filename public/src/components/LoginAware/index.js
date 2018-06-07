import React from "react";
import { withUser } from "server/firebase";

class LoginAware extends React.Component {
  render() {
    const content = this.props.user
      ? this.props.loggedInComponent
      : this.props.loggedOutComponent;
    return content;
  }
}

export default withUser(LoginAware);
