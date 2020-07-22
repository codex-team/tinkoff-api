import { InitPaymentRequest, InitPaymentResponse } from './requests/initPayment';
import { AddCustomerRequest, AddCustomerResponse } from './requests/addCustomer';
import { GetCustomerRequest, GetCustomerResponse } from './requests/getCustomer';
import { RemoveCustomerRequest, RemoveCustomerResponse } from './requests/removeCustomer';
import { GetCardListRequest, GetCardListResponse } from './requests/getCardList';
import { ChargeRequest, ChargeResponse } from './requests/charge';
import { ConfirmPaymentRequest, ConfirmPaymentResponse } from './requests/confirmPayment';
import { CancelPaymentRequest, CancelPaymentResponse } from './requests/cancelPayment';
import { PaymentStateRequest, PaymentStateResponse } from './requests/paymentState';
import { ResendPaymentRequest, ResendPaymentResponse } from './requests/resendPayment';
import { AgentData } from './agent/agentData';
import { AgentSign } from './agent/agentSign';
import { PaymentObject } from './payment/paymentObject';
import { PaymentMethod } from './payment/paymentMethod';
import { Card, CardType, CardStatus } from './utilities/card';
import { Item } from './utilities/item';
import { Language } from './utilities/language';
import { PayType } from './utilities/payType';
import { Receipt } from './utilities/receipt';
import { SupplierInfo } from './utilities/supplierInfo';
import { Taxation } from './utilities/taxation';
import { Tax } from './utilities/tax';

/**
 * Types of request
 */
export type Request = InitPaymentRequest |
  AddCustomerRequest |
  GetCustomerRequest |
  RemoveCustomerRequest |
  GetCardListRequest |
  ChargeRequest |
  ConfirmPaymentRequest |
  CancelPaymentRequest |
  PaymentStateRequest |
  ResendPaymentRequest;

/**
 * Types of response
 */
export type Response = InitPaymentResponse |
  AddCustomerResponse |
  GetCustomerResponse |
  RemoveCustomerResponse|
  GetCardListResponse |
  ChargeResponse |
  ConfirmPaymentResponse |
  CancelPaymentResponse |
  PaymentStateResponse |
  ResendPaymentResponse;

/**
 * Export request and response types
 */
export {
  InitPaymentRequest,
  InitPaymentResponse,
  AddCustomerRequest,
  AddCustomerResponse,
  GetCustomerRequest,
  GetCustomerResponse,
  RemoveCustomerRequest,
  RemoveCustomerResponse,
  GetCardListRequest,
  GetCardListResponse,
  ChargeRequest,
  ChargeResponse,
  ConfirmPaymentRequest,
  ConfirmPaymentResponse,
  CancelPaymentRequest,
  CancelPaymentResponse,
  PaymentStateRequest,
  PaymentStateResponse,
  ResendPaymentRequest,
  ResendPaymentResponse
};

/**
 * Export agent types
 */
export {
  AgentData,
  AgentSign
};

/**
 * Export payment types
 */
export {
  PaymentMethod,
  PaymentObject
};

/**
 * Export card types
 */
export {
  Card,
  CardType,
  CardStatus
};

/**
 * Export item types
 */
export {
  Item
};

/**
 * Export available languages
 */
export {
  Language
};

/**
 * Export pay types
 */
export {
  PayType
};

/**
 * Export receipt types
 */
export {
  Receipt
};

/**
 * Export supplier info type
 */
export {
  SupplierInfo
};

/**
 * Export tax types
 */
export {
  Tax,
  Taxation
};
