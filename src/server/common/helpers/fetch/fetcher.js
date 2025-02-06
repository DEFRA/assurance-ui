import pino from 'pino'
import { loggerOptions } from '~/src/server/common/helpers/logging/logger-options.js'
import { config } from '~/src/config/config.js'

const logger = pino(loggerOptions)

export function getApiUrl() {
  const apiUrl = config.get('api.baseUrl')
  return apiUrl
}

async function fetcher(url, options = {}) {
  const fullUrl = url.startsWith('http') ? url : `${getApiUrl()}${url}`


  logger.info(`Making ${options?.method || 'get'} request to ${fullUrl}`)
  
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
      logger.error(`Request failed with status ${response.status}: ${fullUrl}`)
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      const data = await response.json()
      logger.info(
        `Request succeeded with status ${response.status}: ${fullUrl}`
      )
      return { ok: response.ok, status: response.status, data }
    }

    logger.info(`Request succeeded with status ${response.status}: ${fullUrl}`)
    return { ok: response.ok, status: response.status }
  } catch (error) {
    logger.error(`Request failed with error: ${error.message}, URL: ${fullUrl}`)
    throw error
  }
}

export { fetcher }
