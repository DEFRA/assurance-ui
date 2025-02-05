import inert from '@hapi/inert'

import { health } from '~/src/server/health/index.js'
import { home } from '~/src/server/home/index.js'
import { serveStaticFiles } from '~/src/server/common/helpers/serve-static-files.js'
import { about } from '~/src/server/about/index.js'
import { projectController } from './projects/controller.js'
import { admin } from '~/src/server/admin/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const router = {
  plugin: {
    name: 'router',
    async register(server) {
      await server.register([inert])

      // Health-check route. Used by platform to check if service is running, do not remove!
      await server.register([health])

      // Application specific routes, add your own routes here
      await server.register([home, about, admin])

      // Static assets
      await server.register([serveStaticFiles])

      // Project details route
      server.route({
        method: 'GET',
        path: '/projects/{id}',
        handler: projectController.handler
      })
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
