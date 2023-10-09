import { Issuer } from '../agent/issuer'

export default async function offerAnoncredsCredential(
  issuer: Issuer,
  connectionId: string,
  credentialDefinitionId: string
) {
  const dob = new Date()
  dob.setFullYear(new Date().getFullYear() - 25)
  await issuer.credentials.offerCredential({
    protocolVersion: "v2",
    connectionId,
    credentialFormats: {
      anoncreds: {
        credentialDefinitionId,
        attributes: [
          { name: "name", value: "John Doe" },
          {
            name: "date of birth",
            value: dob.toISOString(),
          },
          { name: "email", value: "jane@anoncreds.ltd" },
          { name: "occupation", value: "Credential Influencer" },
        ],
      },
    },
  })
}
