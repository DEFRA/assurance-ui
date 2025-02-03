/**
 * A GDS styled example home page controller.
 * Provided as an example, remove or modify as required.
 * @satisfies {Partial<ServerRoute>}
 */
export const homeController = {
  handler: (request, h) => {
    return h.view('home/index', {
      pageTitle: 'DDTS Technical Assurance Dashboard',
      heading: 'DDTS Technical Assurance Dashboard',
      projects: [
        {
          name: 'CDP Platform',
          status: 'AMBER',
          lastUpdated: '15 March 2024',
          actions: 'View details'
        },
        {
          name: 'ELM Payment Services',
          status: 'GREEN',
          lastUpdated: '10 March 2024',
          actions: 'View details'
        }
      ]
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
