import { Request, Response, route } from './httpSupport'

async function GET(req: Request): Promise<Response> {
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

    return new Response(JSON.stringify(result))
}

async function POST(req: Request): Promise<Response> {
    return new Response('Not Implemented')
}

export default async function main(request: string) {
    return await route({ GET, POST }, request)
}
