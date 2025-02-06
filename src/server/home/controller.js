import { fetch as undiciFetch } from 'undici'

import { config } from '~/src/config/config.js'

/**
 * A GDS styled example home page controller.
 * @satisfies {Partial<ServerRoute>}
 */

export const homeController = {
  handler: async (request, h) => {
    const data = await undiciFetch(`${config.get('api.baseUrl')}/projects`)
      .then((response) => {
        request.logger.info(response, 'Fetching projects')
        return response.json()
      })
      .catch(request.logger.error)

    return h.view('home/index', {
      pageTitle: 'DDTS Technical Assurance Dashboard',
      heading: 'DDTS Technical Assurance Dashboard',
      projects: data
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
