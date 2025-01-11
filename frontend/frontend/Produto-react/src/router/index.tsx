import React, { Suspense } from 'react';

import { 
  Route, 
  Switch,
  RouteProps,
  Redirect,

} from 'react-router-dom';
import { isAuthenticated } from '../utils/AuthService'
import paths from './paths';
import Loader from '../components/ContentLoader/Index';

interface PrivateRouteProps extends RouteProps {
  component: any;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { component: Component, ...rest } = props;
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
            <Redirect to={{ pathname: `${process.env.REACT_APP_PREFIX}/login`, state: { from: props.location } }} />
          )
      }
    />
  );
}


const Routes: React.FC = () => (

    <Switch>
      <Suspense fallback={<Loader />}>
        {paths.map((i, index) => 
        !i.public 
        ? <PrivateRoute 
          key={index} 
          exact 
          strict
          sensitive 
          path={i.path} 
          component={i.component} 
          
          /> 
        : <Route key={index} exact path={i.path} component={i.component} />)}
      </Suspense>
    </Switch>

);

export default Routes;


