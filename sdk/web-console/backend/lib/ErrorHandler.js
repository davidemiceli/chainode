'use strict';
/*
 Error response handling
*/


// Error codes
const ERROR_CODES = {
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  RequestEntityTooLarge: 413,
  RequesturiTooLarge: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  RequestedRangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  UnorderedCollection: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  BandwidthLimitExceeded: 509,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};

// Error handler
class ErrorHandler {

  constructor(res) {
    this.res = res;

    // Extend error handler with all error codes
    for (const err_name in ERROR_CODES) {
      this[err_name] = function(errmsg) {
        const status_code = Number(ERROR_CODES[err_name]);
        const err_message = errmsg || (err_name.split(/(?=[A-Z])/)).join(' ');
        const err_resp = {
          code: status_code,
          type: err_name,
          message: errmsg || err_name
        }
        return this.res.status(status_code).json(err_resp);
      }
    }

  }

}

module.exports = ErrorHandler;
