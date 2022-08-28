;(function($) {
  /* Utilities */
  const fuseOptions = {
    shouldSort: true,
    tokenize: true,
    threshold: 0.3,
    ignoreLocation: true,
    minMatchCharLength: 3,
    keys: ['href', 'title', 'tags', 'description'],
  }

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
    ['ml', 'marxist-leninist', 'leninist', 'stalinist', 'marxist leninist',
      'leninism', 'stalinism', 'marxism-leninism', 'marxism leninism'],
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

  const uniq = (xs) => [...new Set(xs)]

  const addPlurals = (tags) =>
    uniq(tags.flatMap((tag) =>
      [pluralize.plural(tag), pluralize.singular(tag)]))

  const addTagAliases = (tags) => {
    const pluralized = addPlurals(tags)
    const possibleAliases = tagAliases
      .filter((xs) =>
        xs.find((x) =>
          pluralized.includes(x)))
      .flat()

    return uniq([...pluralized, ...possibleAliases])
  }

   enrichResources = (resources) => (
    resources.map((a) =>
      ({ ...a, extraTags: addTagAliases(a.tags) }))
  )

  const buildResourceItem = ({ href, title, tags, description }) => {
    const link = `<a href="${href}" rel="noopener noreferrer nofollower" target="_blank">${title}</a/>`
    const tagList = `<small>tags: ${tags.join(' ')}</small>`
    return `<li>${[link, description, tagList].filter(Boolean).join('<br>')}</li>`
  }

  const fetchy = (resources) => {
    // enrich resource with plurals and tag aliases from functions above
    const enrichedResources = enrichResources(resList)

    const fuse = new window.Fuse(enrichResources(resList), fuseOptions)

    // set up filtering code
    const addListFilter = () => {
      const ul = $(document.body).find('ul')

      // actual filtering function
      const filterRows = (e) => {
        //console.log("I wanna show all of it!")
  
        var completeList = itemsList.concat(items)
        //console.log(completeList)

        $('ul').html(completeList)
        addListFilter()

        const query = document.getElementById("query").value.trim()
        //const query = e.target.value.trim()
        // show all items if no query
        if (query === '') {
          ul.find('li').show()
        } else {
          
          const fuseResults = fuse.search(query)
            .map((a) => a.item)
            .map((a) => a.href)
          const allLis = ul.find('li')
          // assume nothing found, then just show found rows
          // this should be refactored
          ul.find('li').hide()
          allLis.filter((i, element) => {
            const href = $(element).find('a').attr('href')
            return fuseResults.find((l) => l === href)
          }).show()
        }
      }

      $('#filter').on('click', filterRows)
    }

    // build the elements from the resources, and flip it since new
    // links are added to the end of the yaml file
    const items = enrichedResources.map(buildResourceItem).reverse()

    const itemsList = items.splice(0,15)

    // append all the items and add the filter
    $('ul').html(itemsList)
    addListFilter()

    window.onscroll = function(e) {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          itemsList.push(...items.splice(0,15))

          $('ul').html(itemsList.concat(resList.splice(0,15)))
      }
    }
  }

  // get the db, convert to js
  window.fetch('/db.yml')
    .then((res) => res.text())
    .then((text) => jsyaml.load(text))
    .then((obj) => obj.resources)
    .then((resources) => {
      resList = resources
      fetchy(resources)
    })
})(jQuery);
