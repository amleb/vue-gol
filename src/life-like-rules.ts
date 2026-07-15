import { RuleDefinition, ValidateRuleKeys, ParsedLifeRules } from '@/types'

function defineLifeRules<T extends Record<string, RuleDefinition>> (
  rules: T & ValidateRuleKeys<T>
): T {
  return rules
}

export const LifeLikeRules = defineLifeRules({
  'B3/S23': {
    name: "Conway's Game of Life",
    description: 'Highly complex behavior.'
  },
  'B36/S23': {
    name: 'HighLife',
    description: 'Similar to Life but with a small self-replicating pattern.'
  },
  'B1357/S1357': {
    name: 'Replicator',
    description: 'Edward Fredkin\'s replicating automaton: every pattern is eventually replaced by multiple copies of itself.'
  },
  'B3/S012345678': {
    name: 'Life without Death',
    description: 'Also known as Inkspot or Flakes. Cells that become alive never die. It combines chaotic growth with more structured ladder-like patterns that can be used to simulate arbitrary Boolean circuits.'
  },
  'B2/S': {
    name: 'Seeds',
    description: 'All patterns are phoenixes, meaning that every live cell immediately dies, and many patterns lead to explosive chaotic growth. However, some engineered patterns with complex behavior are known.'
  }
})

export const defaultRule = Object.keys(LifeLikeRules)[0]

const ruleRegex = /^B([0-8]*)\/S([0-8]*)$/

export const parseRule = (rule: string) => {
  let bornWhen: number[] = []
  let siblingsWhen: number[] = []

  const matches = rule.match(ruleRegex)

  if (matches && matches[1]) {
    bornWhen = matches[1].split('').map(x => parseInt(x, 10))
  }

  if (matches && matches[2]) {
    siblingsWhen = matches[2].split('').map(x => parseInt(x, 10))
  }

  return {
    bornWhen,
    siblingsWhen
  }
}

export const alg = (aliveSiblings: number, wasAlive: boolean, lifeRules: ParsedLifeRules) => {
  let isAlive = false

  if (wasAlive && lifeRules.siblingsWhen.includes(aliveSiblings)) {
    isAlive = true
  } else if (!wasAlive && lifeRules.bornWhen.includes(aliveSiblings)) {
    isAlive = true
  }

  return isAlive
}
