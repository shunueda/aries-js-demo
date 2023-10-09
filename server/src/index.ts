import Koa from 'koa'
import Router from '@koa/router'
import 'dotenv/config'
import { indySdkHolder, sharedComponentsHolder } from './agent/holder'
import { purgeDb } from './util/purgeDb'
import { issuer } from './agent/issuer'
import defineRoutes from './routes'
import fetch from 'node-fetch'
import createAndRegisterDidIndy from './feature/createAndRegisterDidIndy'
import createAndRegisterSchema from './feature/createAndRegisterSchema'
import createAndRegisterCredentialDefinintion from './feature/createAndRegisterCredentialDefinintion'
import createConnection from './feature/createConnection'
import offerAnoncredsCredential from './feature/offerAnoncredsCredential'
import waitForCredentialInWallet from './feature/waitForCredentialInWallet'
import migrate from './feature/migrate'
import { verifier } from './agent/verifier'
import requestAnoncredsProof from './feature/requestAnoncredsProof'
import waitForProofShared from './feature/waitForProofShared'

const PORT = 8000
const app = new Koa()
const router = new Router()

export const attrNames = ["name", "date of birth", "email", "occupation"]

defineRoutes(router)

await purgeDb(sharedComponentsHolder)
await indySdkHolder.initialize()
await indySdkHolder.modules.anoncreds.createLinkSecret()
await issuer.initialize()

const issuerDid = await createAndRegisterDidIndy(issuer, 'someseed000000000000000000000000')
const schemaId = await createAndRegisterSchema(issuer, issuerDid, 'LEHIGH UNIV. - TEST SCHEMA', attrNames)
const credentialDefinitionId = await createAndRegisterCredentialDefinintion(
  issuer,
  issuerDid,
  schemaId
)
const connectionId = await createConnection(issuer, indySdkHolder)
await offerAnoncredsCredential(issuer, connectionId, credentialDefinitionId)
await waitForCredentialInWallet(indySdkHolder)
await indySdkHolder.shutdown()
await migrate(indySdkHolder, sharedComponentsHolder)
await sharedComponentsHolder.initialize()
await verifier.initialize()
const cid = await createConnection(verifier, sharedComponentsHolder)
await requestAnoncredsProof(verifier, cid)
await waitForProofShared(sharedComponentsHolder)

app.use(router.routes())
app.use(router.allowedMethods())
app.listen(PORT)
console.log(`Listening on port ${PORT}`)