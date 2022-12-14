import React, { Component } from "react";
import { connect } from "react-redux";
import * as userActions from "app/auth/store/actions";
import { bindActionCreators } from "redux";
import * as Actions from "app/store/actions";
import authService from "app/services/AuthService";

class Auth extends Component {
  /*eslint-disable-next-line no-useless-constructor*/
  constructor(props) {
    super(props);
    this.checkAuthService();
  }

  checkAuthService = () => {
    authService.on("onAutoLogin", () => {
      authService
        .signInToken()
        .then((user) => {
          this.props.setUserData(user);

          this.props.showMessage({
            message: "Logged in successful",
            variant: "success",
            autoHideDuration: 600,
            anchorOrigin: {
              vertical: "bottom", //top bottom
              horizontal: "right", //left center right
            },
          });
        })
        .catch((error) => {});
    });
    authService.on("onAutoLogout", (message) => {
      if (message) {
        this.props.showMessage({ message });
      }
      this.props.logout();
    });
    authService.initialize();
  };

  render() {
    const { children } = this.props;

    return <React.Fragment>{children}</React.Fragment>;
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      logout: userActions.logoutUser,
      setUserData: userActions.setUserData,
      // setUserDataAuth0: userActions.setUserDataAuth0,
      // setUserDataFirebase: userActions.setUserDataFirebase,
      showMessage: Actions.showMessage,
      hideMessage: Actions.hideMessage,
    },
    dispatch
  );
}

export default connect(null, mapDispatchToProps)(Auth);
