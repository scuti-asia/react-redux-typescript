export interface AuthState {
  identity: {
    authorizedAt?: any,
    accessToken: any,
    refreshToken: any,
    expiresIn: any
  },
  me: any
}