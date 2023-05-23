
export interface User {
  avatar_url: string
  followers_url?: string
  login: string
  id: string
}



export interface UserDetail {
  
}

export interface UserSave {
  name: string
  jsonData: UserDetail
}

export interface ResponseCommon {
  items: User[]
}

export interface GitHubRepository {
  getUsers(querySearch:string): Promise<User[]>;
  getUser(idUser:string): Promise<any>;

  saveUser(userData: UserSave): Promise<string>
}
