import 'dotenv/config'
import { describe, test, expect, vi } from 'vitest'
import app from '../src' // Path to your Hono app


// export async function execute(inputObj: any) {
//     const inputJson = JSON.stringify(inputObj)
//     console.log('INPUT:', inputJson)
//     return await main(inputJson)
// }

// async function test() {
//     let getResult = await execute({
//         method: 'GET',
//         path: '/ipfs/CID',
//         queries: {
//             chain_id: ["8453"],
//             contract_address: ["0xd343a3f5593b93D8056aB5D60c433622d7D65a80"]
//         },
//         secret: { chainbaseApiKey: '2oz2ltH0h6tt5ZttwqXS4IXtxXo' },
//         headers: {},
//     })
//     console.log('GET RESULT:', JSON.parse(getResult))

//     console.log(`Now you are ready to publish your agent, add secrets, and interact with your agent in the following steps:\n- Execute: 'npm run publish-agent'\n- Set secrets: 'npm run set-secrets'\n- Go to the url produced by setting the secrets (e.g. https://wapo-testnet.phala.network/ipfs/QmPQJD5zv3cYDRM25uGAVjLvXGNyQf9Vonz7rqkQB52Jae?key=b092532592cbd0cf)`)
// }

// test().then(() => { }).catch(err => console.error(err)).finally(() => process.exit())




// Mock the secret API key for testing purposes
vi.stubEnv('CHAINBASE_API_KEY', '2oz2ltH0h6tt5ZttwqXS4IXtxXo')

describe('Test Chainbase API Integration', () => {
    test('GET request returns expected HTML', async () => {
        // Simulate a GET request to the / route with query parameters
        const resp = await app.request('/?chain_id=8453&contract_address=0xd343a3f5593b93D8056aB5D60c433622d7D65a80', {
            secrets: { chainbaseApiKey: '2oz2ltH0h6tt5ZttwqXS4IXtxXo' }, // Passing secret as part of the request
        })
        console.log(resp)

        // Assert the response status is 200 (OK)
        expect(resp.status).toBe(200)

        // Assert that the response content type is HTML
        expect(resp.headers.get('content-type')?.toLowerCase()).toBe('text/html; charset=utf-8')

        // Get the HTML response body
        const html = await resp.text()

        // Assert that the HTML contains certain fields and the expected content
        expect(html).toContain('<div class="field">')
        expect(html).toContain('Chain ID:')
        expect(html).toContain('Contract Address:')
        expect(html).toContain('Response:')
    })
})
