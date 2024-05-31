import { Timestamp, Bytes, GeoPoint, DocumentReference } from 'firebase/firestore'

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
      return byteLength(obj) + 1

    case 'boolean':
      return 1

    case 'number':
      return 8

    case 'object':
      if (obj === null) {
        return 1
      }

      if (obj instanceof Bytes) {
        return obj.toUint8Array().byteLength
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

function byteLength(str: string) {
	// returns the byte length of an utf8 string
	var s = str.length
	for (var i = str.length - 1; i >= 0; i--) {
		var code = str.charCodeAt(i)
		if (code > 0x7f && code <= 0x7ff) s++
		else if (code > 0x7ff && code <= 0xffff) s += 2
		if (code >= 0xdc00 && code <= 0xdfff) i-- //trail surrogate
	}
	return s
}