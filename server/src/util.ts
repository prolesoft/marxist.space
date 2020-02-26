import * as pluralize from 'pluralize'

export const uniq = (xs) => xs.filter((v, i, s) => s.indexOf(v) === i)

export const tagAliases = [
  ['abolition', 'police', 'prison', 'cop', 'policing'],
  ['anarchist', 'anarchism', 'anarchy'],
  ['castro', 'fidel', 'cuba', 'che'],
  ['china', 'prc', 'deng', 'xiaoping'],
  ['debunked', 'debunk', 'debunking', 'myth', 'lie'],
  ['deng', 'xiaoping'],
  ['glossary', 'definition', 'dictionary'],
  ['health', 'healthcare', 'health care'],
  ['hk', 'hongkong', 'hong-kong', 'hong kong'],
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
  ['trostky', 'trot', 'troskyite', 'troskyism'],
  ['usa', 'us', 'america', 'united states', 'united-states'],
  ['uyghur', 'uighur', 'xinjiang'],
  ['xi', 'jinping'],
  ['zapatista', 'ezln'],
]

export const addPlurals = (tags: string[]): string[] =>
  uniq(
    // @ts-ignore
    tags.map((tag) => [pluralize.plural(tag), pluralize.singular(tag)]).flat()
  )

export const addTagAliases = (tags: string[]): string[] => {
  const pluralized = addPlurals(tags)
  // @ts-ignore
  const possibleAliases = tagAliases
    .filter((xs) => xs.find((x) => pluralized.includes(x)))
    // @ts-ignore
    .flat()
  return uniq([...pluralized, ...possibleAliases])
}
