import { fetchText } from '../util/fetch'

export const bcovrinTestNetwork = {
  id: 'bcovrin-test-net',
  isProduction: false,
  genesisTransactions: await fetchText('http://test.bcovrin.vonx.io/genesis'),
  indyNamespace: 'bcovrin:test',
  connectOnStartup: true
}
