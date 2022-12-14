import {Body, Controller, Get, Param, Post, Request, UseGuards} from "@nestjs/common";
import {JwtAuthGuard} from "../local.strategy/jwt-auth.guard";
import {PostService} from "../service/post.service";
import {CreatePostDto, FindPostsByUser, mapPostsToDto, mapPostToDto, PostRes} from "../dto/post.dto";

@Controller('posts')
export class PostController {
    constructor(private readonly postService: PostService) {
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createPost(@Request() req, @Body() createPostDto: CreatePostDto): Promise<PostRes> {
        const post = await this.postService.createPost(createPostDto.text, req.user.id);
        return mapPostToDto(post);
    }

    @Get('/user/:username')
    @UseGuards(JwtAuthGuard)
    async findPostsByUser(@Param() params: FindPostsByUser): Promise<PostRes[]> {
        const userPosts = await this.postService.findPostsByUsername(params.username);
        return mapPostsToDto(userPosts);
    }

    @Get('latest')
    async findLatestPosts() {
        const latestPosts = await this.postService.getLatestPosts();
        return mapPostsToDto(latestPosts);
    }

    @Get('timeline/:page')
    @UseGuards(JwtAuthGuard)
    async getTimeline(@Param() params: {page: number}) {
        const posts = await this.postService.getPosts(params.page);
        return mapPostsToDto(posts);
    }

}

