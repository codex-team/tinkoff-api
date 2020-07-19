/**
 * Resend payment request type
 */
export interface ResendPaymentRequest {
  /**
   * Terminal key
   * Added in requestMethod
   */
  TerminalKey?: string;

  /**
   * Sign token
   * See https://oplata.tinkoff.ru/develop/api/request-sign/
   */
  Token?: string;
}

export interface ResendPaymentResponse {
  /**
   * Terminal key
   */
  TerminalKey: string;

  /**
   * Count of resented messages
   */
  Count: number;

  /**
   * Payment execution
   */
  Success: boolean;

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
