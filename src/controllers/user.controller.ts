import {Controller, Get} from "@nestjs/common";
import {UserService} from "../service/user.service";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get('latest')
    async findLatestUsers() {
        const latestUsers = await this.userService.getLatestUsers();
        return latestUsers.map(user => {
            return {
                firstName: user.firstName,
                lastName: user.lastName,
                username: user.username,
                created_at: user.created_at,
            }
        });
    }
}