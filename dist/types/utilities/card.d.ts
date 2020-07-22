/**
 * Saved card type
 * See https://oplata.tinkoff.ru/develop/api/autopayments/getcardlist-response/
 */
export interface Card {
  /**
   * Card ID in bank system
   */
  CardId: string;

  /**
   * PAN of card (last 4 digits)
   */
  Pan: string;

  /**
   * Expiration date of card
   */
  ExpDate: string;

  /**
   * Card type
   */
  CardType: CardType;

  /**
   * Card status
   */
  Status: CardStatus | string;

  /**
   * Rebill ID
   */
  RebillId?: string;
}

/**
 * Card type
 */
export enum CardType {
  /**
   * Write-off card
   */
  WRITE_OFF,

  /**
   * Top-up card
   */
  TOP_UP,

  /**
   * Write-off and top-up card
   */
  WRITE_OFF_AND_TOP_UP
}

/**
 * Card status
 */
export enum CardStatus {
  /**
   * Card is active
   */
  ACTIVE='A',

  /**
   * Card is inactive
   */
  INACTIVE='I'
}
