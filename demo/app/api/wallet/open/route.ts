import { NextResponse } from 'next/server'
import agent from '@/app/agent'

export async function POST(request: Request) {
  try {
    await agent.wallet.close()
  } catch (e) {}
  try {
    await agent.wallet.open(await request.json())
    return NextResponse.json(
      { wallet: agent.wallet.walletConfig },
      { status: 200 }
    )
  } catch (e) {
    return NextResponse.json(
      {},
      { status: 500, statusText: 'Error opening wallet' }
    )
  }
}
