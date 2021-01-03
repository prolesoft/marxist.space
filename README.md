# marxist.space

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
```

## Developing

Run a local web server and open in the browser. For example, `npx luvi` or
`serve-static` would work.

```shell
git clone git@github.com:prolesoft/marxist.space.git
cd marxist.space
# run your prefered local development server
```

## Releasing

* Merge or push changes, that's it! If making real code changes, please tag
  appropriately using `npm version`, and run `npm t` to double-check db.yml.

## Contributing

See [CONTRIBUTING](./.github/CONTRIBUTING.md) and the
[open issues](https://github.com/prolesoft/marxist.space/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc).
