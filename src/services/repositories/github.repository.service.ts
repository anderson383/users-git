import {
  GitHubRepository,
  ResponseCommon,
  User,
  UserSave
} from './github.repository';
import axiosIntance from '../../core/axios-config';
import { injectable } from 'inversify';


@injectable()
export class GitHubRepositoryService implements GitHubRepository {
  private customHost = 'http://localhost:4000/api'
  async saveUser(userData: UserSave): Promise<string> {
    try {
      const {data}=  await axiosIntance.post<string>(this.customHost + '/user', userData);

      return data
    } catch (err) {
      console.error(err);
    }
  }


  async getUsers(querySearch:string): Promise<User[]> {
    try {
      if (querySearch) {
        const {data}=  await axiosIntance.get<ResponseCommon>(`/search/users?q=${ querySearch }&per_page=10`);
  
        return data.items
      }
    } catch (err) {
      console.error(err);
    }
  }

  async getUser(idUser:string): Promise<any> {
    try {
      const {data}=  await axiosIntance.get<ResponseCommon>(`/users/${ idUser }`);

      return data
    } catch (err) {
      console.error(err);
    }
  }
}
