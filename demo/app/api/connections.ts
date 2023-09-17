import type {NextApiRequest, NextApiResponse} from 'next'

import {
    Agent,
    AriesFrameworkError,
    DidCommMimeType,
    HttpOutboundTransport,
    InitConfig, WalletApi,
    WsOutboundTransport
} from '@aries-framework/core';
import {agentDependencies, HttpInboundTransport} from "@aries-framework/node";
import {IndySdkModule} from "@aries-framework/indy-sdk";
import indySdk from 'indy-sdk'

const wsOutboundTransport = new WsOutboundTransport()
const httpOutboundTransport = new HttpOutboundTransport()

const agentConfig: InitConfig = {
    label: "Aries Agent",
    walletConfig: {
        id: `wallet1`,
        key: 'key',
    }
};

const agent = new Agent({
    config: agentConfig,
    modules: {
        indySdk: new IndySdkModule({indySdk}),
    },
    dependencies: agentDependencies
});

// Register transports
agent.registerOutboundTransport(wsOutboundTransport)
agent.registerOutboundTransport(httpOutboundTransport)
agent.registerInboundTransport(new HttpInboundTransport({ port: 3000 }))

type ResponseData = {
    connections: string[]
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    await agent.initialize()
    res.status(200).json({
        connections: ["a"]
    })
    console.log("COMPLETE")
}