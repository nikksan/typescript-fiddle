import CreditCard from './CreditCard';

interface PaymentGateway {
  charge(creditCard: CreditCard): Promise<true>
}

export default PaymentGateway;
