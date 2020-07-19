export interface ChargeRequest {
  /**
   * Terminal key
   * Added in requestMethod but always required
   */
  TerminalKey?: string;

  /**
   * Payment ID in bank system
   */
  PaymentId: number;

  /**
   * Rebill ID
   */
  RebillId: number;

  /**
   * Send notification on buyer email
   */
  SendEmail?: boolean;

  /**
   * Buyer email
   * Required if SendEmail === true
   */
  InfoEmail?: string;

  /**
   * IP address of buyer
   */
  IP?: string;

  /**
   * Sign token
   * See https://oplata.tinkoff.ru/develop/api/request-sign/
   */
  Token?: string;
}

export interface ChargeResponse {
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
