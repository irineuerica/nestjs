import { ApiProperty } from "@nestjs/swagger";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'usuarios'})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    @ApiProperty()
    id: string;

    @ApiProperty()
    @Column({name: 'nome'})
    name: string;

    @ApiProperty()
    @Column()
    email: string;

    @ApiProperty()
    @CreateDateColumn({name: 'criado_em'})
    createdAt: string;

    constructor(user?: Partial<UserEntity>){
        this.id = user?.id;
        this.name = user?.name;
        this.email = user?.email;
        this.createdAt = user?.createdAt
    }
}