import {
  Agent,
  HttpOutboundTransport,
  InitConfig,
  UpdateAssistant,
  WsOutboundTransport
} from '@aries-framework/core'
import { IndySdkModule } from '@aries-framework/indy-sdk'
import { agentDependencies, HttpInboundTransport } from '@aries-framework/node'
import indySdk from 'indy-sdk'
import { VersionString } from '@aries-framework/core/build/utils/version'

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
agent.registerInboundTransport(new HttpInboundTransport({ port: 3000 }))

await agent.initialize()
export default agent
