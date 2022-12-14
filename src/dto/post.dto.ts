import {Post} from "../models/post.entity";

export interface CreatePostDto {
    text: string;
}

export interface PostRes {
    id: number;
    text: string;
    created_at: Date;
    username: string;
    user_id: number;
}

export interface FindPostsByUser {
    username: string;
}

export const mapPostToDto = (post: Post): PostRes => {
    return {
        id: post.id,
        text: post.text,
        created_at: post.created_at,
        username: post.user.username,
        user_id: post.user.id
    }
}

export const mapPostsToDto = (post: Post[]): PostRes[] => {
    return post.map(mapPostToDto);
}
