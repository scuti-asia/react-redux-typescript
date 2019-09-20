import moment from 'moment';

export const authentications = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  expiresIn: moment(new Date()).add('30', 'minutes').valueOf(),
}

export const infoProfile = {
  email: 'hieutq@scuti.asia',
  label: "Ta Hieu",
}

class AuthApi {
  static authentications() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign({}, authentications));
        // reject('login wrong');
      }, 1000);
    });
  }

  static getMe() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign({}, infoProfile));
      }, 1000);
    });
  }
}

export default AuthApi;
