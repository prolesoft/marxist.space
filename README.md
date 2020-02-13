# marxist.space

## Adding Resources

Add your links to the bottom of `db.yaml`. This is the type of a resource:

```
interface Resource {
  href: string
  title: string
  subtitle?: string
  tags: string[]
  excerpts?: string[]
}
```

## Developing

Prerequisites: Docker

```shell
git clone git@github.com:prolesoft/marxist.space.git
cd marxist.space
npm run install-all
npm start

# You can also develop without Docker. You'll need Node LTS or Latest and npm.
cd server && npm run dev
cd client && npm start
```

Go to <http://localhost:3000>


## TODO:

* Fix TS on client
* Add search to client
* Make it work
* See github issues for more

[LICENSE](./LICENSE.md)
