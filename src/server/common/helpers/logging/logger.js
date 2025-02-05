import pino from 'pino'
import ecsFormat from '@elastic/ecs-pino-format'

export function createLogger(name = 'assurance-ui') {
  const serviceVersion = process.env.SERVICE_VERSION ?? ''
  const level = process.env.LOG_LEVEL ?? 'info'

  return pino({
    name,
    level,
    ...ecsFormat(), // Use Elastic Common Schema format
    mixin: () => ({
      'service.version': serviceVersion
    }),
    formatters: {
      level: (label) => ({ log: { level: label } })
    }
  })
}
