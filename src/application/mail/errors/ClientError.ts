class ClientError extends Error {
  constructor(m?: string) {
    super(m);
    Object.setPrototypeOf(this, ClientError.prototype);
  }
}

export default ClientError;
