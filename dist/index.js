var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "debug", "crypto", "lodash", "axios"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const debug_1 = __importDefault(require("debug"));
    const crypto = __importStar(require("crypto"));
    const _ = __importStar(require("lodash"));
    const axios_1 = __importDefault(require("axios"));
    /**
     * Tinkoff API connector
     */
    class TinkoffAPI {
        /**
         * Constructor
         *
         * @param terminalKey - unique terminal identifier
         * @param secretKey - secret terminal key
         */
        constructor(terminalKey, secretKey) {
            // Api endpoint
            this.apiUrl = 'https://securepay.tinkoff.ru/v2/';
            // Access timeout in milliseconds (10 seconds)
            this.timeout = 10000;
            this.terminalKey = terminalKey;
            this.secretKey = secretKey;
            debug_1.default(`Initialized with terminalKey=${this.terminalKey}`);
        }
        /**
         * Initialize the payment
         *
         * @param params - params for Init method except TerminalKey and Token
         */
        initPayment(params) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    this.checkInitPayment(params);
                    const response = (yield this.requestMethod('Init', params));
                    return response;
                }
                catch (error) {
                    debug_1.default(`${error}`);
                }
            });
        }
        /**
         * Add customer to the shop
         *
         * @param params - params for add customer method
         */
        addCustomer(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = (yield this.requestMethod('AddCustomer', params));
                return response;
            });
        }
        /**
         * Get customer info
         *
         * @param params - params for get customer request
         */
        getCustomer(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = (yield this.requestMethod('GetCustomer', params));
                return response;
            });
        }
        /**
         * Remove customer
         *
         * @param params - params for remove customer request
         */
        removeCustomer(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = (yield this.requestMethod('RemoveCustomer', params));
                return response;
            });
        }
        /**
         * Get customer's cards info
         *
         * @param params - params for get customer's cards request
         */
        getCardList(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = (yield this.requestMethod('GetCardList', params));
                return response;
            });
        }
        /**
         * Charge
         *
         * @param params - params for charge request
         */
        charge(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = (yield this.requestMethod('Charge', params));
                return response;
            });
        }
        /**
         * Confirm 2-staged payment
         *
         * @param params - params for Confirm method except TerminalKey and Token
         */
        confirmPayment(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = (yield this.requestMethod('Confirm', params));
                return response;
            });
        }
        /**
         * Cancel 2-staged payment
         *
         * @param params - params for Cancel method except TerminalKey and Token
         */
        cancelPayment(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = (yield this.requestMethod('Cancel', params));
                return response;
            });
        }
        /**
         * Get state of payment
         *
         * @param params - params for GetState method except TerminalKey and Token
         */
        paymentState(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = (yield this.requestMethod('GetState', params));
                return response;
            });
        }
        /**
         * Resend unprocessed notifications
         *
         * @param params - params for Resend method except TerminalKey and Token
         */
        resendPayment(params) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = (yield this.requestMethod('Resend', params));
                return response;
            });
        }
        /**
         * Generate signature token
         * Docs: https://oplata.tinkoff.ru/develop/api/request-sign/
         *
         * @param params - method parameters (key-value) excluding Receipt and DATA
         */
        generateToken(params) {
            let tokenParams = Object.assign({}, params);
            if ('Receipt' in tokenParams) {
                delete tokenParams.Receipt;
            }
            if ('DATA' in tokenParams) {
                delete tokenParams['DATA'];
            }
            if ('Token' in tokenParams) {
                delete tokenParams['Token'];
            }
            tokenParams = Object.assign(Object.assign({}, tokenParams), { Password: this.secretKey });
            const pairs = _.toPairs(tokenParams);
            const sortedPairs = _.sortBy(pairs, pair => pair[0]);
            const concatenatedValues = _.reduce(sortedPairs, (result, pair) => result + pair[1], '');
            const token = crypto
                .createHash('sha256')
                .update(concatenatedValues)
                .digest('hex');
            debug_1.default(`generateToken digest is ${token}`);
            return token;
        }
        /**
         * Request API method
         *
         * @param methodName - method name
         * @param params - params for method except TerminalKey and Token
         */
        requestMethod(methodName, params) {
            return __awaiter(this, void 0, void 0, function* () {
                const methodUrl = `${this.apiUrl}${methodName}`;
                const methodParams = Object.assign(Object.assign({}, params), { TerminalKey: this.terminalKey });
                methodParams.Token = this.generateToken(methodParams);
                debug_1.default(`Send '${methodName}' with ${methodParams}`);
                const response = yield axios_1.default.post(methodUrl, methodParams, {
                    timeout: this.timeout,
                });
                if (response.status !== 200) {
                    throw new Error(`[Error code is ${response.status}] ${JSON.stringify(response.data)}`);
                }
                if (!response.data.Success) {
                    debug_1.default(`Error: [${response.data.Message}] ${JSON.stringify(response.data)}`);
                }
                return response.data;
            });
        }
        /**
         * Check parameters for init request
         *
         * @param params - params for check
         */
        checkInitPayment(params) {
            if (!params.Amount) {
                throw new Error('Not specified `Amount` parameter: order amount as number in kopecks');
            }
        }
    }
    exports.default = TinkoffAPI;
});
