import { Receipt } from '../utilities/receipt';

/**
 * Confirm payment request type
 */
export interface ConfirmPaymentRequest {
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
   * Amount in kopecks
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
 * Confirm payment response type
 */
export interface ConfirmPaymentResponse {
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
}
