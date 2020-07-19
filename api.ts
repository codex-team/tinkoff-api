import debug from 'debug';
import * as crypto from 'crypto';
import * as _ from 'lodash';
import axios from 'axios';
import {
  Request,
  Response,
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
} from './types';

/**
 * Tinkoff API connector
 */
export default class TinkoffAPI {
  /**
   *
   */
  private readonly apiUrl: string;

  /**
   *
   */
  private readonly timeout: number;

  /**
   *
   */
  private readonly terminalKey: string;

  /**
   *
   */
  private readonly secretKey: string;

  /**
   * Constructor
   *
   * @param terminalKey - unique terminal identifier
   * @param secretKey - secret terminal key
   */
  constructor(terminalKey: string, secretKey: string) {
    // Api endpoint
    this.apiUrl = 'https://securepay.tinkoff.ru/v2/';
    // Access timeout in milliseconds (10 seconds)
    this.timeout = 10000;

    this.terminalKey = terminalKey;
    this.secretKey = secretKey;

    debug(`Initialized with terminalKey=${this.terminalKey}`);
  }

  /**
   * Initialize the payment
   *
   * @param params - params for Init method except TerminalKey and Token
   */
  public async initPayment(params: InitPaymentRequest): Promise<InitPaymentResponse> {
    try {
      this.checkInitPayment(params);

      const response = (await this.requestMethod('Init', params)) as InitPaymentResponse;

      return response;
    } catch (error) {
      debug(`${error}`);
    }
  }

  /**
   * Add customer to the shop
   *
   * @param params - params for add customer method
   */
  public async addCustomer(params: AddCustomerRequest): Promise<AddCustomerResponse> {
    const response = (await this.requestMethod('AddCustomer', params)) as AddCustomerResponse;

    return response;
  }

  /**
   * Get customer info
   *
   * @param params - params for get customer request
   */
  public async getCustomer(params: GetCustomerRequest): Promise<GetCustomerResponse> {
    const response = (await this.requestMethod('GetCustomer', params)) as GetCustomerResponse;

    return response;
  }

  /**
   * Remove customer
   *
   * @param params - params for remove customer request
   */
  public async removeCustomer(params: RemoveCustomerRequest): Promise<RemoveCustomerResponse> {
    const response = (await this.requestMethod('RemoveCustomer', params)) as RemoveCustomerResponse;

    return response;
  }

  /**
   * Get customer's cards info
   *
   * @param params - params for get customer's cards request
   */
  public async getCardList(params: GetCardListRequest): Promise<GetCardListResponse> {
    const response = (await this.requestMethod('GetCardList', params)) as GetCardListResponse;

    return response;
  }

  /**
   * Charge
   *
   * @param params - params for charge request
   */
  public async charge(params: ChargeRequest): Promise<ChargeResponse> {
    const response = (await this.requestMethod('Charge', params)) as ChargeResponse;

    return response;
  }

  /**
   * Confirm 2-staged payment
   *
   * @param params - params for Confirm method except TerminalKey and Token
   */
  public async confirmPayment(params: ConfirmPaymentRequest): Promise<ConfirmPaymentResponse> {
    const response = (await this.requestMethod('Confirm', params)) as ConfirmPaymentResponse;

    return response;
  }

  /**
   * Cancel 2-staged payment
   *
   * @param params - params for Cancel method except TerminalKey and Token
   */
  public async cancelPayment(params: CancelPaymentRequest): Promise<CancelPaymentResponse> {
    const response = (await this.requestMethod('Cancel', params)) as CancelPaymentResponse;

    return response;
  }

  /**
   * Get state of payment
   *
   * @param params - params for GetState method except TerminalKey and Token
   */
  public async paymentState(params: PaymentStateRequest): Promise<PaymentStateResponse> {
    const response = (await this.requestMethod('GetState', params)) as PaymentStateResponse;

    return response;
  }

  /**
   * Resend unprocessed notifications
   *
   * @param params - params for Resend method except TerminalKey and Token
   */
  public async resendPayment(params: ResendPaymentRequest): Promise<ResendPaymentResponse> {
    const response = (await this.requestMethod('Resend', params)) as ResendPaymentResponse;

    return response;
  }

  /**
   * Request API method
   *
   * @param methodName - method name
   * @param params - params for method except TerminalKey and Token
   */
  private async requestMethod(methodName: string, params: Request): Promise<Response> {
    const methodUrl = `${this.apiUrl}${methodName}`;
    const methodParams = {
      ...params,
      TerminalKey: this.terminalKey,
    };

    methodParams.Token = this.generateToken(methodParams);

    debug("Send '%s' with %o", methodName, methodParams);

    const response = await axios.post(methodUrl, methodParams, {
      timeout: this.timeout,
    });

    if (response.status !== 200) {
      throw new Error(
        `[Error code is ${response.status}] ${JSON.stringify(response.data)}`
      );
    }

    if (!response.data.Success) {
      debug(`Error: [${response.data.Message}] ${JSON.stringify(response.data)}`);
    }

    return response.data;
  }

  /**
   * Generate signature token
   * Docs: https://oplata.tinkoff.ru/develop/api/request-sign/
   *
   * @param params - method parameters (key-value) excluding Receipt and DATA
   */
  private generateToken(params: Request): string {
    const tokenParams = {
      ...params,
    };

    delete tokenParams['Receipt'];
    delete tokenParams['DATA'];
    delete tokenParams['Token'];

    tokenParams['Password'] = this.secretKey;
    const pairs = _.toPairs(tokenParams);
    const sortedPairs = _.sortBy(pairs, pair => pair[0]);
    const concatenatedValues = _.reduce(
      sortedPairs,
      (result, pair) => result + pair[1],
      ''
    );

    const token = crypto
      .createHash('sha256')
      .update(concatenatedValues)
      .digest('hex');

    debug(`generateToken digest is ${token}`);

    return token;
  }

  /**
   * Check parameters for init request
   *
   * @param params - params for check
   */
  private checkInitPayment(params: InitPaymentRequest): void {
    if (!params.Amount) {
      throw new Error(
        'Not specified `Amount` parameter: order amount as number in kopecks'
      );
    }
  }
}
