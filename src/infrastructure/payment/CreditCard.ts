import CreditCardValidationError from './errors/CreditCardValidationError';

interface CreditCardDetails {
  holder: string;
  number: string;
  expireDate: string;
  securityCode: string;
  zipCode?: string;
}

class CreditCard {
  private holder: string;
  private number: string;
  private expireDateMonth: number;
  private expireDateYear: number;
  private securityCode: string;
  private zipCode: string;

  constructor(details: CreditCardDetails) {
    this.setHolder(details.holder);
    this.setNumber(details.number);
    this.parseAndSetExpireDate(details.expireDate);
    this.setSecurityCode(details.securityCode);

    if (details.zipCode) {
      this.setZipCode(details.zipCode);
    }
  }

  getHolder() {
    return this.holder;
  }

  private setHolder(holder: string) {
    if (!holder.length) {
      this.throwValidationError('Holder name cannot be empty!');
    }

    if (!this.isUppercase(holder)) {
      this.throwValidationError('Holder name must contain only uppercase letters!');
    }

    if (!this.isASCII(holder)) {
      this.throwValidationError('Holder name must contain only ASCII letters!');
    }

    if (holder.length > 26) {
      this.throwValidationError('Holder name must not exceed 26 letters!');
    }

    this.holder = holder;
  }

  private setNumber(number: string) {
    if (!this.isValidNumber(number)) {
      this.throwValidationError('Number is not valid!');
    }

    this.number = number;
  }

  private parseAndSetExpireDate(expireDate: string) {
    const [
      month,
      year
    ] = expireDate.split('/');

    const numericMonth = Number(month);
    if (isNaN(numericMonth)) {
      this.throwValidationError('Month is not numeric!');
    }

    if (numericMonth < 1 || numericMonth > 12) {
      this.throwValidationError('Month is not valid!');
    }

    const numericYear = Number(year);
    if (isNaN(numericYear)) {
      this.throwValidationError('Year is not numeric!');
    }

    if (numericYear < 1) {
      this.throwValidationError('Year is not valid!');
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth() + 1;
    const minMonthOffset = currentYear * 12 + currentMonth;

    const expireMonthOffset = numericYear + 12 + numericMonth;
    if (expireMonthOffset < minMonthOffset) {
      this.throwValidationError('Card has expired!');
    }

    this.expireDateMonth = numericMonth;
    this.expireDateYear = numericYear;
  }

  private setSecurityCode(securityCode: string) {

  }

  private setZipCode(zipCode: string) {

  }

  private throwValidationError(message: string) {
    throw new CreditCardValidationError(message);
  }

  private isUppercase(str: string) {
    return str.toUpperCase() === str;
  }

  private isASCII(str: string) {
    return /^[\000-\177]*$/.test(str);
  }

  // Luhn algorithm
  private isValidNumber(number: string) {
    // Accept only digits, dashes or spaces
    if (/[^0-9-\s]+/.test(number)) return false;

    // The Luhn Algorithm. It's so pretty.
    let nCheck = 0, bEven = false;
    number = number.replace(/\D/g, "");

    for (var n = number.length - 1; n >= 0; n--) {
      var cDigit = number.charAt(n),
          nDigit = parseInt(cDigit, 10);

      if (bEven && (nDigit *= 2) > 9) nDigit -= 9;

      nCheck += nDigit;
      bEven = !bEven;
    }

    return (nCheck % 10) == 0;
  }
}

export default CreditCard;
