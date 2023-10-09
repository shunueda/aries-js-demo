import { homedir } from 'os'
import { Agent } from '@aries-framework/core'
import { IndySdkToAskarMigrationUpdater } from '@aries-framework/indy-sdk-to-askar-migration'

export default async function migrate(fromAgent: Agent, toAgent: Agent) {
  const fromDbPath = `${homedir()}/.indy_client/wallet/${
    fromAgent.config.walletConfig?.id
  }/sqlite.db`
  const updater = await IndySdkToAskarMigrationUpdater.initialize({
    dbPath: fromDbPath,
    agent: toAgent,
  })
  await updater.update()
}
