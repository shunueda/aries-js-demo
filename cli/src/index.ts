import { purgeDb } from 'util/purgeDb'
import { indySdkHolder, sharedComponentsHolder } from 'agent/holder'
import { issuer } from 'agent/issuer'
import createAndRegisterDidIndy from 'feature/createAndRegisterDidIndy'
import createAndRegisterSchema from 'feature/createAndRegisterSchema'
import createAndRegisterCredentialDefinintion from 'feature/createAndRegisterCredentialDefinintion'
import createConnection from 'feature/createConnection'
import offerAnoncredsCredential from 'feature/offerAnoncredsCredential'
import waitForCredentialInWallet from 'feature/waitForCredentialInWallet'
import migrate from 'feature/migrate'
import { verifier } from 'agent/verifier'
import requestAnoncredsProof from 'feature/requestAnoncredsProof'
import waitForProofShared from 'feature/waitForProofShared'
import prompt from './util/prompt'
import task from './util/task'
import confirm from './util/confirm'

// cast: https://asciinema.org/a/GUbl5ODHv6pVvnbzYC2gLt56U
await task('Cleaning up the database...', purgeDb(sharedComponentsHolder))
await task('Initializing IndySdk Holder', indySdkHolder.initialize())
await task('Creating LinkSecret', indySdkHolder.modules.anoncreds.createLinkSecret())
await task('Initializing Issuer', issuer.initialize())

const seed = await prompt('Enter a wallet seed (32 characters or base64):')
const issuerDid = await task('Creating and Registering DID Indy', createAndRegisterDidIndy(issuer, seed))
console.log('Registered DID:', issuerDid)

const attrNames = JSON.parse(await prompt('Enter a list of attribute names (JSON):')) as string[]

const schemaId = await task('Creating and Registering Schema', createAndRegisterSchema(issuer, issuerDid, 'LEHIGH UNIV. - TEST SCHEMA', attrNames))
console.log('Registered Schema with ID:', schemaId)

const credentialDefinitionId = await task('Creating and Registering Credential Definition', createAndRegisterCredentialDefinintion(issuer, issuerDid, schemaId))
const connectionId = await task('Creating Connection', createConnection(issuer, indySdkHolder))

const attributes: { name: string, value: string }[] = []
for (const name of attrNames) {
  const value = await prompt(`Enter a value for ${name}:`)
  attributes.push({ name, value })
}

await task('Offering Anoncreds Credential', offerAnoncredsCredential(issuer, connectionId, credentialDefinitionId, attributes))
await task('Waiting for Credential in Wallet', waitForCredentialInWallet(indySdkHolder))
await task('Shutting down Indy SDK Holder', indySdkHolder.shutdown())
await task('Migrating', migrate(indySdkHolder, sharedComponentsHolder))
await task('Initializing Shared Components Holder', sharedComponentsHolder.initialize())

await confirm('Press enter to verify')

await task('Initializing Verifier', verifier.initialize())
const cid = await task('Creating Connection', createConnection(verifier, sharedComponentsHolder))
await task('Requesting Anoncreds Proof', requestAnoncredsProof(verifier, cid, attrNames))
const proof = await task('Waiting for Proof Shared', waitForProofShared(sharedComponentsHolder))
console.table(proof)

process.exit()