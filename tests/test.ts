import 'dotenv/config'
import './testSupport'
import { execute } from "./testSupport";

async function test() {
    let getResult = await execute({
        method: 'GET',
        path: '/ipfs/CID',
        queries: {
            chain_id: ["8453"],
            contract_address: ["0xd343a3f5593b93D8056aB5D60c433622d7D65a80"]
        },
        secret: { chainbaseApiKey: 'YOUR_CHAINBASE_KEY' },
        headers: {},
    })
    console.log('GET RESULT:', JSON.parse(getResult))

    console.log(`Now you are ready to publish your agent, add secrets, and interact with your agent in the following steps:\n- Execute: 'npm run publish-agent'\n- Set secrets: 'npm run set-secrets'\n- Go to the url produced by setting the secrets (e.g. https://wapo-testnet.phala.network/ipfs/QmPQJD5zv3cYDRM25uGAVjLvXGNyQf9Vonz7rqkQB52Jae?key=b092532592cbd0cf)`)
}

test().then(() => { }).catch(err => console.error(err)).finally(() => process.exit())
