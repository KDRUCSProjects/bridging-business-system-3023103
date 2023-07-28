import React from 'react';
import { Navigate } from 'react-router-dom';
import AppPaths from '../../../lib/appPaths';
import Constants from '../../../lib/constants';
import CookieUtil from '../../../utils/chat/cookieUtil';

const AuthRequired = (Component) => {
  return (props) => {
    if (CookieUtil.getCookie(Constants.ACCESS_PROPERTY)) {
      return <Component {...props} />;
    }
    return <Navigate to={AppPaths.LOGIN} />;
  };
};

export default AuthRequired;
