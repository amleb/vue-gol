import { RuleDefinition, ValidateRuleKeys, ParsedLifeRules } from '@/types'

function defineLifeRules<T extends Record<string, RuleDefinition>> (
  rules: T & ValidateRuleKeys<T>
): T {
  return rules
}

export const LifeLikeRules = defineLifeRules({
  'B3/S23': {
    name: "Conway's Game of Life",
    description: 'Original rule. Highly complex behavior.'
  },
  'B36/S23': {
    name: 'HighLife',
    description: 'Similar to Life but with a small self-replicating pattern.'
  },
  'B34/S34': {
    name: '34 Life',
    description: 'Was initially thought to be a stable alternative to Life, until computer simulation found that larger patterns tend to explode. Has many small oscillators and spaceships.'
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
  },
  'B35678/S5678': {
    name: 'Diamoeba',
    description: 'Forms large diamonds with chaotically fluctuating boundaries. First studied by Dean Hickerson, who in 1993 offered a $50 prize to find a pattern that fills space with live cells; the prize was won in 1999 by David Bell.'
  },
  'B36/S125': {
    name: '2x2',
    description: 'If a pattern is composed of 2x2 blocks, it will continue to evolve in the same form; grouping these blocks into larger powers of two leads to the same behavior, but slower. Has complex oscillators of high periods as well as a small glider.'
  },
  'B25/S4': {
    name: '',
    description: 'This rule supports a small self-replicating pattern which, when combined with a small glider pattern, causes the glider to bounce back and forth in a pseudorandom walk.'
  },
  'B3678/S34678': {
    name: 'Day & Night',
    description: 'Symmetric under on-off reversal. Has engineered patterns with highly complex behavior.'
  },
  'B368/S245': {
    name: 'Morley',
    description: 'Named after Stephen Morley; also called Move. Supports very high-period and slow spaceships.'
  },
  'B4678/S35678': {
    name: 'Annaeal',
    description: 'Also called the twisted majority rule. Symmetric under on-off reversal. Approximates the curve-shortening flow on the boundaries between live and dead cells.'
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
