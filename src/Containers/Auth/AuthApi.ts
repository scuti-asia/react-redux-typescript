import moment from 'moment';

export interface dataUser {
  email: string,
  password: string
}

export const authentications = {
  accessToken: 'accessToken',
  refreshToken: 'refreshToken',
  expiresIn: moment().add('30', 'minutes').valueOf(),
}

export const infoProfile = {
  email: 'admin@scuti.asia',
  label: "I'm Admin",
}

class AuthApi {
  static authentications(data: dataUser) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if ( data.email !== 'admin@scuti.asia'
          || data.password !== 'scuti@123'
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
