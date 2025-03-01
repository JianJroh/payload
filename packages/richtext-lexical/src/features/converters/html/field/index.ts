import type { SerializedEditorState } from 'lexical'
import type { Field } from 'payload'

import type { HTMLConverters, HTMLConvertersFunction } from '../types.js'

import { convertLexicalToHTML } from '../index.js'
import { getHTMLPopulateFn } from './htmlPopulateFn.js'

type Args = {
  converters?: HTMLConverters | HTMLConvertersFunction
  /**
   * Whether the lexicalHTML field should be hidden in the admin panel
   *
   * @default true
   */
  hidden?: boolean
  htmlFieldName: string
  /**
   * A string which matches the lexical field name you want to convert to HTML.
   *
   * This has to be a sibling field of this lexicalHTML field - otherwise, it won't be able to find the lexical field.
   **/
  lexicalFieldName: string
  /**
   * Whether the HTML should be stored in the database
   *
   * @default false
   */
  storeInDB?: boolean
}

/**
 *
 * Field that converts a sibling lexical field to HTML
 *
 * @todo will be renamed to lexicalHTML in 4.0, replacing the deprecated `lexicalHTML` converter
 */
export const lexicalHTMLField: (args: Args) => Field = (args) => {
  const { converters, hidden = true, htmlFieldName, lexicalFieldName, storeInDB = false } = args
  return {
    name: htmlFieldName,
    type: 'code',
    admin: {
      editorOptions: {
        language: 'html',
      },
      hidden,
    },
    hooks: {
      afterRead: [
        async ({
          currentDepth,
          depth,
          draft,
          overrideAccess,
          req,
          showHiddenFields,
          siblingData,
        }) => {
          const lexicalFieldData: SerializedEditorState = siblingData[lexicalFieldName]

          if (!lexicalFieldData) {
            return ''
          }

          const htmlPopulateFn = await getHTMLPopulateFn({
            currentDepth: currentDepth ?? 0,
            depth: depth ?? req.payload.config.defaultDepth,
            draft: draft ?? false,
            overrideAccess: overrideAccess ?? false,
            req,
            showHiddenFields: showHiddenFields ?? false,
          })

          return await convertLexicalToHTML({
            converters,
            data: lexicalFieldData,
            populate: htmlPopulateFn,
          })
        },
      ],
      beforeChange: [
        ({ siblingData, value }) => {
          if (storeInDB) {
            return value
          }
          delete siblingData[htmlFieldName]
          return null
        },
      ],
    },
  }
}
