import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
  
@ValidatorConstraint({ name: 'cpfValid', async: false })
export class CpfValid implements ValidatorConstraintInterface {

  validate(cpf: string) {

      cpf = cpf.replace(/[^\d]+/g, '');

      if (cpf.length !== 11) {
        return false;
      }
    
      // Verificar se todos os dígitos são iguais
      if (/^(\d)\1{10}$/.test(cpf)) {
        return false;
      }
    
      // Verificar o primeiro dígito verificador
      let sum = 0;
      for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
      }
      let mod = sum % 11;
      let digit = mod < 2 ? 0 : 11 - mod;
      if (digit !== parseInt(cpf.charAt(9))) {
        return false;
      }
    
      // Verificar o segundo dígito verificador
      sum = 0;
      for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
      }
      mod = sum % 11;
      digit = mod < 2 ? 0 : 11 - mod;
      if (digit !== parseInt(cpf.charAt(10))) {
        return false;
      }
    
      return true;
  }

  defaultMessage() {
      return 'CPF inválido.';
  }
}
