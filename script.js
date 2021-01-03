/**
 * Filter Table plugin Originally from
 * https://github.com/sunnywalker/jQuery.FilterTable/blob/master/jquery.filtertable.js,
 * MIT licensed, modified.
 */
;(function ($) {
  // define the plugin
  $.fn.filterTable = function () {
    const doFiltering = (table, q) => {
      // cache the tbody element
      const tbody = table.find('tbody')
      // if the filtering query is blank
      if (q.trim() === '') {
        // show all rows
        tbody.find('tr').show()
      } else {
        // if the filter query is not blank
        const allTds = tbody.find('td')
        // hide all rows, assuming none were found
        tbody.find('tr').hide()
        // show rows

        allTds.filter((index, element) =>
          $(element).text().toLowerCase().includes(q.trim().toLowerCase())
        ).closest('tr').show()
      }
    }

    return this.each(function () {
      // cache the table
      const t = $(this)
      // cache the tbody
      const tbody = t.find('tbody')

      // create the filter input field (and container)
      // build the container tag for the filter field
      const container = $('<p />')
      // add the label for the filter field
      container.prepend('Filter: ')
      // build the filter field
      const filter = $(`<input type="search" placeholder="marxism" name="search" />`)

      // prevent return in the filter field from submitting any forms
      filter.on('keydown', (ev) => {
        if ((ev.keyCode || ev.which) === 13) {
          ev.preventDefault()
          return false
        }
      })

      // bind doFiltering() to events
      filter.bind('keyup click search input paste blur', function () {
        doFiltering(t, $(this).val())
      })

      // add the filter field to the container
      container.append(filter)

      // add the container to just before the table
      t.before(container)
    })
  }
})(jQuery);


/* This code initially used fuse.js and lowdb from a Koa server,
 * then the same libraries but client-side in a React app, and
 * now it's using the above jquery table filter plugin instead.
 * Bringing fuse back might have some benefits for fuzzy search,
 * at some point, and move the aliases and pluralization out of
 * the DOM and into the filter function above.
 */
;(function($) {
  const uniq = (xs) => xs.filter((v, i, s) => s.indexOf(v) === i)

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

  const addPlurals = (tags) => uniq(tags.flatMap((tag) => [pluralize.plural(tag), pluralize.singular(tag)]))

  const addTagAliases = (tags) => {
    const pluralized = addPlurals(tags)
    const possibleAliases = tagAliases
      .filter((xs) => xs.find((x) => pluralized.includes(x)))
      .flat()
    return uniq([...pluralized, ...possibleAliases])
  }

  window.fetch('/db.yml')
    .then((res) => res.text())
    .then((text) => jsyaml.load(text))
    .then((obj) => obj.resources)
    .then((resources) => {
      // enrich resource with plurals and tag aliases, used in a hidden span by the filter
      const enrichedResources = resources.map((a) => ({ ...a, tags: addTagAliases(a.tags) }))

      // build the table elements from the original resources, enriched with the
      // tags from above, and then reverse it since new resources are added to
      // the bottom of the yaml file
      const table = resources.map((resource) => {
        const enrichedTags = enrichedResources.find((r) => r.href === resource.href).tags
        const link = `<a href="${resource.href}" rel="noopener noreferrer nofollower" target="_blank">${resource.title}</a/>`
        const tags = `<small>${resource.tags.join(' ')}<span hidden>${enrichedTags.join(' ')}</span></small>`
        const row = `<tr><td>${link}</td><td>${resource.description || ''}</td><td>${tags}</td></tr>`
        return row
      }).reverse()

      $('tbody').html(table)
    })


  $('table').filterTable()
})(jQuery);
