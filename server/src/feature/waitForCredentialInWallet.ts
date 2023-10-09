import { Agent, CredentialEventTypes, CredentialState, CredentialStateChangedEvent } from '@aries-framework/core'

export default async function waitForCredentialInWallet(agent: Agent) {
  return new Promise((resolve) => {
    agent.events.on<CredentialStateChangedEvent>(
      CredentialEventTypes.CredentialStateChanged,
      async ({ payload }) => {
        if (payload.credentialRecord.state === CredentialState.Done) {
          resolve(payload.credentialRecord)
        }
      }
    )
  })
}