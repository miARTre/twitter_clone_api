import {User} from "./user.entity";
import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Post {

    constructor(post?: Partial<Post>) {
        Object.assign(this, post);
    }

    public static createNewPost(text: string, user: User) {
        return new Post({
            text, user
        });
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;
}
