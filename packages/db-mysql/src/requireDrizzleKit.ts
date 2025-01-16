import type { RequireDrizzleKit } from '@payloadcms/drizzle/types'

import { createRequire } from 'module'

const require = createRequire(import.meta.url)

export const requireDrizzleKit: RequireDrizzleKit = () => {
  const {
    generateMySQLDrizzleJson,
    generateMySQLMigration,
    pushSQLiteSchema,
  } = require('drizzle-kit/api')

  return {
    generateDrizzleJson: generateMySQLDrizzleJson,
    generateMigration: generateMySQLMigration,
    pushSchema: pushSQLiteSchema,
  }
}
