import { app } from 'electron'
import path from 'node:path'
import {
  type Database,
  verbose,
} from 'sqlite3'

const TAG = '[sqlite3]'
let database: Promise<Database>

export function getSqlite3(filename = path.join(app.getPath('userData'), 'database.sqlite3')) {
  return database ??= new Promise<Database>((resolve, reject) => {
    const db = new (verbose().Database)(filename, error => {
      if (error) {
        console.log(TAG, 'initialize failed :(')
        console.log(TAG, error)
        reject(error)
      } else {
        console.log(TAG, 'initialize success :)')
        console.log(TAG, filename)
        resolve(db)
      }
    })
  })
}
