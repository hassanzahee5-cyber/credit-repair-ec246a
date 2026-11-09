import { describe, expect, it } from 'vitest'
import plans, { findPlan, recommendPlan } from './plans'

describe('plans', () => {
  it('finds plans by exact id only', () => {
    expect(findPlan('accelerated')?.name).toBe('Accelerated')
    expect(findPlan('Accelerated')).toBeUndefined()
    expect(findPlan('')).toBeUndefined()
  })

  it('recommends a plan from issue severity', () => {
    expect(recommendPlan(0, false).id).toBe('essentials')
    expect(recommendPlan(5, false).id).toBe('accelerated')
    expect(recommendPlan(1, true).id).toBe('couples')
  })

  it('has unique ids', () => {
    expect(new Set(plans.map((p) => p.id)).size).toBe(plans.length)
  })
})
