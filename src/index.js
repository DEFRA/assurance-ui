import process from 'node:process'
import 'dotenv/config'

import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { startServer } from '~/src/server/common/helpers/start-server.js'

const logger = createLogger()
logger.info('Projects data loaded:', process.env.PROJECTS_DATA ? 'yes' : 'no')

await startServer()

process.on('unhandledRejection', (error) => {
  logger.info('Unhandled rejection')
  logger.error(error)
  process.exitCode = 1
})
