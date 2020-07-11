import * as pluralize from 'pluralize'

export const uniq = (xs) => xs.filter((v, i, s) => s.indexOf(v) === i)

export const tagAliases = [
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
  ['trostky', 'trot', 'troskyite', 'troskyism'],
  ['usa', 'us', 'america', 'united states', 'united-states'],
  ['uyghur', 'uighur', 'xinjiang'],
  ['xi', 'jinping'],
  ['zapatista', 'ezln'],
]

export const addPlurals = (tags: Array<string>): Array<string> =>
  uniq(
    // @ts-ignore
    tags.flatMap((tag) => [pluralize.plural(tag), pluralize.singular(tag)])
  )

export const addTagAliases = (tags: Array<string>): Array<string> => {
  const pluralized = addPlurals(tags)
  // @ts-ignore
  const possibleAliases = tagAliases
    .filter((xs) => xs.find((x) => pluralized.includes(x)))
    // @ts-ignore
    .flat()
  return uniq([...pluralized, ...possibleAliases])
}
