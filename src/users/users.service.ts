import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    findAll() {
        return this.userRepository.find();
    }

    findOne(id: number) {
        return this.userRepository.findOneBy({ id: id });
    }

    findByDocument(document: string) {
        return this.userRepository.findOneBy({ document: document });
    }

    findByUsername(document: string) {
        return this.userRepository.findOneBy({ document: document });
    }

    async create(createUserDto: any) {
        const salt = await bcrypt.genSalt();
        createUserDto.password = await bcrypt.hash(createUserDto.password, salt);

        return this.userRepository.save(createUserDto);
    }

    update(id: number, updateUserDto) {
        return this.userRepository.update(id, updateUserDto);
    }

    remove(id: number) {
        return this.userRepository.delete(id);
    }

    findOneByUsername(username: string) {
        return this.userRepository.findOneBy({ username: username });
    }
}
