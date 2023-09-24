import {
  Agent,
  ConnectionsModule,
  HttpOutboundTransport,
  InitConfig,
  WsOutboundTransport
} from '@aries-framework/core'
import { setTimeout } from 'timers/promises'
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

console.log('Agent initializing...')
await agent.initialize()
console.log('Agent initialized!')

console.log(
  (
    await agent.oob.createInvitation({
      autoAcceptConnection: true
    })
  ).id
)

const connections = await agent.connections.getAll()
console.log(connections)

while (true) {
  const credential = await agent.credentials.acceptCredential({
    credentialRecordId: 'RECORD_ID'
  })
  console.log(credential.state)
  await setTimeout(1000)
}

export default agent
