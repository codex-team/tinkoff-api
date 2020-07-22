import { PaymentMethod } from '../payment/paymentMethod';
import { PaymentObject } from '../payment/paymentObject';
import { Tax } from './tax';
import { SupplierInfo } from './supplierInfo';
import { AgentData } from '../agent/agentData';

/**
 * Item position with product information
 */
export interface Item {
  /**
   * Product name
   */
  Name: string;

  /**
   * Unit price in kopecks
   */
  Price: number;

  /**
   * Count or weight of product
   */
  Quantity: number;

  /**
   * Product cost in kopecks (Price * Quantity)
   */
  Amount: number;

  /**
   * Indicator of the method of payment
   */
  PaymentMethod?: PaymentMethod;

  /**
   * The attribute of the subject of payment
   */
  PaymentObject?: PaymentObject;

  /**
   * Tax for payment
   */
  Tax: Tax;

  /**
   * Product labeling
   */
  Ean13?: string;

  /**
   * Shop code
   */
  ShopCode?: string;

  /**
   * Agent data
   */
  AgentData?: AgentData;

  /**
   * Payment agent provider details
   * Required if the AgentSign value is passed in the AgentData object
   */
  SupplierInfo?: SupplierInfo;
}
