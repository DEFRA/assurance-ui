/**
 * A GDS styled example home page controller.
 * Provided as an example, remove or modify as required.
 * @satisfies {Partial<ServerRoute>}
 */
import { projects } from '../../data/projects.js'

export function getHome(request, h) {
  return h.view('home/index', {
    pageTitle: 'Technical Assurance Dashboard',
    projects
  })
}

/**
 * @import { ServerRoute } from '@hapi/hapi'
 */
