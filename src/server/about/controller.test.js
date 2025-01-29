import { getAbout } from './controller.js'

describe('#aboutController', () => {
  test('Should provide expected response', async () => {
    const h = {
      view: jest.fn().mockReturnValue({
        code: jest.fn().mockReturnValue('About')
      })
    }

    await getAbout({}, h)

    expect(h.view).toHaveBeenCalledWith('about/index', {
      pageTitle: 'About'
    })
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
