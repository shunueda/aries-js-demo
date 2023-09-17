import express from 'express'
import agent from './agent'
import multer from 'multer'

const app = express()

// Use multer middleware for parsing multipart/form-data
const upload = multer().none()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.post('/api/wallet/open', upload, async (req, res) => {
  console.log(req.body)
  try {
    await agent.wallet.close()
  } catch (e) {}
  try {
    console.log('Opening wallet...')
    await agent.wallet.open({
      id: req.body.wallet_id,
      key: req.body.wallet_key
    })
    console.log('Wallet opened!')
    res.status(200).json(agent.wallet.walletConfig)
  } catch (e) {
    res.status(503).send(e.message) // It's a good practice to send an error message for debugging
  }
})

app.get('/api/dids', async (req, res) => {
  const dids = (await agent.dids.getCreatedDids()).map(record => record.did)
  res.status(200).json(dids)
})

app.listen(4000, () => {
  console.log('Server listening on port 4000')
})
