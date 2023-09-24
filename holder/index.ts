import {
  Agent,
  ConnectionsModule,
  CredentialsModule,
  HttpOutboundTransport,
  InitConfig,
  LogLevel,
  V2CredentialProtocol,
  WsOutboundTransport
} from '@aries-framework/core'
import { IndySdkModule } from '@aries-framework/indy-sdk'
import { agentDependencies, HttpInboundTransport } from '@aries-framework/node'
import indySdk from 'indy-sdk'
import { getProtocolScheme } from '@aries-framework/core/build/utils/uri'
import {
  getUnqualifiedCredentialDefinitionId,
  LegacyIndyCredentialFormatService
} from '@aries-framework/anoncreds'

const agentConfig: InitConfig = {
  label: 'Aries Agent',
  walletConfig: {
    id: `default`,
    key: 'key'
  },
  endpoints: ['http://localhost:3002'],
  autoUpdateStorageOnStartup: true
}

const agent = new Agent({
  config: agentConfig,
  modules: {
    indySdk: new IndySdkModule({ indySdk }),
    connections: new ConnectionsModule({ autoAcceptConnections: true }),
    credentials: new CredentialsModule({
      credentialProtocols: [
        new V2CredentialProtocol({
          credentialFormats: [new LegacyIndyCredentialFormatService()]
        })
      ]
    })
  },
  dependencies: agentDependencies
})

// Register transports
agent.registerOutboundTransport(new WsOutboundTransport())
agent.registerOutboundTransport(new HttpOutboundTransport())
agent.registerInboundTransport(new HttpInboundTransport({ port: 3002 }))

console.log('Agent initializing...')
await agent.initialize()
console.log('Agent initialized!')

// console.log(
//   await agent.oob.acceptInvitation('d47119db-2a6f-45a3-b75e-c3e52fa70db7', {
//     autoAcceptConnection: true
//   })
// )

const credentialOffer = await agent.credentials.createOffer({
  credentialFormats: {
    indy: {
      credentialDefinitionId: getUnqualifiedCredentialDefinitionId(
        'did',
        0,
        'Tag'
      ),
      attributes: [
        { name: 'name', value: 'Jane Doe' },
        { name: 'age', value: '23' }
      ]
    }
  },
  protocolVersion: 'v2' as never
})
console.log(credentialOffer)
