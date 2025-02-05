import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { fetcher, getApiUrl } from '../common/helpers/fetch/fetcher.js'

export async function getProjects() {
  const logger = createLogger()
  try {
    const apiUrl = getApiUrl()
    const endpoint = `${apiUrl}/projects`
    logger.info({ endpoint }, 'Fetching projects from API')
    const { data } = await fetcher(endpoint)
    logger.info({ count: data.length }, 'Projects retrieved successfully')
    if (data.length > 0) {
      logger.info(
        {
          sampleProject: {
            id: data[0].id,
            standards: data[0].standards.map((s) => ({
              standardId: s.standardId,
              status: s.status
            }))
          }
        },
        'Sample project structure'
      )
    }
    return data
  } catch (error) {
    logger.error(
      {
        error: error.message,
        stack: error.stack,
        code: error.code
      },
      'Failed to fetch projects'
    )
    return []
  }
}
