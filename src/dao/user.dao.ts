import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "../models/user.entity";
import {Post} from "../models/post.entity";

@Injectable()
export class UserDao {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOneBy({id});
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }

    find(param: (user) => boolean) {
    }

    findByUserName(username: string): Promise<User | undefined> {
        return this.usersRepository.findOneBy({username});
    }

    async insert(newUser: User): Promise<User> {
        return this.usersRepository.save(newUser, {reload: true});
    }

    findLatestUsers() {
        return this.usersRepository.find({
            take: 10,
            skip: 0,
            order: {created_at: "DESC"},
        });
    }
}