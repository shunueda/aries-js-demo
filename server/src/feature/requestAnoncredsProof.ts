import { Verifier } from '../agent/verifier'
import { attrNames } from '../index'

export default async function requestAnoncredsProof(
  verifier: Verifier,
  connectionId: string
) {
  await verifier.proofs.requestProof({
    connectionId,
    protocolVersion: "v2",
    proofFormats: {
      anoncreds: {
        requested_attributes: {
          identity: { names: attrNames },
        },
        name: "Signup",
        version: "2",
      },
    },
  })
}
