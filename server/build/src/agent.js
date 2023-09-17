import { Agent, HttpOutboundTransport, WsOutboundTransport } from "@aries-framework/core";
import { IndySdkModule } from "@aries-framework/indy-sdk";
import { agentDependencies } from "@aries-framework/node";
import indySdk from "indy-sdk";
var agentConfig = {
    label: "Aries Agent",
    walletConfig: {
        id: "default",
        key: "key"
    },
    autoUpdateStorageOnStartup: true
};
var agent = new Agent({
    config: agentConfig,
    modules: {
        indySdk: new IndySdkModule({
            indySdk: indySdk
        })
    },
    dependencies: agentDependencies
});
// Register transports
agent.registerOutboundTransport(new WsOutboundTransport());
agent.registerOutboundTransport(new HttpOutboundTransport());
// agent.registerInboundTransport(new HttpInboundTransport({ port: 4000 }))
await agent.initialize();
export default agent;
