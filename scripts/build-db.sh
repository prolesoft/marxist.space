#!/bin/sh

./node_modules/.bin/js-yaml db.yml > db.ts
sed -i '1 i\export default ' db.ts
mv -f db.ts client/src/db/
cd client && npx prettier --write src/db/db.ts
