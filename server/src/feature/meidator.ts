import { Agent, ConnectionsModule, HttpOutboundTransport, InitConfig, MediatorModule } from '@aries-framework/core'
import { agentDependencies, HttpInboundTransport } from '@aries-framework/node'

const name = 'mediator'
const port = 3001

const agentConfig: InitConfig = {
  label: name,
  walletConfig: {
    id: name,
    key: name,
  },
  endpoints: [`http://localhost:${port}`],
}

const mediator = new Agent({
  config: agentConfig,
  dependencies: agentDependencies,
  modules: {
    // indySdk: new IndySdkModule({ indySdk }),
    mediator: new MediatorModule({
      autoAcceptMediationRequests: true,
    }),
    connections: new ConnectionsModule({
      autoAcceptConnections: true,
    }),
  },
})

mediator.registerOutboundTransport(new HttpOutboundTransport())
mediator.registerInboundTransport(new HttpInboundTransport({ port }))

await mediator.initialize()
const mediatorOutOfBandRecord = await mediator.oob.createInvitation({ multiUseInvitation: true })

const mediatiorInvitationUrl = mediatorOutOfBandRecord.outOfBandInvitation.toUrl({
  domain: `http://localhost:${port}`,
})
console.log(mediatiorInvitationUrl)
