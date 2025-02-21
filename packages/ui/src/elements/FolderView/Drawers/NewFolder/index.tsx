'use client'

import type { FolderInterface } from 'payload/shared'

import { useModal } from '@faceless-ui/modal'
import React from 'react'

import { HiddenField } from '../../../../fields/Hidden/index.js'
import { TextField } from '../../../../fields/Text/index.js'
import { Form } from '../../../../forms/Form/index.js'
import { useConfig } from '../../../../providers/Config/index.js'
import { useFolder } from '../../../../providers/Folders/index.js'
import { useTranslation } from '../../../../providers/Translation/index.js'
import { Drawer } from '../../../Drawer/index.js'
import { DrawerActionHeader } from '../../../DrawerActionHeader/index.js'
import { DrawerContentContainer } from '../../../DrawerContentContainer/index.js'

type Props = {
  readonly drawerSlug: string
  readonly onNewFolderSuccess: (doc: FolderInterface) => Promise<void>
}

export const NewFolderDrawer = ({ drawerSlug, onNewFolderSuccess }: Props) => {
  const { config } = useConfig()
  const { routes, serverURL } = config
  const { closeModal } = useModal()
  const { t } = useTranslation()
  const { folderCollectionSlug, folderID: currentFolderID } = useFolder()

  return (
    <Drawer gutter={false} Header={null} slug={drawerSlug}>
      <Form
        action={`${serverURL}${routes.api}/${folderCollectionSlug}`}
        handleResponse={async (res, successToast, errorToast) => {
          try {
            const { doc } = await res.json()
            await onNewFolderSuccess(doc)
            successToast(
              t('general:successfullyCreated', {
                label: `"${doc.name}"`,
              }),
            )
          } catch (_) {
            errorToast(t('general:error'))
          }
        }}
        initialState={{
          name: {
            initialValue: '',
            valid: true,
            validate: (value) => {
              if (!value) {
                return t('validation:required')
              }
              return true
            },
            value: '',
          },
          _parentFolder: {
            initialValue: '',
            valid: true,
            value: '',
          },
        }}
        method="POST"
      >
        <DrawerActionHeader
          onCancel={() => {
            closeModal(drawerSlug)
          }}
          title={t('folder:newFolder')}
        />

        <DrawerContentContainer>
          <TextField
            field={{
              name: 'name',
              label: t('folder:folderName'),
              required: true,
            }}
            path="name"
            validate={(value) => {
              if (!value) {
                return t('validation:required')
              }
              return true
            }}
          />
          <HiddenField key={currentFolderID} path="_parentFolder" value={currentFolderID} />
        </DrawerContentContainer>
      </Form>
    </Drawer>
  )
}
