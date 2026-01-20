import ExptectedError from "#shared/errors/errorHandler";
import { UserRepository } from "./user.repository";
import { userSchema } from "./user.validation";


class UserServices {
  constructor(private userRepo: UserRepository){
    this.userRepo = new UserRepository();
  }

  async getAllUsers() {
    const users = await this.userRepo.getAllUsers();
    return users;
  }

  async getUserById(userId: string) {
    const user = await this.userRepo.findUserById(userId);
    return user;
  }

  async updateUserById(
    userId: string,
    name: string,
    username: string,
    phone: string,
    address: string,
  ) { 
    const validated = userSchema.validate({name, username, phone, address})
    if(!validated) throw new ExptectedError("validataion was failed", 422)

    await this.userRepo.updateUser(userId, name, username, phone, address);

    const user = await this.userRepo.findUserByUuid(userId)
    return user;
  }
}

export default UserServices;