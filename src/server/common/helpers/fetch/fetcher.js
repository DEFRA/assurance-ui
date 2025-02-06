import { fetch } from 'undici'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { config } from '~/src/config/config.js'

export function getApiUrl() {
  const apiUrl = config.get('api.baseUrl')
  const logger = createLogger()
  logger.info({ apiUrl }, 'API URL resolved')
  return apiUrl
}

async function fetcher(url, options = {}) {
  const logger = createLogger()
  const fullUrl = url.startsWith('http') ? url : `${getApiUrl()}${url}`

  logger.debug(
    {
      fullUrl,
      originalUrl: url,
      baseApiUrl: getApiUrl(),
      method: options?.method || 'get',
      headers: {
        ...options?.headers,
        'Content-Type': 'application/json'
      }
    },
    'Attempting API request'
  )

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
      logger.error(
        {
          status: response.status,
          statusText: response.statusText,
          url: fullUrl,
          responseHeaders: Object.fromEntries(response.headers.entries()),
          requestHeaders: options.headers
        },
        'API request failed with error response'
      )
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Only try to parse JSON if there's content
    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      const data = await response.json()
      logger.debug(
        {
          status: response.status,
          url: fullUrl,
          responseHeaders: Object.fromEntries(response.headers.entries()),
          dataPreview: JSON.stringify(data).slice(0, 200) + '...'
        },
        'API request successful with JSON response'
      )
      return { ok: response.ok, status: response.status, data }
    }

    logger.debug(
      {
        status: response.status,
        url: fullUrl,
        contentType
      },
      'API request successful with non-JSON response'
    )
    return { ok: response.ok, status: response.status }
  } catch (error) {
    logger.error(
      {
        error: error.message,
        stack: error.stack,
        code: error.code,
        url: fullUrl,
        baseApiUrl: getApiUrl(),
        nodeEnv: process.env.NODE_ENV,
        requestHeaders: options.headers
      },
      'API request failed with exception'
    )
    throw error
  }
}

export { fetcher }
