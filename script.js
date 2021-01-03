/* This code initially used fuse.js and lowdb from a Koa server,
 * then the same libraries but client-side in a React app, and
 * now it's using jquery.
 * Bringing fuse back might have some benefits for fuzzy search,
 * at some point, and move the aliases and pluralization out of
 * the DOM and into the filter function.
 */
;(function($) {
  /* Utilities */
  const tagAliases = [
    ['abolition', 'police', 'prison', 'cop', 'policing', 'jail'],
    ['anarchist', 'anarchism', 'anarchy'],
    ['british', 'english', 'britain', 'england', 'uk'],
    ['castro', 'fidel', 'cuba', 'che'],
    ['china', 'prc', 'deng', 'xiaoping', 'ccp', 'cpc'],
    ['covid', 'covid19', 'covid-19', 'coronavirus'],
    ['debunked', 'debunk', 'debunking', 'myth', 'lie'],
    ['deng', 'xiaoping'],
    ['glossary', 'definition', 'dictionary'],
    ['health', 'healthcare', 'health care'],
    ['hk', 'hongkong', 'hong-kong', 'hong kong'],
    ['imperialism', 'anti-imperialism', 'decolonization', 'colonization'],
    ['israel', 'palestine'],
    ['latin', 'latam'],
    ['library', 'libraries'],
    ['list', 'collection'],
    ['mao', 'zedong', 'tsetung'],
    ['ml', 'marxist-leninist', 'leninist', 'stalinist', 'marxist leninist', 'leninism', 'stalinism', 'marxism-leninism', 'marxism leninism'],
    ['mlm', 'maoist', 'mao', 'maoism'],
    ['news', 'periodical', 'media', 'msm'],
    ['north-korea', 'dprk', 'korea', 'juche'],
    ['soviet-union', 'ussr', 'soviet'],
    ['sw', 'sex-work', 'sex work'],
    ['tibet', 'tibetan'],
    ['trostky', 'trot', 'troskyite', 'troskyism'],
    ['usa', 'us', 'america', 'united states', 'united-states'],
    ['uyghur', 'uighur', 'xinjiang'],
    ['xi', 'jinping'],
    ['zapatista', 'ezln'],
  ]

  const uniq = (xs) => xs.filter((v, i, s) => s.indexOf(v) === i)

  const addPlurals = (tags) =>
    uniq(tags.flatMap((tag) =>
      [pluralize.plural(tag), pluralize.singular(tag)]))

  const addTagAliases = (tags) => {
    const pluralized = addPlurals(tags)
    const possibleAliases = tagAliases
      .filter((xs) => xs.find((x) => pluralized.includes(x)))
      .flat()
    return uniq([...pluralized, ...possibleAliases])
  }

  // get the db, convert to js
  window.fetch('/db.yml')
    .then((res) => res.text())
    .then((text) => jsyaml.load(text))
    .then((obj) => obj.resources)
    .then((resources) => {
      // enrich resource with plurals and tag aliases, used in a hidden span by the filter
      const enrichedResources = resources.map((a) => ({ ...a, tags: addTagAliases(a.tags) }))

      // set up filtering code
      const addListFilter = () => {
        const ul = $(document.body).find('ul')

        // actual filtering function
        const filterRows = (query) => {
          if (query.trim() === '') {
            ul.find('li').show()
          } else {
            const allLis = ul.find('li')
            // assume nothing found, then just show found rows
            // this should be refactored
            ul.find('li').hide()
            allLis.filter((index, element) => {
              const href = $(element).find('a').attr('href')
              const enriched = enrichedResources.find((r) => r.href === href)
              return JSON.stringify(enriched).toLowerCase().includes(query.trim().toLowerCase())
            }).show()
          }
        }

        // create the input, container, and label
        const container = $('<p />')
        container.prepend('Filter: ')
        const filter = $(`<input type="search" placeholder="marxism" name="search" />`)

        // don't try to submit a form on enter
        filter.on('keydown', (ev) => {
          if ((ev.keyCode || ev.which) === 13) {
            ev.preventDefault()
            return false
          }
        })

        // bind the filter to the events
        filter.on('keyup click search input paste blur', (evt) => {
          filterRows(evt.target.value)
        })

        // add field to container and container to body
        container.append(filter)
        ul.before(container)
      }

      // build the table elements from the original resources, flip it since new
      // links are added to the end of the yaml file
      const items = resources.map((resource) => {
        const enrichedTags = enrichedResources.find((r) => r.href === resource.href).tags
        const link = `<a href="${resource.href}" rel="noopener noreferrer nofollower" target="_blank">${resource.title}</a/>`
        const tags = `<small>${resource.tags.join(' ')}</small>`
        const description = resource.description ? `<br>${resource.description}` : ''
        const row = `<li>${link}${description}<br>${tags}</li>`
        return row
      }).reverse()

      // append all the items and add the filter
      $('ul').html(items)
      addListFilter()
    })
})(jQuery);
