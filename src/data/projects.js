import { createLogger } from '~/src/server/common/helpers/logging/logger.js'

const logger = createLogger()
let projects = []

try {
  projects = JSON.parse(process.env.PROJECTS_DATA ?? '[]')
  if (!Array.isArray(projects)) {
    logger.error('PROJECTS_DATA must be a JSON array')
    projects = []
  }
} catch (error) {
  logger.error('Failed to parse PROJECTS_DATA:', error)
  projects = []
}

export { projects }
