/**
 * Taxation system
 */
export enum Taxation {
  /**
   * General
   */
  OSN='osn',

  /**
   * Simplified (income)
   */
  USN_INCOME='usn_income',

  /**
   * Simplified (income minus expenses)
   */
  USN_INCOME_OUTCOME='usn_income_outcome',

  /**
   * Patent
   */
  PATENT='patent',

  /**
   * A single tax on imputed income
   */
  ENVD='envd',

  /**
   * A single agricultural tax
   */
  ESN='esn'
}
