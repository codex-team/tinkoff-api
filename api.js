const debug = require('debug')('tinkoff-merchant');
const crypto = require('crypto');
const _ = require('lodash');
const axios = require('axios');

/**
 * Tinkoff API connector
 */
class TinkoffAPI {
  /**
   * Constructor
   * @param {String} terminalKey Unique terminal identifier
   * @param {String} secretKey Secret terminal key
   */
  constructor(terminalKey, secretKey) {
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
   * @param {Object} params Params for Init method except TerminalKey and Token
   * @returns {Object} response from Tinkoff API
   */
  async initPayment(params) {
    try {
      await this.checkInitPayment(params);
      return await this.requestMethod('Init', params);
    } catch (error) {
      debug(`${error}`);
    }
  }

  /**
   * Confirm 2-staged payment
   * @param {Object} params Params for Confirm method except TerminalKey and Token
   * @returns {Promise}
   */
  confirmPayment(params) {
    return this.requestMethod('Confirm', params);
  }

  /**
   * Cancel 2-staged payment
   * @param {Object} params Params for Cancel method except TerminalKey and Token
   * @returns {Promise}
   */
  cancelPayment(params) {
    return this.requestMethod('Cancel', params);
  }

  /**
   * Get state of payment
   * @param {Object} params Params for GetState method except TerminalKey and Token
   * @returns {Promise}
   */
  paymentState(params) {
    return this.requestMethod('GetState', params);
  }

  /**
   * Resend unprocessed notifications
   * @param {Object} params Params for Resend method except TerminalKey and Token
   * @returns {Promise}
   */
  resendPayment(params) {
    return this.requestMethod('Resend', params);
  }

  /**
   * Request API method
   * @param {String} methodName Method name
   * @param {Object} params Params for method except TerminalKey and Token
   * @returns {Object} response from Tinkoff API
   */
  async requestMethod(methodName, params) {
    const methodUrl = `${this.apiUrl}${methodName}`;
    const methodParams = {
      ...params,
      TerminalKey: this.terminalKey
    };

    methodParams.Token = this.generateToken(methodParams);

    debug("Send '%s' with %o", methodName, methodParams);

    const response = await axios.post(methodUrl, methodParams, {
      json: true,
      timeout: this.timeout
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
   * Docs: https://oplata.tinkoff.ru/landing/develop/documentation/request_sign
   * @param {Object} params Method parameters (key-value) excluding Receipt and DATA
   * @returns {String} SHA-256 digest Token
   */
  generateToken(params) {
    const tokenParams = {
      ...params
    };
    delete tokenParams.Receipt;
    delete tokenParams.Data;
    delete tokenParams.Token;

    tokenParams.Password = this.secretKey;
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
   * @param {object} params
   * @returns {object} params
   */
  async checkInitPayment(params) {
    if (!params.Amount) {
      throw new Error(
        'Not specified `Amount` parameter: order amount as number in kopecks'
      );
    }
    if (!params.OrderId) {
      throw new Error(
        'Not specified `OrderId` parameter: unique order identifier'
      );
    }
  }
}

module.exports = TinkoffAPI;
