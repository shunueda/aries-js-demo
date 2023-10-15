import Koa from 'koa'
import Router from '@koa/router'
import 'dotenv/config'
import { indySdkHolder, sharedComponentsHolder } from './agent/holder'
import { purgeDb } from './util/purgeDb'
import { issuer } from './agent/issuer'
import defineRoutes from './routes'
import { koaBody } from 'koa-body'
import cors from '@koa/cors'

const PORT = 4000
const app = new Koa()
const router = new Router()

app.use(cors())
app.use(koaBody({
  multipart: true
}))
app.use(router.routes())
app.use(router.allowedMethods())

export const attrNames = ['name', 'date of birth', 'email', 'occupation']

defineRoutes(router)

await purgeDb(sharedComponentsHolder)
await indySdkHolder.initialize()
await indySdkHolder.modules.anoncreds.createLinkSecret()
await issuer.initialize()

// const issuerDid = await createAndRegisterDidIndy(issuer, 'someseed000000000000000000000000')
// const schemaId = await createAndRegisterSchema(issuer, issuerDid, 'LEHIGH UNIV. - TEST SCHEMA', attrNames)
// const credentialDefinitionId = await createAndRegisterCredentialDefinintion(
//   issuer,
//   issuerDid,
//   schemaId
// )
// const connectionId = await createConnection(issuer, indySdkHolder)
// await offerAnoncredsCredential(issuer, connectionId, credentialDefinitionId, [])
// await waitForCredentialInWallet(indySdkHolder)
// await indySdkHolder.shutdown()
// await migrate(indySdkHolder, sharedComponentsHolder)
// await sharedComponentsHolder.initialize()
// await verifier.initialize()
// const cid = await createConnection(verifier, sharedComponentsHolder)
// await requestAnoncredsProof(verifier, cid, attrNames)
// await waitForProofShared(sharedComponentsHolder)

app.listen(PORT)
console.log(`Listening on port ${PORT}`)