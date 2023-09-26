import { ApiService } from "./ApiService";

type User = {
  id: string;
  name: string;
  age: number;
};

type FetchUsersPrams = {
  createdAt: string;
};

class FetchUsersService extends ApiService {
  constructor() {
    super();
  }

  async execute(params: FetchUsersPrams): Promise<User> {
    return await this.get<User>("/users", { params });
  }
}

export const fetchUsersService: FetchUsersService = new FetchUsersService();
