// import Router from '@koa/router'
// import createAndRegisterDidIndy from './feature/createAndRegisterDidIndy'
// import { issuer } from './agent/issuer'
//
// export default function routes(router: Router) {
//   router.post('/api/register', async (ctx) => {
//     const { seed } = ctx.request.body
//     if (!seed) {
//       ctx.status = 400
//       ctx.body = {
//         error: 'Seed is missing'
//       }
//       return
//     }
//     try {
//       const did = await createAndRegisterDidIndy(issuer, seed)
//       ctx.status = 200
//       ctx.body = {
//         did
//       }
//     } catch (err) {
//       ctx.status = 500
//       ctx.body = {
//         error: 'Failed to create DID'
//       }
//     }
//   })
// }
