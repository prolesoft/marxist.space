/**
 * Filter Table plugin Originally from
 * https://github.com/sunnywalker/jQuery.FilterTable/blob/master/jquery.filtertable.js,
 * MIT licensed, modified.
 */
;(function ($) {
  // define the filter
  // a = element, i = match1, m = match2?
  $.expr.filters.marxistSpaceCustomFilter = (a, i, m) =>
    $(a)
      .text()
      .toUpperCase()
      .indexOf(
        m[3]
        .toUpperCase()
        .replace(/"""/g, '"')
        .replace(/"\\"/g, "\\")
      ) >= 0


  // define the plugin
  $.fn.filterTable = function () {
    const settings = {
      // callback function: function (term, table) {  }
      callback: null,

      // jQuery expression method to use for filtering
      filterExpression: 'marxistSpaceCustomFilter',

      // name of filter input field
      inputName: '',

      // tag name of the filter input tag
      inputType: 'search',

      // text to precede the filter input tag
      label: 'Filter:',

      // HTML5 placeholder text for the filter field
      placeholder: 'Find resources',

      // class applied to visible rows
      visibleClass: 'visible'
    }

    // mimic PHP's htmlspecialchars() function
    const hsc = (text) =>
      text
        .replace(/&/g, '&amp;')
        .replace(/"/g, '&quot;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')

    const doFiltering = function (table, q) {
      // cache the tbody element
      const tbody = table.find('tbody')
      // if the filtering query is blank
      if (q === '') {
        // show all rows
        tbody.find('tr').show().addClass(settings.visibleClass)
      } else {
        // if the filter query is not blank
        const allTds = tbody.find('td')
        // hide all rows, assuming none were found
        tbody.find('tr').hide().removeClass(settings.visibleClass)
        // show rows
        allTds.filter(':' + settings.filterExpression + '("' + q + '")')
          .closest('tr')
          .show()
          .addClass(settings.visibleClass)
      }

      // call the callback function
      if (settings.callback) {
        settings.callback(q, table)
      }
    }

    return this.each(function () {
      // cache the table
      const t = $(this)
      // cache the tbody
      const tbody = t.find('tbody')
      // placeholder for the filter field container DOM node
      let container = null
      // placeholder for the field field DOM node
      let filter = null
      // was the filter created or chosen from an existing element?
      let created_filter = true

      // only if object is a table and there's a tbody and hasn't already had a filter added
      if (
        t[0].nodeName === 'TABLE' &&
        tbody.length > 0
      ) {
        // create the filter input field (and container)
        // build the container tag for the filter field
        container = $('<p />')
        // add the label for the filter field
        container.prepend(settings.label + ' ');
        // build the filter field
        filter = $('<input type="' + settings.inputType + '" placeholder="' + settings.placeholder + '" name="' + settings.inputName + '" />');

        // prevent return in the filter field from submitting any forms
        filter.on('keydown', (ev) => {
          if ((ev.keyCode || ev.which) === 13) {
            ev.preventDefault();
            return false
          }
        })

        // does bindWithDelay() exist?
        if ($.fn.bindWithDelay) {
          // bind doFiltering() to keyup (delayed)
          filter.bindWithDelay('keyup', function () {
            doFiltering(t, $(this).val());
          }, 200);
        } else {
          // just bind to onKeyUp
          // bind doFiltering() to keyup
          filter.bind('keyup', function () {
            doFiltering(t, $(this).val());
          });
        }

        // bind doFiltering() to additional events
        filter.bind('click search input paste blur', function () {
          doFiltering(t, $(this).val());
        })

        // add the filter field to the container if it was created by the plugin
        if (created_filter) {
          container.append(filter)
        }

        // add the filter field and quick list container to just before the table if it was created by the plugin
        if (created_filter) {
          t.before(container)
        }
      }
    })
  }
})(jQuery);


/*
 * My code
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
      const enrichedResources = resources.map((a) => ({
        ...a,
        tags: addTagAliases(a.tags),
      }))

      const table = resources.map((resource) => {
        const enrichedTags = enrichedResources.find((r) => r.href === resource.href).tags
        const link = `<a href="${resource.href}" rel="noopener noreferrer nofollower" target="_blank">${resource.title}</a/>`
        const tags = `<small>${resource.tags.join(' ')}<span class="nope">${enrichedTags.join(' ')}</span></small>`
        const row = `<tr><td>${link}</td><td>${resource.description || ''}</td><td>${tags}</td></tr>`
        return row
      }).reverse()

      $('tbody').html(table)
    })


  $('table').filterTable()
})(jQuery);
