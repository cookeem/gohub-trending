import jwtDecode from 'jwt-decode';
import axios from 'axios';
import Cookies from 'universal-cookie';

export const getLoginInfo = (token) => {
  var login = {
    uid: 0,
    username: "",
    userToken: "",
  };
  try {
    var data = jwtDecode(token);
    login.uid = data.uid;
    login.username = data.username;
    login.userToken = token;
    login.exp = data.exp;
  } catch(e) {
    console.log("user not login yet");
  }
  return login;
};

export const serviceQuery = (obj, axiosConfig, axiosSuccess, axiosFail) => {
  axios(axiosConfig).then((response) => {
    let login = getLoginInfo(response.headers['x-user-token']);
    obj.onLogin(login);
    let msg = {
      error: response.data.error,
      msg: response.data.msg,
    };
    obj.onMsg(msg);
    const cookies = new Cookies();
    cookies.set('user-token', login.userToken, { path: '/', expires: new Date( login.exp *1000), });
    axiosSuccess(obj, response);
  }).catch((error) => {
    if (!error.response) {
      let msg = {
        error: 1,
        msg: "Error: Network Error",
      };
      obj.onMsg(msg);
    } else if (error.response.status == 403) {
      let msg = {
        error: error.response.data.error,
        msg: error.response.data.msg,
      };
      obj.onMsg(msg);
      if (error.response.data.error == 2) {
        window.location.href = "/#/user-login";
      }
      console.log('#############', error.response);
      axiosFail(obj, error.response);
    } else {
      let msg = {
        error: 1,
        msg: String(error),
      };
      obj.onMsg(msg);
    }
  }).then(() => {
    obj.onLoading(false);
  });
}
