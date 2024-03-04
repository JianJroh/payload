import type { InitPageResult, SanitizedConfig } from 'payload/types'

import { DefaultTemplate, MinimalTemplate } from '@payloadcms/ui'
import React from 'react'

import { initPage } from '../../utilities/initPage'
import { Account } from '../Account'
import { CreateFirstUser } from '../CreateFirstUser'
import { Dashboard } from '../Dashboard'
import { Document as DocumentView } from '../Document'
import { ForgotPassword } from '../ForgotPassword'
import { ListView } from '../List'
import { Login } from '../Login'
import { Logout, LogoutInactivity } from '../Logout'
import { ResetPassword } from '../ResetPassword'
import { Unauthorized } from '../Unauthorized'
import { Verify } from '../Verify'
import { Metadata } from 'next'
import { I18n } from '@payloadcms/translations'

export { generatePageMetadata } from './meta'

type Args = {
  config: Promise<SanitizedConfig>
  params: {
    [key: string]: string | string[]
  }
  searchParams: {
    [key: string]: string | string[]
  }
}

export type GenerateViewMetadata = (args: {
  config: SanitizedConfig
  i18n: I18n
  params?: { [key: string]: string | string[] }
}) => Promise<Metadata>

export type AdminViewProps = {
  baseClass?: string
  initPageResult: InitPageResult
  params?: { [key: string]: string | string[] | undefined }
  searchParams: { [key: string]: string | string[] | undefined }
}

const baseClasses = {
  forgot: 'forgot-password',
  login: 'login',
  reset: 'reset-password',
  verify: 'verify',
}

const oneSegmentViews = {
  'create-first-user': CreateFirstUser,
  forgot: ForgotPassword,
  login: Login,
  logout: Logout,
  'logout-inactivity': LogoutInactivity,
  unauthorized: Unauthorized,
}

export const RootPage = async ({ config: configPromise, params, searchParams }: Args) => {
  const config = await configPromise
  let ViewToRender: React.FC<AdminViewProps>
  let templateClassName
  let initPageResult: InitPageResult
  let templateType: 'default' | 'minimal' = 'default'

  let route = config.routes.admin

  if (Array.isArray(params.segments)) {
    route = route + '/' + params.segments.join('/')
  }

  const segments = Array.isArray(params.segments) ? params.segments : []

  const [segmentOne, segmentTwo] = segments

  const isGlobal = segmentOne === 'globals'
  const isCollection = segmentOne === 'collections'

  // TODO: handle custom routes

  switch (segments.length) {
    case 0: {
      ViewToRender = Dashboard
      templateClassName = 'dashboard'
      templateType = 'default'
      initPageResult = await initPage({
        config,
        redirectUnauthenticatedUser: true,
        route,
        searchParams,
      })
      break
    }
    case 1: {
      if (oneSegmentViews[segmentOne] && segmentOne !== 'account') {
        // --> /create-first-user
        // --> /forgot
        // --> /login
        // --> /logout
        // --> /logout-inactivity
        // --> /unauthorized
        initPageResult = await initPage({ config, route, searchParams })
        ViewToRender = oneSegmentViews[segmentOne]
        templateClassName = baseClasses[segmentOne]
        templateType = 'minimal'
      } else if (segmentOne === 'account') {
        // --> /account
        initPageResult = await initPage({
          config,
          redirectUnauthenticatedUser: true,
          route,
          searchParams,
        })
        ViewToRender = Account
        templateClassName = 'account'
        templateType = 'default'
      }
      break
    }
    case 2: {
      if (segmentOne === 'reset') {
        // --> /reset/:token
        initPageResult = await initPage({ config, route, searchParams })
        ViewToRender = ResetPassword
        templateClassName = baseClasses[segmentTwo]
        templateType = 'minimal'
      }
      if (isCollection) {
        // --> /collections/:collectionSlug
        initPageResult = await initPage({
          config,
          redirectUnauthenticatedUser: true,
          route,
          searchParams,
        })
        ViewToRender = ListView
        templateClassName = `${segmentTwo}-list`
        templateType = 'default'
      } else if (isGlobal) {
        // --> /globals/:globalSlug
        initPageResult = await initPage({
          config,
          redirectUnauthenticatedUser: true,
          route,
          searchParams,
        })
        ViewToRender = DocumentView
        templateClassName = 'global-edit'
        templateType = 'default'
      }
      break
    }
    default:
      if (segmentTwo === 'verify') {
        // --> /:collectionSlug/verify/:token
        initPageResult = await initPage({ config, route, searchParams })
        ViewToRender = Verify
        templateClassName = 'verify'
        templateType = 'minimal'
      } else if (isCollection) {
        // Custom Views
        // --> /collections/:collectionSlug/:id
        // --> /collections/:collectionSlug/:id/preview
        // --> /collections/:collectionSlug/:id/versions
        // --> /collections/:collectionSlug/:id/versions/:versionId
        // --> /collections/:collectionSlug/:id/api
        initPageResult = await initPage({
          config,
          redirectUnauthenticatedUser: true,
          route,
          searchParams,
        })
        ViewToRender = DocumentView
        templateClassName = `collection-default-edit`
        templateType = 'default'
      } else if (isGlobal) {
        // Custom Views
        // --> /globals/:globalSlug/versions
        // --> /globals/:globalSlug/preview
        // --> /globals/:globalSlug/versions/:versionId
        // --> /globals/:globalSlug/api
        initPageResult = await initPage({
          config,
          redirectUnauthenticatedUser: true,
          route,
          searchParams,
        })
        ViewToRender = DocumentView
        templateClassName = `global-edit`
        templateType = 'default'
      }
      break
  }

  if (initPageResult) {
    if (templateType === 'minimal') {
      return (
        <MinimalTemplate className={templateClassName}>
          <ViewToRender
            initPageResult={initPageResult}
            params={params}
            searchParams={searchParams}
          />
        </MinimalTemplate>
      )
    } else {
      return (
        <DefaultTemplate
          config={config}
          i18n={initPageResult.req.i18n}
          permissions={initPageResult.permissions}
          user={initPageResult.req.user}
        >
          <ViewToRender
            initPageResult={initPageResult}
            params={params}
            searchParams={searchParams}
          />
        </DefaultTemplate>
      )
    }
  }

  return null
}
