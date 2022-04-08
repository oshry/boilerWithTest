import { Logger, configure, getLogger } from 'log4js'

import { LoggerConfiguration } from '../models/Configuration'

/**
 * Logger Factory configures loggers and creates named instances used for specific logging
 */
class LoggerFactory {
  /**
   * Request ID of the given request
   */
  static requestId: string

  constructor(config: LoggerConfiguration) {
    configure({
      appenders: {
        app: {
          type: 'console',
          layout: {
            type: 'pattern',
            pattern: config.pattern,
            tokens: {
              requestid: contextMDC
            }
          }
        }
      },
      categories: {
        default: {
          appenders: [
            'app'
          ],
          level: config.level
        }
      }
    })
  }

  /**
   * Set the request ID for the current invocation
   */
  public setRequestId(requestId: string): void {
    LoggerFactory.requestId = requestId
  }

  /**
   * Get a configured and named logger instance
   */
  public getNamedLogger(namedLogger: string): Logger {
    return getLogger(namedLogger)
  }
}

function contextMDC(_logEvent: any) {
  return LoggerFactory.requestId ?? 'ROOT'
}

export { LoggerFactory }
