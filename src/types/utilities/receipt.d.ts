import { Item } from './item';
import { Taxation } from './taxation';

/**
 * Receipt data
 */
export interface Receipt {
  /**
   * Email of buyer
   * Required if Phone field is undefined
   */
  Email?: string;

  /**
   * Phone of buyer
   * Required if Email field is undefined
   */
  Phone?: string;

  /**
   * Company email
   */
  EmailCompany?: string;

  /**
   * Taxation system
   */
  Taxation: Taxation;

  /**
   * An array of check items with product information
   */
  Items: Item[];
}
