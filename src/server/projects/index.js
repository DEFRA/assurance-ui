import { routes } from './routes.js'

export const projects = {
  plugin: {
    name: 'projects',
    register: (server) => {
      server.route(routes)
    }
  }
}
