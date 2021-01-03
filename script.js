/**
 * Filter Table plugin Originally from
 * https://github.com/sunnywalker/jQuery.FilterTable/blob/master/jquery.filtertable.js,
 * MIT licensed, modified.
 */
;(function ($) {
    // a = element, i = match1, m = match2?
    $.expr.filters.marxistSpaceCustomFilter = function (a, i, m) {
        return $(a).text().toUpperCase().indexOf(m[3].toUpperCase().replace(/"""/g, '"').replace(/"\\"/g, "\\")) >= 0;
    }


    // define the filterTable plugin
    $.fn.filterTable = function (options) {
        // start off with some default settings
        var defaults = {
            // make the filter input field autofocused (not recommended for accessibility)
            autofocus: false,

            // callback function: function (term, table){}
            callback: null,

            // class to apply to the container
            containerClass: 'filter-table',

            // tag name of the container
            containerTag: 'p',

            // jQuery expression method to use for filtering
            filterExpression: 'filterTableFind',

            // if true, the table's tfoot(s) will be hidden when the table is filtered
            hideTFootOnFilter: false,

            // class applied to cells containing the filter term
            highlightClass: 'alt',

            // don't filter the contents of cells with this class
            ignoreClass: '',

            // don't filter the contents of these columns
            ignoreColumns: [],

            // use the element with this selector for the filter input field instead of creating one
            inputSelector: null,

            // name of filter input field
            inputName: '',

            // tag name of the filter input tag
            inputType: 'search',

            // text to precede the filter input tag
            label: 'Filter:',

            // filter only when at least this number of characters are in the filter input field
            minChars: 1,

            // don't show the filter on tables with at least this number of rows
            minRows: 8,

            // HTML5 placeholder text for the filter field
            placeholder: 'search this table',

            // prevent the return key in the filter input field from trigger form submits
            preventReturnKey: true,

            // list of phrases to quick fill the search
            quickList: [],

            // class of each quick list item
            quickListClass: 'quick',

            // quick list item label to clear the filter (e.g., '&times; Clear filter')
            quickListClear: '',

            // tag surrounding quick list items (e.g., ul)
            quickListGroupTag: '',

            // tag type of each quick list item (e.g., a or li)
            quickListTag: 'a',

            // class applied to visible rows
            visibleClass: 'visible'
        },
            // mimic PHP's htmlspecialchars() function
            hsc = function (text) {
                return text.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            },
            // merge the user's settings into the defaults
            settings = $.extend({}, defaults, options);

        // handle the actual table filtering
        var doFiltering = function (table, q) {
            // cache the tbody element
            var tbody = table.find('tbody');
            // if the filtering query is blank or the number of chars is less than the minChars option
            if (q === '' || q.length < settings.minChars) {
                // show all rows
                tbody.find('tr').show().addClass(settings.visibleClass);
                // remove the row highlight from all cells
                tbody.find('td').removeClass(settings.highlightClass);
                // show footer if the setting was specified
                if (settings.hideTFootOnFilter) {
                    table.find('tfoot').show();
                }
            } else {
                // if the filter query is not blank
                var all_tds = tbody.find('td');
                // hide all rows, assuming none were found
                tbody.find('tr').hide().removeClass(settings.visibleClass);
                // remove previous highlights
                all_tds.removeClass(settings.highlightClass);
                // hide footer if the setting was specified
                if (settings.hideTFootOnFilter) {
                    table.find('tfoot').hide();
                }
                if (settings.ignoreColumns.length) {
                    var tds = [];
                    if (settings.ignoreClass) {
                        all_tds = all_tds.not('.' + settings.ignoreClass);
                    }
                    tds = all_tds.filter(':' + settings.filterExpression + '("' + q + '")');
                    tds.each(function () {
                        var t = $(this),
                            col = t.parent().children().index(t);
                        if ($.inArray(col, settings.ignoreColumns) === -1) {
                            t.addClass(settings.highlightClass).closest('tr').show().addClass(settings.visibleClass);
                        }
                    });
                } else {
                    if (settings.ignoreClass) {
                        all_tds = all_tds.not('.' + settings.ignoreClass);
                    }
                    // highlight (class=alt) only the cells that match the query and show their rows
                    all_tds.filter(':' + settings.filterExpression + '("' + q + '")').addClass(settings.highlightClass).closest('tr').show().addClass(settings.visibleClass);
                }
            }
            // call the callback function
            if (settings.callback) {
                settings.callback(q, table);
            }
        }; // doFiltering()

        return this.each(function () {
            // cache the table
            var t = $(this),
                // cache the tbody
                tbody = t.find('tbody'),
                // placeholder for the filter field container DOM node
                container = null,
                // placeholder for the quick list items
                quicks = null,
                // placeholder for the field field DOM node
                filter = null,
                // was the filter created or chosen from an existing element?
                created_filter = true;

            // only if object is a table and there's a tbody and at least minRows trs and hasn't already had a filter added
            if (t[0].nodeName === 'TABLE' && tbody.length > 0 && (settings.minRows === 0 || (settings.minRows > 0 && tbody.find('tr').length >= settings.minRows)) && !t.prev().hasClass(settings.containerClass)) {
                // use a single existing field as the filter input field
                if (settings.inputSelector && $(settings.inputSelector).length === 1) {
                    filter = $(settings.inputSelector);
                    // container to hold the quick list options
                    container = filter.parent();
                    created_filter = false;
                } else {
                    // create the filter input field (and container)
                    // build the container tag for the filter field
                    container = $('<' + settings.containerTag + ' />');
                    // add any classes that need to be added
                    if (settings.containerClass !== '') {
                        container.addClass(settings.containerClass);
                    }
                    // add the label for the filter field
                    container.prepend(settings.label + ' ');
                    // build the filter field
                    filter = $('<input type="' + settings.inputType + '" placeholder="' + settings.placeholder + '" name="' + settings.inputName + '" />');
                    // prevent return in the filter field from submitting any forms
                    if (settings.preventReturnKey) {
                        filter.on('keydown', function (ev) {
                            if ((ev.keyCode || ev.which) === 13) {
                                ev.preventDefault();
                                return false;
                            }
                        });
                    }
                }

                // add the autofocus attribute if requested
                if (settings.autofocus) {
                    filter.attr('autofocus', true);
                }

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
                });

                // add the filter field to the container if it was created by the plugin
                if (created_filter) {
                    container.append(filter);
                }

                // are there any quick list items to add?
                if (settings.quickList.length > 0 || settings.quickListClear) {
                    quicks = settings.quickListGroupTag ? $('<' + settings.quickListGroupTag + ' />') : container;
                    // for each quick list item...
                    $.each(settings.quickList, function (index, value) {
                        // build the quick list item link
                        var q = $('<' + settings.quickListTag + ' class="' + settings.quickListClass + '" />');
                        // add the item's text
                        q.text(hsc(value));
                        if (q[0].nodeName === 'A') {
                            // add a (worthless) href to the item if it's an anchor tag so that it gets the browser's link treatment
                            q.attr('href', '#');
                        }
                        // bind the click event to it
                        q.bind('click', function (e) {
                            // stop the normal anchor tag behavior from happening
                            e.preventDefault();
                            // send the quick list value over to the filter field and trigger the event
                            filter.val(value).focus().trigger('click');
                        });
                        // add the quick list link to the quick list groups container
                        quicks.append(q);
                    });

                    // add the quick list clear item if a label has been specified
                    if (settings.quickListClear) {
                        // build the clear item
                        var q = $('<' + settings.quickListTag + ' class="' + settings.quickListClass + '" />');
                        // add the label text
                        q.html(settings.quickListClear);
                        if (q[0].nodeName === 'A') {
                            // add a (worthless) href to the item if it's an anchor tag so that it gets the browser's link treatment
                            q.attr('href', '#');
                        }
                        // bind the click event to it
                        q.bind('click', function (e) {
                            e.preventDefault();
                            // clear the quick list value and trigger the event
                            filter.val('').focus().trigger('click');
                        });
                        // add the clear item to the quick list groups container
                        quicks.append(q);
                    }

                    // add the quick list groups container to the DOM if it isn't already there
                    if (quicks !== container) {
                        container.append(quicks);
                    }
                }

                // add the filter field and quick list container to just before the table if it was created by the plugin
                if (created_filter) {
                    t.before(container);
                }
            }
        }); // return this.each
    }; // $.fn.filterTable
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
    [
      'ml',
      'marxist-leninist',
      'leninist',
      'stalinist',
      'marxist leninist',
      'leninism',
      'stalinism',
      'marxism-leninism',
      'marxism leninism',
    ],
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
    .then(res => res.text())
    .then(text => jsyaml.load(text))
    .then(obj => obj.resources)
    .then(resources => {


      const enrichedResources = resources.map((a) => ({
        ...a,
        tags: addTagAliases(a.tags),
      }))

      const getTags = () => uniq(originalResources.flatMap(({ tags }) => tags))

      const getOriginalResourcesByHrefs = (hrefs) =>
        originalResources.filter((r) => hrefs.includes(r.href))

      const filterByTags = (tags) => {
        const hrefs = enrichedResources
          .filter((bm) => tags.every((t) => bm.tags.includes(t)))
          .map(({ href }) => href)
        return getOriginalResourcesByHrefs(hrefs)
      }

      const table = resources.map((resource) => {
        const enrichedTags = enrichedResources.find((r) => r.href === resource.href).tags
        const link = `<a href="${resource.href}" rel="noopener noreferrer nofollower" target="_blank">${resource.title}</a/>`
        const tags = `<small>${resource.tags.join(' ')}<span class="nope">${enrichedTags.join(' ')}</span></small>`
        const row = `<tr><td>${link}</td><td>${resource.description || ''}</td><td>${tags}</td></tr>`
        return row
      }).reverse()

      $('tbody').html(table)
    })


  $('table').filterTable({filterExpression: 'marxistSpaceCustomFilter', label: 'Search:', placeholder: 'Find resources', highlightClass: ''});
})(jQuery);
