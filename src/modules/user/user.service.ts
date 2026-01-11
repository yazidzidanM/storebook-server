import { UserRepository } from "./user.repository";


class UserServices {
  constructor(private userRepo: UserRepository){
    this.userRepo = new UserRepository();
  }

  async getAllUsers() {
    const users = await this.userRepo.getAllUsers();
    return users;
  }
}

export default UserServices;