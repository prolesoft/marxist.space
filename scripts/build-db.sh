#!/bin/sh

if hash gsed 2>/dev/null; then
  _sed='gsed'
else
  _sed=sed
fi
./node_modules/.bin/js-yaml db.yml > db.ts
$_sed -i '1 i\export default ' db.ts
mv -f db.ts src/db/
npx prettier --write src/db/db.ts
