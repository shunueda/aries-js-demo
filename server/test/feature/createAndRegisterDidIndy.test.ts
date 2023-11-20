import 'jest'
import { createDidIndy } from '../../src/feature/createAndRegisterDidIndy'

describe('createDidIndy', () => {
  it('should create a DID', async () => {
    const did = await createDidIndy('someseed000000000000000000000000')
    expect(did).toContain("did:indy:bcovrin:test:")
  })
})