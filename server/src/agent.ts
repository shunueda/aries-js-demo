import {
  Agent,
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
  autoUpdateStorageOnStartup: true
}

const agent = new Agent({
  config: agentConfig,
  modules: {
    indySdk: new IndySdkModule({ indySdk })
  },
  dependencies: agentDependencies
})

// Register transports
agent.registerOutboundTransport(new WsOutboundTransport())
agent.registerOutboundTransport(new HttpOutboundTransport())
// agent.registerInboundTransport(new HttpInboundTransport({ port: 4000 }))

await agent.initialize()
export default agent
