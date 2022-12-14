import {Injectable} from "@nestjs/common";
import {UserDao} from "../dao/user.dao";
import {User} from "../models/user.entity";

@Injectable()
export class UserService {

    constructor(private userDao: UserDao) {
    }

    async register(username: string, firstName: string, lastName: string, password: string) {
        const newUser = User.createNewUser(username, firstName, lastName, password);
        return this.userDao.insert(newUser);
    }

    async findById(id: number): Promise<User> {
        return this.userDao.findOne(id);
    }

    async findByUsername(username: string): Promise<User | undefined> {
        return this.userDao.findByUserName(username)
    }


    async getLatestUsers() {
        return this.userDao.findLatestUsers();
    }
}
