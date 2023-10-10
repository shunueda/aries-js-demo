import { Agent, ConnectionEventTypes, ConnectionStateChangedEvent } from '@aries-framework/core'

export default async function createConnection(sender: Agent, recipient: Agent) {
  const outOfBandRecord = await sender.oob.createInvitation()
  const {
    outOfBandRecord: { id }
  } = await recipient.oob.receiveInvitation(outOfBandRecord.outOfBandInvitation)
  const hrwc = waitForConnection(recipient, id)
  const irwc = waitForConnection(sender, outOfBandRecord.id)
  const [, connectionId] = await Promise.all([hrwc, irwc])
  return connectionId
}

function waitForConnection(agent: Agent, outOfBandRecordId: string): Promise<string> {
  return new Promise((resolve) => {
    agent.events.on<ConnectionStateChangedEvent>(
      ConnectionEventTypes.ConnectionStateChanged,
      ({ payload }) => {
        if (payload.connectionRecord.outOfBandId !== outOfBandRecordId) return
        if (payload.connectionRecord.isReady) {
          resolve(payload.connectionRecord.id)
        }
      }
    )
  })
}