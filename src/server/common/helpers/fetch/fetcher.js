import { fetch } from 'undici'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { config } from '~/src/config/config.js'

export function getApiUrl() {
  return config.get('api.baseUrl')
}

async function fetcher(url, options = {}) {
  const logger = createLogger()

  logger.debug(
    {
      url,
      method: options?.method || 'get',
      headers: options?.headers
    },
    'Making API request'
  )

  try {
    const response = await fetch(url, {
      ...options,
      method: options?.method ?? 'get',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    // Only try to parse JSON if there's content
    const contentType = response.headers.get('content-type')
    if (contentType?.includes('application/json')) {
      const data = await response.json()
      logger.debug(
        {
          status: response.status,
          url
        },
        'API request successful'
      )
      return { ok: response.ok, status: response.status, data }
    }

    return { ok: response.ok, status: response.status }
  } catch (error) {
    logger.error(
      {
        error: error.message,
        stack: error.stack,
        code: error.code,
        url
      },
      'API request failed'
    )
    throw error
  }
}

export { fetcher }
