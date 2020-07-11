# marxist.space

[![CircleCI](https://circleci.com/gh/prolesoft/marxist.space.svg?style=svg)](https://circleci.com/gh/prolesoft/marxist.space)
[![codecov](https://codecov.io/gh/prolesoft/marxist.space/branch/master/graph/badge.svg)](https://codecov.io/gh/prolesoft/marxist.space)
[![Maintainability](https://api.codeclimate.com/v1/badges/af5ebb6ca8951512bec3/maintainability)](https://codeclimate.com/github/prolesoft/marxist.space/maintainability)
[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)

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

## Credits and Tech

Built with [React](https://reactjs.org/),
[TypeScript](https://www.typescriptlang.org/),
and [Lowdb](https://github.com/typicode/lowdb).
A portion of the front-end code is copy-pasted from
[Asperitas](https://github.com/d11z/asperitas) (MIT licensed).
