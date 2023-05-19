import { IsString, IsNumber, IsBoolean, IsNotEmpty, Length, Validate } from "class-validator";
import { CpfValid } from "../validators/validator-cpf";
import { IsDocumentAndUsernameUnique } from '../validators/validator-unique-keys';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({message:'O nome não pode ser vazio.'})
    @Length(3, 30, {message: 'O nome precisa ter entre 3 e 30 caracteres.'})
    readonly name: string;

    @IsNumber()
    readonly age: number;

    @IsNotEmpty({message: 'O documento não pode ser vazio.'})
    @Validate(CpfValid)
    @Validate(IsDocumentAndUsernameUnique, ['document'])
    @IsString()
    readonly document: string;

    @IsBoolean()
    readonly active: boolean;
    
    @IsString()
    @IsNotEmpty({ message: 'O nome de usuário não pode ser vazio.' })
    @Validate(IsDocumentAndUsernameUnique, ['username'])
    @Length(3, 30, { message: 'O nome de usuário precisa ter entre 3 e 30 caracteres.' })
    readonly username: string;

    @IsString()
    @IsNotEmpty({ message: 'A senha não pode ser vazia.' })
    @Length(6, 30, { message: 'A senha precisa ter entre 6 e 30 caracteres.' })
    password: string;
    
}
