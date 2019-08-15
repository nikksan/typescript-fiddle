class CreditCardValidationError extends Error {
  constructor(m?: string) {
    super(m);
    Object.setPrototypeOf(this, CreditCardValidationError.prototype);
  }
}

export default CreditCardValidationError;
