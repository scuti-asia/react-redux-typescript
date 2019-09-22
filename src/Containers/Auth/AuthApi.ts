import moment from 'moment';

export interface dataUser {
  email: string,
  password: string
}

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
  static authentications(data: dataUser) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if ( data.email !== 'hieutq@scuti.asia'
          || data.password !== 'beallyoucanbe'
        ) {
          reject('Email and/or password are incorrect.');
        } else {
          resolve(Object.assign({}, authentications));
        }
      }, 1000);
    });
  }

  static reAuthentications(refreshToken: string) {
    return new Promise((resolve, reject) => {
      console.log(refreshToken);
      setTimeout(() => {
        if (refreshToken !== 'refreshToken') {
          reject('Unauthorized');
        } else {
          resolve(Object.assign({}, authentications));
        }
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
