import { app } from 'electron'
import path from 'node:path'
import Database from 'better-sqlite3'

const root = path.join(__dirname, '..')
const TAG = '[better-sqlite3]'
let database: Database.Database

export function getSqlite3(filename = path.join(app.getPath('userData'), 'better-sqlite3.sqlite3')) {
  return database ??= new Database(filename, {
    // https://github.com/WiseLibs/better-sqlite3/blob/v8.5.2/lib/database.js#L36
    // https://github.com/WiseLibs/better-sqlite3/blob/v8.5.2/lib/database.js#L50
    nativeBinding: path.join(root, import.meta.env.VITE_BETTER_SQLITE3_BINDING),
  })
}
