import type { StorageOptions } from '@google-cloud/storage'
import type {
  Adapter,
  ClientUploadsConfig,
  PluginOptions as CloudStoragePluginOptions,
  CollectionOptions,
  GeneratedAdapter,
} from '@payloadcms/plugin-cloud-storage/types'
import type { Config, Plugin, UploadCollectionSlug } from 'payload'

import { Storage } from '@google-cloud/storage'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'

import { getGenerateSignedURLHandler } from './generateSignedURL.js'
import { getGenerateURL } from './generateURL.js'
import { getHandleDelete } from './handleDelete.js'
import { getHandleUpload } from './handleUpload.js'
import { getHandler } from './staticHandler.js'

export interface GcsStorageOptions {
  acl?: 'Private' | 'Public'

  /**
   * The name of the bucket to use.
   */
  bucket: string
  /**
   * Do uploads directly on the client to bypass limits on Vercel. You must allow CORS PUT method for the bucket to your website.
   */
  clientUploads?: ClientUploadsConfig
  /**
   * Collection options to apply the S3 adapter to.
   */
  collections: Partial<Record<UploadCollectionSlug, Omit<CollectionOptions, 'adapter'> | true>>
  /**
   * Whether or not to enable the plugin
   *
   * Default: true
   */
  enabled?: boolean

  /**
   * Google Cloud Storage client configuration.
   *
   * @see https://github.com/googleapis/nodejs-storage
   */
  options: StorageOptions
}

type GcsStoragePlugin = (gcsStorageArgs: GcsStorageOptions) => Plugin

export const gcsStorage: GcsStoragePlugin =
  (gcsStorageOptions: GcsStorageOptions) =>
  (incomingConfig: Config): Config => {
    if (gcsStorageOptions.enabled === false) {
      return incomingConfig
    }

    let storageClient: null | Storage = null

    const getStorageClient = (): Storage => {
      if (storageClient) {
        return storageClient
      }
      storageClient = new Storage(gcsStorageOptions.options)

      return storageClient
    }

    const adapter = gcsStorageInternal(getStorageClient, gcsStorageOptions)

    if (gcsStorageOptions.clientUploads) {
      if (!incomingConfig.endpoints) {
        incomingConfig.endpoints = []
      }

      incomingConfig.endpoints.push({
        handler: getGenerateSignedURLHandler({
          access:
            typeof gcsStorageOptions.clientUploads === 'object'
              ? gcsStorageOptions.clientUploads.access
              : undefined,
          bucket: gcsStorageOptions.bucket,
          collections: gcsStorageOptions.collections,
          getStorageClient,
        }),
        method: 'post',
        path: '/storage-gcs-generate-signed-url',
      })
    }

    if (!incomingConfig.admin) {
      incomingConfig.admin = {}
    }

    if (!incomingConfig.admin.components) {
      incomingConfig.admin.components = {}
    }

    if (!incomingConfig.admin.components.providers) {
      incomingConfig.admin.components.providers = []
    }

    for (const collectionSlug in gcsStorageOptions.collections) {
      incomingConfig.admin.components.providers.push({
        clientProps: {
          collectionSlug,
          enabled: !!gcsStorageOptions.clientUploads,
        },
        path: '@payloadcms/storage-gcs/client#GcsClientUploadHandler',
      })
    }

    // Add adapter to each collection option object
    const collectionsWithAdapter: CloudStoragePluginOptions['collections'] = Object.entries(
      gcsStorageOptions.collections,
    ).reduce(
      (acc, [slug, collOptions]) => ({
        ...acc,
        [slug]: {
          ...(collOptions === true ? {} : collOptions),
          adapter,
        },
      }),
      {} as Record<string, CollectionOptions>,
    )

    // Set disableLocalStorage: true for collections specified in the plugin options
    const config = {
      ...incomingConfig,
      collections: (incomingConfig.collections || []).map((collection) => {
        if (!collectionsWithAdapter[collection.slug]) {
          return collection
        }

        return {
          ...collection,
          upload: {
            ...(typeof collection.upload === 'object' ? collection.upload : {}),
            disableLocalStorage: true,
          },
        }
      }),
    }

    return cloudStoragePlugin({
      collections: collectionsWithAdapter,
    })(config)
  }

function gcsStorageInternal(
  getStorageClient: () => Storage,
  { acl, bucket }: GcsStorageOptions,
): Adapter {
  return ({ collection, prefix }): GeneratedAdapter => {
    return {
      name: 'gcs',
      generateURL: getGenerateURL({ bucket, getStorageClient }),
      handleDelete: getHandleDelete({ bucket, getStorageClient }),
      handleUpload: getHandleUpload({
        acl,
        bucket,
        collection,
        getStorageClient,
        prefix,
      }),
      staticHandler: getHandler({ bucket, collection, getStorageClient }),
    }
  }
}
