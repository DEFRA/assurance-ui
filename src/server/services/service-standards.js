import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { fetcher, getApiUrl } from '../common/helpers/fetch/fetcher.js'

export async function getServiceStandards() {
  const logger = createLogger()
  try {
    const apiUrl = getApiUrl()
    const endpoint = `${apiUrl}/serviceStandards`
    logger.info({ endpoint }, 'Fetching service standards from API')
    const { data } = await fetcher(endpoint)
    logger.info({ rawData: data }, 'Raw standards from API')
    logger.info(
      {
        standards: data.map((s) => ({
          id: s.id,
          number: s.number,
          name: s.name
        }))
      },
      'Service standards data structure'
    )
    return data
  } catch (error) {
    logger.error(
      {
        error: error.message,
        stack: error.stack,
        code: error.code
      },
      'Failed to fetch service standards'
    )
    return []
  }
}
