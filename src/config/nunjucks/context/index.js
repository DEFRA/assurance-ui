import path from 'node:path'
import { readFileSync } from 'node:fs'

import { config } from '~/src/config/index.js'
import { createLogger } from '~/src/server/common/helpers/logging/logger.js'
import { buildNavigation } from '~/src/config/nunjucks/context/build-navigation.js'

const logger = createLogger()
const assetPath = config.get('assetPath')
const manifestPath = path.join(
  config.get('root'),
  '.public/assets-manifest.json'
)

/**
 * @param {Request | null} request
 */
export function context(request) {
  /** @type {Record<string, string> | undefined} */
  let webpackManifest

  try {
    webpackManifest = JSON.parse(readFileSync(manifestPath, 'utf-8'))
  } catch (error) {
    logger.error('Webpack Manifest assets file not found')
  }

  return {
    assetPath: `${assetPath}/assets`,
    serviceName: config.get('serviceName'),
    serviceUrl: '/',
    breadcrumbs: [],
    navigation: buildNavigation(request),

    /**
     * @param {string} asset
     */
    getAssetPath(asset) {
      const webpackAssetPath = webpackManifest?.[asset]
      return `${assetPath}/${webpackAssetPath}`
    }
  }
}

/**
 * @import { Request } from '@hapi/hapi'
 */
