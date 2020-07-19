import { Receipt } from '../utilities/receipt';

/**
 * Cancel payment request type
 */
export interface CancelPaymentRequest {
  /**
   * Terminal key
   * Added in requestMethod
   */
  TerminalKey?: string;

  /**
   * Payment ID in bank system
   */
  PaymentId: number;

  /**
   * Amount in cents
   */
  Amount?: number;

  /**
   * IP address of buyer
   */
  IP?: string;

  /**
   * Sign token
   * See https://oplata.tinkoff.ru/develop/api/request-sign/
   */
  Token?: string;

  /**
   * Receipt data array
   */
  Receipt?: Receipt;
}

/**
 * Cancel payment response type
 */
export interface CancelPaymentResponse {
  /**
   * Terminal key
   */
  TerminalKey: string;

  /**
   * Order ID in seller's system
   */
  OrderId: number;

  /**
   * Payment execution
   */
  Success: boolean;

  /**
   * Payment status
   */
  Status: string;

  /**
   * Payment ID in bank system
   */
  PaymentId: number;

  /**
   * Error code
   * 0 is successful
   */
  ErrorCode: string;

  /**
   * Error message
   */
  Message?: string;

  /**
   * Details of error
   */
  Details?: string;

  /**
   * Amount before cancel in cents
   */
  OriginalAmount: number;

  /**
   * Amount after cancel in cents
   */
  NewAmount: number;
}
