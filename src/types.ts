import { BoardState } from './store/modules/board'

export interface RootState {
  board: BoardState,
  toolbox: Record<string, never>
}

type LifeDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8'

type OnlyLifeDigits < S extends string > =
  S extends ''
    ? true
    : S extends `${LifeDigit}${infer Rest}`
      ? OnlyLifeDigits<Rest>
      : false

export type LifeRule < S extends string > =
  S extends `B${infer Birth}/S${infer Survival}`
    ? Birth extends ''
      ? never
      : Survival extends ''
        ? never
        : OnlyLifeDigits<Birth> extends true
          ? OnlyLifeDigits<Survival> extends true
            ? S
            : never
          : never
    : never

export interface RuleDefinition {
  name: string;
  description?: string;
}

export type ValidateRuleKeys < T > = {
  [K in keyof T]:
  K extends string
    ? LifeRule<K> extends never
      ? never
      : T[K]
    : T[K];
}

export type ParsedLifeRules = {
  bornWhen: number[],
  siblingsWhen: number[]
}
