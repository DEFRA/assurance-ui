/**
 * A GDS styled example home page controller.
 * @satisfies {Partial<ServerRoute>}
 */
import { getProjects } from '../services/projects.js'

export const homeController = {
  handler: async (request, h) => {
    const projects = await getProjects()

    return h.view('home/index', {
      pageTitle: 'DDTS Technical Assurance Dashboard',
      heading: 'DDTS Technical Assurance Dashboard',
      projects: projects.map((project) => ({
        id: project.id,
        name: project.name,
        status: project.status,
        lastUpdated: project.lastUpdated,
        actions: 'View details'
      }))
    })
  }
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
