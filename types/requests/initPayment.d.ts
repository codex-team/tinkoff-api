import { Receipt } from '../utilities/receipt';
import { Language } from '../utilities/language';
import { PayType } from '../utilities/payType';

/**
 * Init payment request type
 */
export interface InitPaymentRequest {
  /**
   * Terminal key
   * Added in requestMethod
   */
  TerminalKey?: string;

  /**
   * Amount in cents
   */
  Amount?: number;

  /**
   * Order ID in seller's system
   */
  OrderId: number;

  /**
   * IP address of buyer
   */
  IP?: string;

  /**
   * Order description
   */
  Description?: string;

  /**
   * Sign token
   * See https://oplata.tinkoff.ru/develop/api/request-sign/
   */
  Token?: string;

  /**
   * Pay form language
   */
  Language?: Language;

  /**
   * Parent payment ID
   */
  Recurrent?: string;

  /**
   * Buyer's identifier in the seller's system
   */
  CustomerKey?: string;

  /**
   * Link lifetime (no more than 90 days)
   * ISO8601 timestamp format YYYY-MM-DDThh:mm:ss±hh:mm
   */
  RedirectDueDate?: string;

  /**
   * URL for http notification
   */
  NotificationURL?: string;

  /**
   * Success page
   */
  SuccessURL?: string;

  /**
   * Fail page
   */
  FailURL?: string;

  /**
   * Pay type
   */
  PayType?: PayType;

  /**
   * Receipt data array
   */
  Receipt?: Receipt;

  /**
   * Additional payment options
   */
  DATA?: {
    [key: string]: string;
  };
}

/**
 * Init payment response type
 */
export interface InitPaymentResponse {
  /**
   * Terminal key
   */
  TerminalKey: string;

  /**
   * Amount in cents
   */
  Amount: number;

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
  Status?: string;

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
   * Payment form URL
   */
  PaymentURL?: string;

  /**
   * Error message
   */
  Message?: string;

  /**
   * Details of error
   */
  Details?: string;
}
