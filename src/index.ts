import { Hono } from 'hono'

// Define the expected response interfaces
interface ChainbaseResponse {
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

// Define the Hono app
const app = new Hono()


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

// GET route to display the response in HTML format
app.get('/', async (c: any) => {
  let secrets: Record<string, unknown> = {}
  try {
    secrets = JSON.parse(process.env.secret || '{}')
  } catch (e) {
    console.error('Error parsing secrets:', e)
    return c.html('<p>Failed to parse secrets</p>')
  }

  const chainbaseApiKey = secrets.chainbaseApiKey ? (secrets.chainbaseApiKey as string) : ''
  const chainId = c.query('chain_id') || '8453'
  const contractAddress = c.query('contract_address') || '0xd343a3f5593b93D8056aB5D60c433622d7D65a80'

  const result = await fetchData(chainbaseApiKey, chainId, contractAddress)


  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Chainbase NFT Owners</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 20px;
            background-color: #f5f5f5;
          }
          .container {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            max-width: 800px;
            margin: 0 auto;
          }
          .field {
            margin-bottom: 15px;
          }
          .label {
            font-weight: bold;
            color: #333;
          }
          .value {
            color: #666;
            word-break: break-all;
          }
          .response {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 4px;
            border: 1px solid #dee2e6;
          }
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

  // Return the HTML content wrapped in the response
  return c.html(html)
})

app.all('*', (c) => {
  return c.text('Not Implemented', { status: 501 })
})

export default app
