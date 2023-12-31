import { Issuer } from '../agent/issuer'

/**
 * Offer an anoncreds credential
 * @param issuer
 * @param connectionId
 * @param credentialDefinitionId
 * @param attributes
 */
export default async function offerAnoncredsCredential(
  issuer: Issuer,
  connectionId: string,
  credentialDefinitionId: string,
  attributes: { name: string; value: string }[]
) {
  const dob = new Date()
  dob.setFullYear(new Date().getFullYear() - 25)
  await issuer.credentials.offerCredential({
    protocolVersion: 'v2',
    connectionId,
    credentialFormats: {
      anoncreds: {
        credentialDefinitionId,
        attributes
      }
    }
  })
}
