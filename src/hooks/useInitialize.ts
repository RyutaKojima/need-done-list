import { EffectCallback, useEffect } from 'react'

export const useInitialize = (effect: EffectCallback): void => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(effect, [])
}
