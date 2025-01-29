import { getProjects, getProjectDetails } from './controller.js'

export const routes = [
  {
    method: 'GET',
    path: '/projects',
    handler: getProjects
  },
  {
    method: 'GET',
    path: '/projects/{id}',
    handler: getProjectDetails
  }
]
