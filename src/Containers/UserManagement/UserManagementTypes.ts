export interface DataUserList {
  id: number,
  name: string,
  email: string,
  role: string,
}

export interface UserState {
  users: Array<DataUserList>;
}