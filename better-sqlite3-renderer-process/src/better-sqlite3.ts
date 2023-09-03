
import path from 'node:path'
import Database from 'better-sqlite3'

const root = import.meta.env.VITE_COMMAND === 'serve'
  ? import.meta.env.VITE_DEV_ROOT
  : path.join(__dirname, '..')
const TAG = '[better-sqlite3]'
let database: Database.Database

export function getSqlite3(filename: string) {
  return database ??= new Database(filename, {
    // https://github.com/WiseLibs/better-sqlite3/blob/v8.5.2/lib/database.js#L36
    // https://github.com/WiseLibs/better-sqlite3/blob/v8.5.2/lib/database.js#L50
    nativeBinding: path.join(root, import.meta.env.VITE_BETTER_SQLITE3_BINDING),
  })
}
