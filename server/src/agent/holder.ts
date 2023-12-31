import {
  Agent,
  AutoAcceptCredential,
  AutoAcceptProof,
  ConnectionsModule,
  CredentialsModule,
  DidsModule,
  HttpOutboundTransport,
  InitConfig,
  ProofsModule,
  V2CredentialProtocol,
  V2ProofProtocol,
  WsOutboundTransport
} from '@aries-framework/core'
import { IndySdkModule } from '@aries-framework/indy-sdk'
import {
  agentDependencies,
  HttpInboundTransport,
  IndySdkPostgresStorageConfig, IndySdkPostgresWalletScheme,
  loadIndySdkPostgresPlugin
} from '@aries-framework/node'
import { AskarModule } from '@aries-framework/askar'

import indySdk from 'indy-sdk'

import { ariesAskar } from '@hyperledger/aries-askar-nodejs'
import {
  AnonCredsCredentialFormatService,
  AnonCredsModule,
  AnonCredsProofFormatService,
  LegacyIndyCredentialFormatService
} from '@aries-framework/anoncreds'
import { IndyVdrAnonCredsRegistry, IndyVdrIndyDidResolver, IndyVdrModule } from '@aries-framework/indy-vdr'
import { AnonCredsRsModule } from '@aries-framework/anoncreds-rs'
import { anoncreds } from '@hyperledger/anoncreds-nodejs'
import { indyVdr } from '@hyperledger/indy-vdr-nodejs'
import { bcovrinTestNetwork } from '../network/bcovrinTestNetwork'

const name = 'holder'

const storageConfig = {
  type: 'postgres_storage',
  config: {
    url: 'localhost:5432',
    wallet_scheme: IndySdkPostgresWalletScheme.DatabasePerWallet,
  },
  credentials: {
    account: 'postgres',
    password: 'postgres',
    admin_account: 'postgres',
    admin_password: 'postgres',
  },
} satisfies IndySdkPostgresStorageConfig
loadIndySdkPostgresPlugin(storageConfig.config, storageConfig.credentials)

const config: InitConfig = {
  label: name,
  endpoints: ['http://localhost:3002'],
  walletConfig: {
    id: 'hyperledger-afj-040-release-workshop-holder',
    key: 'insecure-secret',
    storage: storageConfig
  },
}

const indySdkModules = {
  indySdk: new IndySdkModule({ indySdk }),
  anoncreds: new AnonCredsModule({
    registries: [new IndyVdrAnonCredsRegistry()]
  }),
  anoncredsRs: new AnonCredsRsModule({
    anoncreds
  }),
  dids: new DidsModule({
    resolvers: [new IndyVdrIndyDidResolver()]
  }),
  indyVdr: new IndyVdrModule({
    indyVdr,
    networks: [bcovrinTestNetwork]
  }),
  connections: new ConnectionsModule({ autoAcceptConnections: true }),
  credentials: new CredentialsModule({
    autoAcceptCredentials: AutoAcceptCredential.Always,
    credentialProtocols: [
      new V2CredentialProtocol({
        credentialFormats: [new LegacyIndyCredentialFormatService(), new AnonCredsCredentialFormatService()]
      })
    ]
  })
}

const sharedComponentsModules = {
  askar: new AskarModule({ ariesAskar }),
  anoncreds: new AnonCredsModule({
    registries: [new IndyVdrAnonCredsRegistry()]
  }),
  anoncredsRs: new AnonCredsRsModule({
    anoncreds
  }),
  dids: new DidsModule({
    resolvers: [new IndyVdrIndyDidResolver()]
  }),
  indyVdr: new IndyVdrModule({
    indyVdr,
    networks: [bcovrinTestNetwork]
  }),
  connections: new ConnectionsModule({ autoAcceptConnections: true }),
  credentials: new CredentialsModule({
    autoAcceptCredentials: AutoAcceptCredential.Always,
    credentialProtocols: [
      new V2CredentialProtocol({
        credentialFormats: [new LegacyIndyCredentialFormatService(), new AnonCredsCredentialFormatService()]
      })
    ]
  }),
  proofs: new ProofsModule({
    autoAcceptProofs: AutoAcceptProof.Always,
    proofProtocols: [
      new V2ProofProtocol({
        proofFormats: [new AnonCredsProofFormatService()]
      })
    ]
  })
}

export const indySdkHolder = new Agent<typeof indySdkModules>({
  config,
  modules: indySdkModules,
  dependencies: agentDependencies
})

export type Holder = typeof indySdkHolder

export const sharedComponentsHolder = new Agent<typeof sharedComponentsModules>(
  {
    config,
    modules: sharedComponentsModules,
    dependencies: agentDependencies
  }
)

indySdkHolder.registerOutboundTransport(new HttpOutboundTransport())
indySdkHolder.registerOutboundTransport(new WsOutboundTransport())
indySdkHolder.registerInboundTransport(new HttpInboundTransport({ port: 3002 }))

sharedComponentsHolder.registerOutboundTransport(new HttpOutboundTransport())
sharedComponentsHolder.registerOutboundTransport(new WsOutboundTransport())
sharedComponentsHolder.registerInboundTransport(
  new HttpInboundTransport({ port: 3002 })
)
