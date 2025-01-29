import { config } from '~/src/config/config.js'
// import { statusCodes } from './status-codes.js'
import path from 'path'
import { fileURLToPath } from 'url'
import inert from '@hapi/inert'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const rootPath = path.resolve(dirname, '../../../../')

const mimeTypes = {
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.mjs': 'application/javascript',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
}

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const serveStaticFiles = {
  plugin: {
    name: 'staticFiles',
    async register(server) {
      await server.register(inert)

      // Serve all static files from node_modules/govuk-frontend
      server.route({
        method: 'GET',
        path: '/govuk-frontend/{param*}',
        handler: {
          directory: {
            path: path.resolve(rootPath, 'node_modules/govuk-frontend'),
            lookupCompressed: true
          }
        },
        options: {
          files: {
            relativeTo: path.resolve(rootPath, 'node_modules/govuk-frontend')
          },
          ext: {
            onPreResponse: {
              method: (request, h) => {
                const response = request.response
                if (response.isBoom) {
                  return h.continue
                }

                const ext = path.extname(request.path)
                if (mimeTypes[ext]) {
                  response.type(mimeTypes[ext])
                }

                return h.continue
              }
            }
          }
        }
      })

      // Serve application assets
      server.route({
        method: 'GET',
        path: `${config.get('assetPath')}/{param*}`,
        handler: {
          directory: {
            path: path.resolve(rootPath, '.public'),
            lookupCompressed: true
          }
        },
        options: {
          files: {
            relativeTo: path.resolve(rootPath, '.public')
          },
          ext: {
            onPreResponse: {
              method: (request, h) => {
                const response = request.response
                if (response.isBoom) {
                  return h.continue
                }

                const ext = path.extname(request.path)
                if (mimeTypes[ext]) {
                  response.type(mimeTypes[ext])
                }

                return h.continue
              }
            }
          }
        }
      })
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
