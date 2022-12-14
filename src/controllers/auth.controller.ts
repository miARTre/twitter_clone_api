import {Body, Controller, Get, Post, Request, UseGuards} from "@nestjs/common";
import {UserService} from "../service/user.service";
import {CreateUserDto} from "../dto/create_user.dto";
import {LocalAuthGuard} from "../local.strategy/local-auth.guard";
import {AuthService} from "../service/auth.service";
import {JwtAuthGuard} from "../local.strategy/jwt-auth.guard";


@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService, private authService: AuthService) {
    }

    @Post()
    async register(@Body() createUserDto: CreateUserDto) {
        return this.userService.register(createUserDto.username,
            createUserDto.firstName, createUserDto.lastName, createUserDto.password);
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    public async me(@Request() req) {
        const user = await this.userService.findById(req.user.id);
        return {
            username: user.username,
            id: user.id,
        }
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    login(@Request() req): any {
        return this.authService.login(req.user) // Return JWT access token
    }
}