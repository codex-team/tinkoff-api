/**
 * Indicator of the method of payment
 */
export enum PaymentMethod {
  /**
   * Full payment
   */
  FULL_PAYMENT='full_payment',

  /**
   * Prepayment 100%
   */
  FULL_PREPAYMENT='full_prepayment',

  /**
   * Prepayment
   */
  PREPAYMENT='prepayment',

  /**
   * Advance
   */
  ADVANCE='advance',

  /**
   * Partial payment or credit
   */
  PARTIAL_PAYMENT='partial_payment',

  /**
   * Credit transfer
   */
  CREDIT='credit',

  /**
   * Loan payment
   */
  CREDIT_PAYMENT='credit_payment'
}
