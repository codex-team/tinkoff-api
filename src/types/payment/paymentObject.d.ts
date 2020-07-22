/**
 * The attribute of the subject of payment
 */
export enum PaymentObject {
  /**
   * Product
   */
  COMMODITY='commodity',

  /**
   * Excisable product
   */
  EXCISE='excise',

  /**
   * Job
   */
  JOB='job',

  /**
   * Service
   */
  SERVICE='service',

  /**
   * Gambling bet
   */
  GAMBLING_BET='gambling_bet',

  /**
   * Gambling prize
   */
  GAMBLING_PRIZE='gambling_prize',

  /**
   * Lottery ticket
   */
  LOTTERY='lottery',

  /**
   * Lottery prize
   */
  LOTTERY_PRIZE='lottery_prize',

  /**
   * Provision of the results of intellectual activity
   */
  INTELLECTUAL_ACTIVITY='intellectual_activity',

  /**
   * Payment
   */
  PAYMENT='payment',

  /**
   * Agent commission
   */
  AGENT_COMMISSION='agent_commission',

  /**
   * Compound subject of payment
   */
  COMPOSITE='composite',

  /**
   * Another object of payment
   */
  ANOTHER='another'
}
