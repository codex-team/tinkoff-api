import { Card } from '../utilities/card';

/**
 * Get card list request type
 * See https://oplata.tinkoff.ru/develop/api/autopayments/getcardlist-request/
 */
export interface GetCardListRequest {
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
 * Get card list response
 * See https://oplata.tinkoff.ru/develop/api/autopayments/getcardlist-response/
 */
export type GetCardListResponse = Array<Card>;
