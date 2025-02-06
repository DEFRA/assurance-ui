import { fetch } from 'undici'
import pino from 'pino'
import { loggerOptions } from '~/src/server/common/helpers/logging/logger-options.js'
import { config } from '~/src/config/config.js'

const logger = pino(loggerOptions)

export function getApiUrl() {
  const apiUrl = config.get('api.baseUrl')
  logger.info({
    '@timestamp': new Date().toISOString(),
    message: 'API URL resolved',
    http: {
      url: {
        path: apiUrl
      }
    }
  })
  return apiUrl
}

async function fetcher(url, options = {}) {
  const fullUrl = url.startsWith('http') ? url : `${getApiUrl()}${url}`

  logger.info({
    '@timestamp': new Date().toISOString(),
    message: 'Attempting API request',
    http: {
      request: {
        method: options?.method || 'get'
      },
      url: {
        path: fullUrl
      }
    },
    req: {
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json'
      }
    },
    service: {
      name: config.get('serviceName'),
      version: config.get('serviceVersion')
    }
  })

  try {
    const response = await fetch(fullUrl, {
      ...options,
      method: options?.method ?? 'get',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    })

    if (!response.ok) {
      logger.info({
        '@timestamp': new Date().toISOString(),
        message: 'API request failed with error response',
        http: {
          response: {
            status_code: response.status
          },
          url: {
            path: fullUrl
          }
        },
        res: {
          statusCode: response.status,
          headers: Object.fromEntries(response.headers.entries())
        }
      })
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Only try to parse JSON if there's content
    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      const data = await response.json()
      logger.info(
        {
          '@timestamp': new Date().toISOString(),
          message: 'API request successful with JSON response',
          http: {
            response: {
              status_code: response.status
            },
            url: {
              path: fullUrl
            }
          },
          res: {
            statusCode: response.status,
            dataPreview: JSON.stringify(data).slice(0, 200) + '...'
          }
        },
        'API request successful with JSON response'
      )
      return { ok: response.ok, status: response.status, data }
    }

    logger.info(
      {
        '@timestamp': new Date().toISOString(),
        message: 'API request successful with non-JSON response',
        http: {
          response: {
            status_code: response.status
          },
          url: {
            path: fullUrl
          }
        },
        res: {
          statusCode: response.status,
          contentType
        }
      },
      'API request successful with non-JSON response'
    )
    return { ok: response.ok, status: response.status }
  } catch (error) {
    logger.info({
      '@timestamp': new Date().toISOString(),
      message: 'API request failed with exception',
      error: {
        message: error.message,
        stack: error.stack,
        code: error.code
      },
      http: {
        url: {
          path: fullUrl
        },
        baseApiUrl: getApiUrl(),
        nodeEnv: process.env.NODE_ENV,
        requestHeaders: options.headers
      }
    })
    throw error
  }
}

export { fetcher }
