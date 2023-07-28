import Constants from '../../../lib/constants';
import CookieUtil from '../../../utils/chat/cookieUtil';
import HttpStatusCode from './httpStatusCodes';

const statusHandler = (response) => {
  return response.status === HttpStatusCode.OK || response.status === HttpStatusCode.CREATED
    ? Promise.resolve(response)
    : Promise.reject(response);
};

const jsonHandler = (response) => {
  return response.json();
};

const getPostRequestHeader = () => {
  return {
    Accept: 'application/json, text/plain',
    'Content-Type': 'application/json; charset=UTF-8',
  };
};

const getAuthHeader = () => {
  return {
    Authorization: `Bearer ${CookieUtil.getCookie(Constants.ACCESS_PROPERTY)}`,
  };
};

const ApiUtils = {
  statusHandler,
  jsonHandler,
  getPostRequestHeader,
  getAuthHeader,
};

export default ApiUtils;
