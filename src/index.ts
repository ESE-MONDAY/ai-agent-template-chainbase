import { Hono } from 'hono'

// Define the expected response interfaces
export interface ChainbaseResponse {
  code: number
  message: string
  data: {
    address: string
    total: number
  }[]
  next_page: number
  count: number
}

interface ChainbaseErrorResponse {
  error: string
}

async function fetchData(chainbaseApiKey: string, chainId: string, contractAddress: string): Promise<ChainbaseResponse | ChainbaseErrorResponse> {
  const url = `https://api.chainbase.online/v1/nft/owners?chain_id=${chainId}&contract_address=${contractAddress}`
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': chainbaseApiKey,
      },
    })

    if (!response.ok) {
      const errorResponse = (await response.json()) as ChainbaseErrorResponse
      console.error('API Error Response:', errorResponse)
      return errorResponse
    }

    return await response.json() as ChainbaseResponse
  } catch (error) {
    console.error('Error fetching data:', error)
    return { error: 'Failed to fetch data' }
  }
}

// Main function for Phala agent
export default async function main(input: string): Promise<string> {
  try {
    const { method, queries, secret } = JSON.parse(input)

    if (method !== 'GET') {
      return JSON.stringify({
        status: 501,
        body: 'Not Implemented'
      })
    }

    const chainId = queries?.chain_id?.[0] || '8453'
    const contractAddress = queries?.contract_address?.[0] || '0xd343a3f5593b93D8056aB5D60c433622d7D65a80'
    const chainbaseApiKey = secret?.chainbaseApiKey || ''

    const result = await fetchData(chainbaseApiKey, chainId, contractAddress)

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Chainbase NFT Owners</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; background-color: #f5f5f5; }
            .container { background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); max-width: 800px; margin: 0 auto; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #333; }
            .value { color: #666; word-break: break-all; }
            .response { background-color: #f8f9fa; padding: 15px; border-radius: 4px; border: 1px solid #dee2e6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="field">
              <div class="label">Chain ID:</div>
              <div class="value">${chainId}</div>
            </div>
            <div class="field">
              <div class="label">Contract Address:</div>
              <div class="value">${contractAddress}</div>
            </div>
            <div class="field">
              <div class="label">Response:</div>
              <pre class="response">${JSON.stringify(result, null, 2)}</pre>
            </div>
          </div>
        </body>
      </html>
    `

    return JSON.stringify({
      status: 200,
      headers: {
        'content-type': 'text/html; charset=utf-8'
      },
      body: html
    })

  } catch (error) {
    console.error('Error processing request:', error)
    return JSON.stringify({
      status: 500,
      body: 'Internal Server Error'
    })
  }
}

// For testing purposes only
export const app = new Hono()
app.get('/', async (c) => {
  const chainId = c.req.query('chain_id') || '8453'
  const contractAddress = c.req.query('contract_address') || '0xd343a3f5593b93D8056aB5D60c433622d7D65a80'
  const chainbaseApiKey = process.env.CHAINBASE_API_KEY || ''

  const result = await fetchData(chainbaseApiKey, chainId, contractAddress)
  return c.html(`<!DOCTYPE html>...`) // Same HTML template as above
})

app.all('*', (c) => c.text('Not Implemented', { status: 501 }))
