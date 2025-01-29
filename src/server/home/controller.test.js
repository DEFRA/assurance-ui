import { getHome } from './controller.js'

describe('#homeController', () => {
  test('Should provide expected response', async () => {
    const h = {
      view: jest.fn().mockReturnValue({
        code: jest.fn().mockReturnValue('Technical Assurance Dashboard')
      })
    }

    await getHome({}, h)

    expect(h.view).toHaveBeenCalledWith(
      'home/index',
      expect.objectContaining({
        pageTitle: 'Technical Assurance Dashboard'
      })
    )
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
