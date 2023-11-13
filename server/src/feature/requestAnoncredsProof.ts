import { Verifier } from '../agent/verifier'

/**
 * Request an anoncreds proof
 * @param verifier
 * @param connectionId
 * @param attrNames
 */
export default async function requestAnoncredsProof(
  verifier: Verifier,
  connectionId: string,
  attrNames: string[]
) {
  await verifier.proofs.requestProof({
    connectionId,
    protocolVersion: 'v2',
    proofFormats: {
      anoncreds: {
        requested_attributes: {
          identity: { names: attrNames }
        },
        name: 'Signup',
        version: '2'
      }
    }
  })
}
