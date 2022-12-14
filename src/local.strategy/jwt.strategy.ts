import {PassportStrategy} from "@nestjs/passport";
import {Injectable} from "@nestjs/common";
import {ExtractJwt, Strategy} from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "SECRET" // protect this, move env to the var
        });
    }

    async validate(payload: any) {
        // const user = await this.userService.getById(payload.sub)
        return {
            id: payload.sub,
            name: payload.name,
            // ...user
        };
    }
}