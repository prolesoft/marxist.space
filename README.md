# marxist.space

[![CircleCI](https://circleci.com/gh/prolesoft/marxist.space.svg?style=svg)](https://circleci.com/gh/prolesoft/marxist.space) [![codecov](https://codecov.io/gh/prolesoft/marxist.space/branch/master/graph/badge.svg)](https://codecov.io/gh/prolesoft/marxist.space) [![Maintainability](https://api.codeclimate.com/v1/badges/af5ebb6ca8951512bec3/maintainability)](https://codeclimate.com/github/prolesoft/marxist.space/maintainability) [![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0) [![Uptime Robot ratio (7 days)](https://img.shields.io/uptimerobot/ratio/7/m784341127-9b6c6e8e28a344b9e533fa4e)](https://stats.uptimerobot.com/5Alqxc0QYg) ![PageSpeed](https://api.speedbadge.io/v1?url=marxist.space)

A [ProleSoft](https://prolesoft.github.io) project.

## Adding Resources

First please search `db.yml` to make sure what you want to add isn't already in
there. If it is, and you couldn't find it because the tags were incomplete or
incorrect or the title or description were incorrect, please change those instead.

Otherwise, add your links to the bottom of `db.yml`. This is the type of a
resource:

```
interface Resource {
  href: string
  title: string
  tags: string[]
  description?: string
  excerpts?: string[]
}
```

An example would be:

```yaml
resources: # this line is already there, needs to stay at the top
  - href: https://example.com
    title: Example Domain
    description: It's an Example # description is optional
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
**Note** this is not recommended, running with Docker Compose is easier.

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

## Releasing

* First, make sure your changes are good. You can run `npm t` in the project
  root to just run all the tests, or run `npm run build` in project root to run
  tests and build for production (important to verify if you're making changes
  to the build setup or dependencies).
* In the project root, run `npm version patch`, then
  `git push origin master --follow-tags`. The project will be deployed by
  Circle.

## Contributing

See [CONTRIBUTING](./.github/CONTRIBUTING.md) and the
[open issues](https://github.com/prolesoft/marxist.space/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc).

There's also a [mirror](https://yerbamate.dev/prolesoft/marxist.space)
for those who would rather not use GitHub, and patches can be emailed directly
to marxist.space@protonmail.com.

## Credits and Tech

Built with [React](https://reactjs.org/),
[Koa](https://koajs.com/),
[TypeScript](https://www.typescriptlang.org/),
[Lowdb](https://github.com/typicode/lowdb),
[Node](https://nodejs.org/en/), and
[Docker](https://www.docker.com/).
Hosted on [DigitalOcean](https://m.do.co/c/ed9c0a26a7ef).
A portion of the front-end code is copy-pasted from
[Asperitas](https://github.com/d11z/asperitas) (MIT licensed).
