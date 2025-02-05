import { getServiceStandards } from '../services/service-standards.js'
import { getProjects } from '../services/projects.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import {
  fetcher,
  getApiUrl
} from '~/src/server/common/helpers/fetch/fetcher.js'
import { defaultServiceStandards } from '../data/service-standards.js'
import { defaultProjects } from '../data/projects.js'

export const adminController = {
  get: async (request, h) => {
    const logger = createLogger()
    try {
      const standards = await getServiceStandards()
      const projects = await getProjects()

      return h.view('admin/index', {
        pageTitle: 'Data Management',
        heading: 'Data Management',
        standardsCount: standards.length,
        projectsCount: projects.length,
        notification: request.query.notification
      })
    } catch (error) {
      logger.error('Error in admin controller:', error)
      throw error
    }
  },

  seedStandards: async (request, h) => {
    const logger = createLogger()
    try {
      const apiUrl = getApiUrl()
      await fetcher(`${apiUrl}/serviceStandards/seed`, {
        method: 'POST',
        body: JSON.stringify(defaultServiceStandards)
      })
      logger.info('Service standards seeded successfully')
      return h.redirect('/admin?notification=Standards seeded successfully')
    } catch (error) {
      logger.error('Failed to seed standards:', error)
      return h.redirect('/admin?notification=Failed to seed standards')
    }
  },

  deleteStandards: async (request, h) => {
    const logger = createLogger()
    try {
      const apiUrl = getApiUrl()
      const response = await fetcher(`${apiUrl}/serviceStandards/seed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([])
      })

      if (!response.ok) {
        throw new Error(`Failed to delete standards: ${response.statusText}`)
      }

      logger.info(
        { status: response.status },
        'Service standards deleted successfully'
      )
      return h.redirect('/admin?notification=Standards deleted successfully')
    } catch (error) {
      logger.error(
        {
          error: error.message,
          stack: error.stack,
          code: error.code
        },
        'Failed to delete standards'
      )
      return h.redirect('/admin?notification=Failed to delete standards')
    }
  },

  seedProjects: async (request, h) => {
    const logger = createLogger()
    try {
      const apiUrl = getApiUrl()
      await fetcher(`${apiUrl}/projects/seedData`, {
        method: 'POST',
        body: JSON.stringify(defaultProjects)
      })
      logger.info('Projects seeded successfully')
      return h.redirect('/admin?notification=Projects seeded successfully')
    } catch (error) {
      logger.error('Failed to seed projects:', error)
      return h.redirect('/admin?notification=Failed to seed projects')
    }
  },

  deleteProjects: async (request, h) => {
    const logger = createLogger()
    try {
      const apiUrl = getApiUrl()
      await fetcher(`${apiUrl}/projects/deleteAll`, {
        method: 'POST'
      })
      logger.info('Projects deleted successfully')
      return h.redirect('/admin?notification=Projects deleted successfully')
    } catch (error) {
      logger.error('Failed to delete projects:', error)
      return h.redirect('/admin?notification=Failed to delete projects')
    }
  }
}
