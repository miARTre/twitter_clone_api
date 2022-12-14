import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Post} from "../models/Post.entity";
import {User} from "../models/user.entity";

@Injectable()
export class PostDao {
    constructor(
        @InjectRepository(Post)
        private postsRepository: Repository<Post>,
    ) {
    }

    findAll(): Promise<Post[]> {
        return this.postsRepository.find();
    }

    findOne(id: number): Promise<Post> {
        return this.postsRepository.findOneBy({id});
    }

    async remove(id: string): Promise<void> {
        await this.postsRepository.delete(id);
    }

    async insert(newPost: Post): Promise<Post> {
        newPost = this.postsRepository.create(newPost);
        return this.postsRepository.save(newPost, {reload: true});
    }

    findByUser(user: User) {
        return this.postsRepository.find(
            {
                where: {user},
                relations: ['user']
            }
        );
    }

    findLatestPosts() {
        return this.postsRepository.find({
            take: 10,
            skip: 0,
            order: {created_at: "DESC"},
            relations: ['user']
        });
    }

    findPosts(page: number) {
        const size = 2;

        page = page - 1;
        const skip = page * size;

        return this.postsRepository.find({
            take: size,
            skip,
            order: {created_at: "DESC"},
            relations: ['user']
        });
    }
}
