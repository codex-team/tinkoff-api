/**
 * Remove customer request type
 */
export interface RemoveCustomerRequest {
  /**
   * Terminal key
   * Added in requestMethod but always required
   */
  TerminalKey?: string;

  /**
   * Buyer's identifier in the seller's system
   */
  CustomerKey: string;

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
 * Remove customer response type
 */
export interface RemoveCustomerResponse {
  /**
   * Terminal key
   */
  TerminalKey: string;

  /**
   * Buyer's identifier in the seller's system
   */
  CustomerKey: string;

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
