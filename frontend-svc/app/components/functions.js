import jwtDecode from 'jwt-decode';

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
  } catch(e) {
    console.log(e);
  }
  return login;
};
