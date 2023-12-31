import { Agent, ProofEventTypes, ProofExchangeRecord, ProofState, ProofStateChangedEvent } from '@aries-framework/core'

/**
 * Wait for a proof to be shared
 * @param agent
 */
export default async function waitForProofShared(
  agent: Agent
): Promise<ProofExchangeRecord> {
  return new Promise((resolve) => {
    agent.events.on<ProofStateChangedEvent>(
      ProofEventTypes.ProofStateChanged,
      async ({ payload }) => {
        if (payload.proofRecord.state === ProofState.Done) {
          const formattedData = await agent.proofs.getFormatData(
            payload.proofRecord.id
          )
          const items = Object.entries(
            // @ts-ignore
            formattedData.presentation?.anoncreds.requested_proof
              .revealed_attr_groups.identity.values
          )
          resolve(payload.proofRecord)
        }
      }
    )
  })
}
