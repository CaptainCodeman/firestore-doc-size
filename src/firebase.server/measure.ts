import { Timestamp, GeoPoint, DocumentReference } from 'firebase-admin/firestore'

export function docSize(path: string, data: any) {
  return pathSize(path) + 32 + objectSize(data)
}

function pathSize(path: string) {
  return path.split('/').map(value => value.length + 1).reduce((sum, val) => sum + val, 0) + 16
}

function objectSize(obj: any): number {
  const type = typeof obj

  switch (type) {
    case 'string':
      return Buffer.byteLength(obj) + 1

    case 'boolean':
      return 1

    case 'number':
      return 8

    case 'object':
      if (obj === null) {
        return 1
      }

      if (obj instanceof Buffer) {
        return obj.byteLength
      }

      if (obj instanceof Timestamp) {
        return 8
      }

      if (obj instanceof GeoPoint) {
        return 16
      }

      if (obj instanceof DocumentReference) {
        return pathSize(obj.path)
      }

      if (Array.isArray(obj)) {
        return obj.map(objectSize).reduce((acc, curr) => acc + curr, 0)
      }

      let total = 0
      for (const prop in obj) {
        total += objectSize(prop) + objectSize(obj[prop])
      }
      return total

    default:
      throw 'unexpected type ' + type
  }
}
