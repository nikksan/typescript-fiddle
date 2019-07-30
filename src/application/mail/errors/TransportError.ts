class TransportError extends Error {
  constructor(m?: string) {
    super(m);
    Object.setPrototypeOf(this, TransportError.prototype);
  }
}

export default TransportError;
