import {Module} from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./models/user.entity";
import {UserDao} from "./dao/user.dao";
import {Post} from "./models/post.entity";
import {PostDao} from "./dao/post.dao";
import {UserService} from "./service/user.service";
import {PostService} from "./service/post.service";
import {AuthService} from "./service/auth.service";
import {PassportModule} from "@nestjs/passport";
import {LocalStrategy} from "./local.strategy/local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {JwtStrategy} from "./local.strategy/jwt.strategy";
import {PostController} from "./controllers/post.controller";
import {AuthController} from "./controllers/auth.controller";
import {UserController} from "./controllers/user.controller";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'PostgresSB',
            entities: [User, Post],
            synchronize: true,
            autoLoadEntities: true
        }),
        TypeOrmModule.forFeature([User, Post]),
        PassportModule,
        JwtModule.register({
            secret: 'SECRET',
            signOptions: {expiresIn: '1y'},
        })
    ],
    controllers: [PostController, AuthController, UserController],
    providers: [UserDao, PostDao, UserService, PostService, AuthService, LocalStrategy, JwtStrategy],
})
export class AppModule {
}
