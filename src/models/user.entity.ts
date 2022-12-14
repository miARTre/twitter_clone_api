import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Post} from "./post.entity";

@Entity()
export class User {


    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    firstName: string;
    @Column()
    lastName: string;
    @Column()
    password: string;
    @Column()
    username: string;
    @Column({default: true})
    isActive: boolean;
    @OneToMany(() => Post, (photo) => photo.user)
    posts: Post[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor(user?: Partial<User>) {
        Object.assign(this, user);
    }

    public static createNewUser(username: string, firstName: string, lastName: string, password: string) {
        return new User({
            username, firstName, lastName, password
        });
    }

}