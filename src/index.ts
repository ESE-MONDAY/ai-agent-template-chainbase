import { Hono } from 'hono'
import { Request, Response, route } from './httpSupport'

async function GET(req: Request): Promise<Response> {
    const app = new Hono()
    const secrets = req.secret || {}
    const queries = req.queries
    const chainbaseApiKey = (secrets.chainbaseApiKey) ? secrets.chainbaseApiKey as string : ''
    const chainId = (queries.chain_id) ? queries.chain_id[0] as string : '8453'
    const contractAddress = (queries.contract_address) ? queries.contract_address[0] as string : '0xd343a3f5593b93D8056aB5D60c433622d7D65a80'
    const url = `https://api.chainbase.online/v1/nft/owners?chain_id=${chainId}&contract_address=${contractAddress}`
    let result;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': `${chainbaseApiKey}`,
            },
        });
        result = await response.json();
    } catch (error) {
        console.error('Error fetching chat completion:', error)
        result = { error }
    }

    return new Response(`
        <!DOCTYPE html>
        <html>
        <head>
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
    `, {
        headers: {
            'Content-Type': 'text/html'
        }
    })
}

async function POST(req: Request): Promise<Response> {
    return new Response('Not Implemented')
}

export default async function main(request: string) {
    return await route({ GET, POST }, request)
}