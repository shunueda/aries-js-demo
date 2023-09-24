import {
  Agent,
  ConnectionsModule,
  HttpOutboundTransport,
  InitConfig,
  WsOutboundTransport
} from '@aries-framework/core'
import { IndySdkModule } from '@aries-framework/indy-sdk'
import { agentDependencies, HttpInboundTransport } from '@aries-framework/node'
import indySdk from 'indy-sdk'

const agentConfig: InitConfig = {
  label: 'Aries Agent',
  walletConfig: {
    id: `default`,
    key: 'key'
  },
  endpoints: ['http://localhost:3001'],
  autoUpdateStorageOnStartup: true
}

const agent = new Agent({
  config: agentConfig,
  modules: {
    indySdk: new IndySdkModule({ indySdk }),
    connections: new ConnectionsModule({ autoAcceptConnections: true })
  },
  dependencies: agentDependencies
})

// Register transports
agent.registerOutboundTransport(new WsOutboundTransport())
agent.registerOutboundTransport(new HttpOutboundTransport())
agent.registerInboundTransport(new HttpInboundTransport({ port: 3001 }))

await agent.initialize()
export default agent
