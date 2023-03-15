# firestore-doc-size

Calculates the storage size of a firestore document

see: https://firebase.google.com/docs/firestore/storage-size

## Usage

Install using your package manager of choice:

    pnpm i firestore-doc-size

Import the appropriate `docSize` method.

If running on a server using the `firebase-admin` SDK, you should import:

```ts
import { docSize } from 'firestore-doc-size/firebase.server'
```

If running in a browser using the `firebase` SDK, you should import:

```ts
import { docSize } from 'firestore-doc-size/firebase'
```

Call the method with the full document path and data and it will give you the document size:

```ts
const size = docSize(snapshot.ref.path, snapshot.data())
```

Alternatively, import the `docSizeConverter` and use via the `.withConverter(docSizeConverter)` firestore option. This will add a `_size` property to the object returned via `snapshot.data()` (it will not be written to the database).

NOTE: in case you're wondering, the ".server" naming convention is a SvelteKit thing ...

## Credit

There was an existing package, [firestore-size](https://www.npmjs.com/package/firestore-size), but I wanted something I could use with both the server (`firebase-admin`) _and_ the client (`firebase`) SDK, plus some of the types have changed in the latest versions.
