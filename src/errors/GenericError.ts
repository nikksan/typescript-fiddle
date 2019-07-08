import GenericError from 'contracts/errors/GenericError';

interface ErrorDTO {
  message: string,
  code: number,
}

class BaseError extends Error implements GenericError {
  public code: number;

  constructor(dto: ErrorDTO) {
    super(dto.message);

    this.code = dto.code;
  }
}

export default BaseError;
