import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ name: 'isDocumentAndUsernameUnique', async: true })
export class IsDocumentAndUsernameUnique implements ValidatorConstraintInterface {
  constructor(private readonly usersService: UsersService) {}

  async validate(value: any, args: ValidationArguments) {
    const [fieldName] = args.constraints;
    const { document, username } = value;
    console.log(fieldName)
    if (fieldName === 'document') {
      const userWithDocument = await this.usersService.findByDocument(document);
      return !userWithDocument;
    }

    if (fieldName === 'username') {
      const userWithUsername = await this.usersService.findByUsername(username);
      return !userWithUsername;
    }

    return false;
  }

  defaultMessage(args: ValidationArguments) {
    const [fieldName] = args.constraints;
    return `${fieldName} já cadastrado.`;
  }
}
