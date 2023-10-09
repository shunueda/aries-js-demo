import { Issuer } from '../agent/issuer'
import { attrNames } from '../index'

export default async function registerSchema(issuer: Issuer, did: string) {
  const schemaResult = await issuer.modules.anoncreds.registerSchema({
    schema: {
      attrNames,
      issuerId: did,
      name: `Anonymous Credentials Ltd. Employee`,
      version: `1.0.${Math.floor(Math.random() * 1000)}`,
    },
    options: {},
  })
  if (schemaResult.schemaState.state === "failed") {
    throw new Error(`Error creating schema: ${schemaResult.schemaState.reason}`)
  }
  return schemaResult.schemaState.schemaId!
}