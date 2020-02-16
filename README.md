# marxist.space

[![CircleCI](https://circleci.com/gh/prolesoft/marxist.space.svg?style=svg)](https://circleci.com/gh/prolesoft/marxist.space) [![codecov](https://codecov.io/gh/prolesoft/marxist.space/branch/master/graph/badge.svg)](https://codecov.io/gh/prolesoft/marxist.space) [![Maintainability](https://api.codeclimate.com/v1/badges/af5ebb6ca8951512bec3/maintainability)](https://codeclimate.com/github/prolesoft/marxist.space/maintainability) [![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)

A [ProleSoft](https://prolesoft.github.io) project.

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

Prerequisites: Node LTS or Latest, npm, Docker, Docker Compose

```shell
git clone git@github.com:prolesoft/marxist.space.git
cd marxist.space
npm run install-all
npm start
```

You can also develop without Docker. You'll need Node LTS or Latest and npm.

```shell
git clone git@github.com:prolesoft/marxist.space.git
cd marxist.space
npm run install-all
# Edit proxy in package.json to be http://localhost:9090
cd server
npm start
# In another terminal
cd client
npm start
```

Go to <http://localhost:3000>

## Building and Running

```shell
npm run install-all
npm run build
cd server && npm start
```

Check out <http://localhost:9090>

See [this doc](./scripts/deployment/README.md) for details on deploying, running
in Docker, and running in Kubernetes.

## Contributing

See [CONTRIBUTING](./.github/CONTRIBUTING.md) and the
[open issues](https://github.com/prolesoft/marxist.space/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc).

There's also a [mirror](https://yerbamate.dev/prolesoft/marxist.space)
for those who would rather not use GitHub, and patches can be emailed directly
to marxist.space@protonmail.com.

## Credits and Tech

Built with React, Koa, TypeScript, Lowdb, Node, and Docker.
A portion of the front-end code is copy-pasted from
[Asperitas](https://github.com/d11z/asperitas) (MIT licensed).
