import { Agent, ProofEventTypes, ProofExchangeRecord, ProofState, ProofStateChangedEvent } from '@aries-framework/core'

export default async function waitForProofShared(
  agent: Agent
): Promise<ProofExchangeRecord> {
  return new Promise((resolve) => {
    agent.events.on<ProofStateChangedEvent>(
      ProofEventTypes.ProofStateChanged,
      async ({ payload }) => {
        if (payload.proofRecord.state === ProofState.Done) {
          console.log('============= Presentation ==============')
          const formattedData = await agent.proofs.getFormatData(
            payload.proofRecord.id
          )
          const items = Object.entries(
            // @ts-ignore
            formattedData.presentation?.anoncreds.requested_proof
              .revealed_attr_groups.identity.values
          )
          // @ts-ignore
          items.forEach(([key, { raw }]) => {
            console.log(`- ${key}: ${raw}`)
          })
          console.log('=========================================')
          resolve(payload.proofRecord)
        }
      }
    )
  })
}
