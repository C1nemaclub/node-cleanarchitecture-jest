import { UserEntity } from "../user/user.entity";

export interface UserGateway {
    saveUser(name: string, email: string): Promise<boolean>;
    getUsers(): Promise<UserEntity[] | null>;
}