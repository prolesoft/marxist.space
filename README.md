# marxist.space

[![CircleCI](https://circleci.com/gh/prolesoft/marxist.space.svg?style=svg)](https://circleci.com/gh/prolesoft/marxist.space) [![codecov](https://codecov.io/gh/prolesoft/marxist.space/branch/master/graph/badge.svg)](https://codecov.io/gh/prolesoft/marxist.space) [![Maintainability](https://api.codeclimate.com/v1/badges/af5ebb6ca8951512bec3/maintainability)](https://codeclimate.com/github/prolesoft/marxist.space/maintainability)

## Adding Resources

Add your links to the top of `db.yml` under the line `resources:`.

This is the type of a resource:

```
interface Resource {
  href: string
  title: string
  subtitle?: string
  tags: string[]
  excerpts?: string[]
}
```

An example would be:

```yaml
resources: # this line is already there, needs to stay at the top
  - href: https://example.com
    title: Example Domain
    subtitle: It's an Example # subtitle is optional
    tags:
      - best
      - website
    excerpts: # this list is optional
      - This domin is for use in illustrative examples in documents.
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
cd client
# Edit proxy in package.json to be http://localhost:9090
npm start
```

Go to <http://localhost:3000>

## Building + Prod

```shell
npm run install-all
npm run build
cd server && npm start
```

Check out <http://localhost:9090>

See [this doc](./scripts/deployment/README.md) for details on deploying and
Docker and Kubernetes usage.

## Credits and Tech

Built with React, Koa, TypeScript, Lowdb, Node, and Docker.
A portion of the front-end code is copy-pasted from
[Asperitas](https://github.com/d11z/asperitas) (MIT licensed).

This is a [ProleSoft](https://prolesoft.github.io) project.

[LICENSE (LGPL-3.0)](./LICENSE.md)
