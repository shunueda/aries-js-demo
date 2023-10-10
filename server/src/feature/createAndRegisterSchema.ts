import { Issuer } from '../agent/issuer'

export default async function createAndRegisterSchema(issuer: Issuer, did: string, name: string, attrNames: string[], version?: string) {
  const schemaResult = await issuer.modules.anoncreds.registerSchema({
    schema: {
      attrNames: attrNames,
      issuerId: did,
      name: name,
      version: version || `1.0.${Math.floor(Math.random() * 1000)}`
    },
    options: {}
  })
  if (schemaResult.schemaState.state === 'failed') {
    throw new Error(`Error creating schema: ${schemaResult.schemaState.reason}`)
  }
  return schemaResult.schemaState.schemaId!
}