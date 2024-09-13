import { StorageResolution, Unit } from 'aws-embedded-metrics'

import { config } from '~/src/config/index.js'
import { metricsCounter } from '~/src/server/common/helpers/metrics.js'

const mockPutMetric = jest.fn()
const mockFlush = jest.fn()
const mockLoggerError = jest.fn()

jest.mock('aws-embedded-metrics', () => ({
  ...jest.requireActual('aws-embedded-metrics'),
  createMetricsLogger: () => ({
    putMetric: mockPutMetric,
    flush: mockFlush
  })
}))
jest.mock('~/src/server/common/helpers/logging/logger.js', () => ({
  createLogger: () => ({ error: (...args) => mockLoggerError(...args) })
}))
jest.mock('~/src/config/index.js')

const mockConfig = jest.mocked(config)
const mockValue = 200

describe('#metrics', () => {
  describe('When metrics is not enabled', () => {
    beforeEach(async () => {
      mockConfig.get.mockReturnValue(false)
      await metricsCounter('mock-metrics-name', mockValue)
    })

    test('Should not call metric', () => {
      expect(mockPutMetric).not.toHaveBeenCalled()
    })

    test('Should not call flush', () => {
      expect(mockFlush).not.toHaveBeenCalled()
    })
  })

  describe('When metrics is enabled', () => {
    beforeEach(async () => {
      mockConfig.get.mockReturnValue(true)
      await metricsCounter('mock-metrics-name', mockValue)
    })

    test('Should send metric', () => {
      expect(mockPutMetric).toHaveBeenCalledWith(
        'mock-metrics-name',
        mockValue,
        Unit.Count,
        StorageResolution.Standard
      )
    })

    test('Should not call flush', () => {
      expect(mockFlush).toHaveBeenCalled()
    })
  })

  describe('When metrics throws', () => {
    beforeEach(async () => {
      mockConfig.get.mockReturnValue(true)
      mockFlush.mockRejectedValue(new Error('mock-metrics-put-error'))

      await metricsCounter('mock-metrics-name', mockValue)
    })

    test('Should log expected error', () => {
      expect(mockLoggerError).toHaveBeenCalledWith(
        Error('mock-metrics-put-error'),
        'mock-metrics-put-error'
      )
    })
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
