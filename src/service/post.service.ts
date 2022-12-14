import {Injectable} from "@nestjs/common";
import {PostDao} from "../dao/post.dao";
import {Post} from "../models/post.entity";
import {UserDao} from "../dao/user.dao";

@Injectable()
export class PostService {
    constructor(private postDao: PostDao, private userDao: UserDao) {
    }

    public async createPost(text: string, user_id: number): Promise<Post> {
        const user = await this.userDao.findOne(user_id);
        const newPost = Post.createNewPost(text, user);

        return this.postDao.insert(newPost)
    }

    async findPostsByUsername(username: string) {
        const user = await this.userDao.findByUserName(username);
        return this.postDao.findByUser(user);
    }

    getLatestPosts() {
        return this.postDao.findLatestPosts();
    }

    getPosts(page: number) {
        return this.postDao.findPosts(page);
    }
}

