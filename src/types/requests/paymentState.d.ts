/**
 * Payment state request type
 */
export interface PaymentStateRequest {
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
   * IP address of buyer
   */
  IP?: string;

  /**
   * Sign token
   * See https://oplata.tinkoff.ru/develop/api/request-sign/
   */
  Token?: string;
}

/**
 * Payment state response type
 */
export interface PaymentStateResponse {
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
