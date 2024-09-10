import assert from 'assert'
import { describe, it } from 'node:test'
import { useRestServer, useRestRouter, useRestRoutes } from '@/index'

describe('useRestServer', () => {
  it('should be defined', () => {
    assert.ok(useRestServer)
  })
})

describe('useRestRouter', () => {
  it('should be defined', () => {
    assert.ok(useRestRouter)
  })
})

describe('useRestRoutes', () => {
  it('should be defined', () => {
    assert.ok(useRestRoutes)
  })
})
