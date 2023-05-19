import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  document: string;

  @Column({ default: true})
  active: boolean;

  @Column()
  username: string;

  @Column()
  password: string;

}