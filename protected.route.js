import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

export class ProtectedRoute extends React.Component {
  constructor() {
    super();
    this.state = { isLogged: undefined };
  }

  async componentDidMount() {
    const isLogged = await auth.isAuthenticated();
    this.setState({ isLogged: isLogged });
  }

  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          if (this.state.isLogged === undefined) {
            //you can add a loading screen here
          } else if (this.state.isLogged === true) {
            return <Component {...props} />;
          } else {
            console.log(this.state.isLogged);
            console.log(auth.isAuthenticated());
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: {
                    from: props.location
                  }
                }}
              />
            );
          }
        }}
      />
    );
  }
}
