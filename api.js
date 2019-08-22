const debug = require('debug')('tinkoff-merchant');
const crypto = require('crypto');
const _ = require('lodash');
const request = require('request');

class TinkoffAPI {

  /**
   * Constructor
   * @param {String} terminalKey Unique terminal identifier
   * @param {String} secretKey Secret terminal key
   */
  constructor(terminalKey, secretKey) {
    // Api endpoint
    this.apiUrl = "https://securepay.tinkoff.ru/v2/";
    this.terminalKey = terminalKey;
    this.secretKey = secretKey;

    debug(`initialized with terminalKey=${this.terminalKey}`);
  }

  /**
   * Initialize the payment
   * @param {Object} params Params for Init method except TerminalKey and Token
   * @returns {Promise}
   */
  init(params) {
    return this.checkInitRequest(params).then((params) => this.requestMethod('Init', params));
  }

  /**
   * Confirm 2-staged payment
   * @param {Object} params Params for Confirm method except TerminalKey and Token
   * @returns {Promise}
   */
  confirm(params) {
    return this.requestMethod('Confirm', params);
  }

  /**
   * Cancel 2-staged payment
   * @param {Object} params Params for Cancel method except TerminalKey and Token
   * @returns {Promise}
   */
  cancel(params) {
    return this.requestMethod('Cancel', params);
  }

  /**
   * Get state of payment
   * @param {Object} params Params for GetState method except TerminalKey and Token
   * @returns {Promise}
   */
  getState(params) {
    return this.requestMethod('GetState', params);
  }

  /**
   * Resend unprocessed notifications
   * @param {Object} params Params for Resend method except TerminalKey and Token
   * @returns {Promise}
   */
  resend(params) {
    return this.requestMethod('Resend', params);
  }

  /**
   * Request API method
   * @param {String} methodName Method name
   * @param {Object} params Params for method except TerminalKey and Token
   * @returns {Promise}
   */
  requestMethod(methodName, params) {
    const methodUrl = `${this.apiUrl}${methodName}`;
    const methodParams = Object.assign({}, params);
    methodParams.TerminalKey = this.terminalKey;
    methodParams.Token = this.generateToken(methodParams);

    const requestPromise = new Promise((resolve, reject) => {
      debug('send \'%s\' with %o', methodName, methodParams);

      request({
        uri: methodUrl,
        method: 'POST',
        body: methodParams,
        json: true,
        gzip: true,
        timeout: 25000
      }, (err, response, body) => {
        if (err) {
          reject(err);
        } else {
          if (response.statusCode == 200) {
            if (!body.Success) {
              reject(`[Error code is ${body.ErrorCode}] ${JSON.stringify(body)}`)
            }
            resolve(body);
          }
          reject(`[Error code is ${response.statusCode}] ${body}`);
        }
      });
    });

    return requestPromise;
  }

  /**
   * Generate signature token
   * Docs: https://oplata.tinkoff.ru/landing/develop/documentation/request_sign
   * @param {Object} params Method parameters (key-value) excluding Receipt and DATA
   * @returns {String} SHA-256 digest Token
   */
  generateToken(params) {
    const tokenParams = Object.assign({}, params);
    tokenParams.Password = this.secretKey;
    const pairs = _.toPairs(tokenParams);
    const sortedPairs = _.sortBy(pairs, pair => pair[0]);
    const concatenatedValues = _.reduce(sortedPairs, (result, pair) => result + pair[1], '');
    const token = crypto.createHash('sha256').update(concatenatedValues).digest('hex');
    debug(`generateToken digest is ${token}`);

    return token;
  }

  checkInitRequest(params) {
    return new Promise((resolve, reject) => {
      if (!(params.Amount)) { return reject("Not specified `Amount` parameter: order amount as number in kopecks"); }
      if (!(params.OrderId)) { return reject("Not specified `OrderId` parameter: unique order identifier"); }

      return resolve(params);
    });
  }

}

module.exports = TinkoffAPI;
