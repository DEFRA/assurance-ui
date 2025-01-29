import { serveStaticFiles } from './serve-static-files.js'
import { statusCodes } from '../constants/status-codes.js'
import { createServer } from '../../index.js'

describe('#serveStaticFiles', () => {
  let server

  beforeEach(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterEach(async () => {
    await server.stop()
  })

  describe('When secure context is disabled', () => {
    test('Should serve favicon as expected', async () => {
      const mockServer = {
        register: jest.fn().mockResolvedValue(),
        route: jest.fn()
      }

      await serveStaticFiles.plugin.register(mockServer)

      expect(mockServer.route).toHaveBeenCalledWith(
        expect.objectContaining({
          method: 'GET',
          path: '/govuk-frontend/{param*}'
        })
      )
    })

    test('Should serve assets as expected', async () => {
      const { statusCode } = await server.inject({
        method: 'GET',
        url: '/public/assets/images/govuk-crest.svg'
      })

      expect(statusCode).toBe(statusCodes.ok)
    })
  })
})
