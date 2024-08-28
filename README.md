<div align="center">
  <a href="https://github.com/Phala-Network/ai-agent-template-chainbase">
    <h1>AI Agent Contract Template with Chainbase</h1>
    <img height="320" src="./public/AI-Agent-Contract.jpg" />
    <br />
  </a>
  <p align="center">
    Host your AI Agent Contract on Phala's decentralized serverless cloud.
    <br />
    <a href="https://github.com/Phala-Network/ai-agent-template-chainbase"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://wapo-testnet.phala.network/ipfs/QmfZ4ApCnoDGCxwxp7Taax1tzGY9Vbu4YQFnkrKmu4yNd7?key=4622c3e3fc0fc307&chain_id=8453&contract_address=0xd343a3f5593b93D8056aB5D60c433622d7D65a80">View Demo</a>
    ·
    <a href="https://github.com/Phala-Network/ai-agent-template-chainbase/issues">Report Bug</a>
    ·
    <a href="https://discord.gg/phala-network">Discord</a>
  </p>

  <h3>Architecure Overview</h3>
  <img height="320" src="./public/ai-agent-architecture.jpg" />
</div>

## 🤖 What Is This?!

<div align="center">
  <img height="240" src="https://www.jlwranglerforums.com/forum/attachments/zoolander-gif.325299/">
</div>

The Chainbase AI Agent template is a **MINIMAL** template to build an AI Agent that can be hosted on Phala Network's decentralized hosting protocol. Unlike Vercel or other FaaS, it allows you to publish your AI Agent compiled code to IPFS and hosts it on a fully decentralized FaaS cloud with the following benefits:

- 💨 Ship Fast: Build and ship with familiar toolchain in minutes
- ⛑️ Secure: Execution guarded by rock solid TEE / Intel SGX
- 🔒 Private: Host API keys and user privacy at ease
- 💎 Unstoppable: Powered by IPFS and Phala's 35k+ decentralized TEE workers

[//]: # (<img width="320" src="https://media1.tenor.com/m/NBtFH5F9QTgAAAAd/what-is-my-purpose-butter.gif" />)

## Getting Started
### Prepare
Install dependencies
```shell
npm install
```

### Testing Locally
Create `.env` file and add your Chainbase API Key
```shell
cp .env.example .env
```

Get a Chainbase API Key from [Chainbase](https://console.chainbase.com/)

In `.env` file replace `YOUR_CHAINBASE_KEY` with your API Key
```text
CHAINBASE_API_KEY="YOUR_CHAINBASE_KEY"
```

Build your Agent
```shell
npm run build
```

Test your Agent locally
```shell
npm run test
```

Expected Test Results
```shell
INPUT: {"method":"GET","path":"/ipfs/CID","queries":{"chain_id":["8453"],"contract_address":["0xd343a3f5593b93D8056aB5D60c433622d7D65a80"]},"secret":{"chainbaseApiKey":"CHAINBASE_API_KEY"},"headers":{}}
GET RESULT: {
  status: 200,
  body: '{"code":0,"message":"ok","data":[{"address":"0xc77b7e6176eaa80aa15fa11b2f14d9773772cb0f","total":255},{"address":"0xdd2363cbfaabb9c68e0a74a6a5ac2478cc9e9c8f","total":190},{"address":"0x0ebd2fa40bb998a9462a18ac17254458b065712a","total":98},{"address":"0x3227547eb6b8679f19c84af5619a934ee0a6af68","total":69},{"address":"0x7f2281facde2f04b4af8cae396eea24fe18f5c42","total":23},{"address":"0x12909009d651d40d6ae00b150db3107bc5654603","total":20},{"address":"0xde1683287529b9b4c3132af8aad210644b259cfd","total":19},{"address":"0x329539a0338c643be39e2c53c93b64ea1d0f9095","total":18},{"address":"0x015359e5404fc97a5f2631986613fd85c88eaa41","total":16},{"address":"0x3d19777f46c739c6fd921e0fe3ebc65de003a353","total":13},{"address":"0x7ecdf3fd56d3b9f512fa70a68734ce871e36be96","total":12},{"address":"0xe92d559f99857114c610abef473c31be38e4a08b","total":12},{"address":"0x94c74dfa070500e317ddde4d64007fe26ae8ab9a","total":11},{"address":"0xfb63ed4dc5467ddb608e0a5b3f441a82e6603c40","total":10},{"address":"0x9365b6915e8e57c29490db9c4c11674419d9b1db","total":9},{"address":"0x75daae02fe35c114d32ad8e3b2555fe9798a64b0","total":8},{"address":"0x10276757bea9474fd3764bb1301aea5c7c7c9d6e","total":7},{"address":"0x8cea81b7f23a0f56cd98a76cc9a82f2970ba1f7e","total":7},{"address":"0x9325564ade7683706107685cf1993678b1163261","total":6},{"address":"0xe69ebd3f7734a30e338e78f88947cc2360f86d03","total":6}],"next_page":2,"count":86}',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
}
**NOTE**:
This is a local test and your published code could have a different result when executing in the TEE on Phala Network.

Please reach out to the team here if your run into issues: https://discord.gg/phala-network
```

### Publish Your AI Agent

Upload your compiled AI Agent code to IPFS.
```shell
npm run publish-agent
```

Upon a successful upload, the command should show the URL to access your AI Agent.
```shell
✓ Compiled successfully.
  1.39 KB  dist/index.js
Running command: npx thirdweb upload dist/index.js
This may require you to log into thirdweb and will take some time to publish to IPFS...

    $$\     $$\       $$\                 $$\                         $$\       
    $$ |    $$ |      \__|                $$ |                        $$ |      
  $$$$$$\   $$$$$$$\  $$\  $$$$$$\   $$$$$$$ |$$\  $$\  $$\  $$$$$$\  $$$$$$$\  
  \_$$  _|  $$  __$$\ $$ |$$  __$$\ $$  __$$ |$$ | $$ | $$ |$$  __$$\ $$  __$$\ 
    $$ |    $$ |  $$ |$$ |$$ |  \__|$$ /  $$ |$$ | $$ | $$ |$$$$$$$$ |$$ |  $$ |
    $$ |$$\ $$ |  $$ |$$ |$$ |      $$ |  $$ |$$ | $$ | $$ |$$   ____|$$ |  $$ |
    \$$$$  |$$ |  $$ |$$ |$$ |      \$$$$$$$ |\$$$$$\$$$$  |\$$$$$$$\ $$$$$$$  |
     \____/ \__|  \__|\__|\__|       \_______| \_____\____/  \_______|\_______/ 

 💎 thirdweb v0.14.12 💎

- Uploading file to IPFS. This may take a while depending on file sizes.

✔ Successfully uploaded file to IPFS.
✔ Files stored at the following IPFS URI: ipfs://QmfZ4ApCnoDGCxwxp7Taax1tzGY9Vbu4YQFnkrKmu4yNd7
✔ Open this link to view your upload: https://b805a9b72767504353244e0422c2b5f9.ipfscdn.io/ipfs/bafybeih7yqwj7eldyy7sdctrv7vltaslbd577nuwqu3ogrf66shps3btsi/

Agent Contract deployed at: https://wapo-testnet.phala.network/ipfs/QmfZ4ApCnoDGCxwxp7Taax1tzGY9Vbu4YQFnkrKmu4yNd7

If your agent requires secrets, ensure to do the following:
1) Edit the setSecrets.ts file to add your secrets
2) Set the variable AGENT_CID=QmfZ4ApCnoDGCxwxp7Taax1tzGY9Vbu4YQFnkrKmu4yNd7 in the .env file
3) Run command: npm run set-secrets
```

<details>
<summary>New to thirdweb?</summary>
We use <a href="https://thirdweb.com/dashboard/infrastructure/storage">thirdweb Storage</a> to host IPFS contents. If you are new to thirdweb, the command will guide you to create your account or login to your existing account from the browser. (You may need to forward port 8976 if you are accessing a remote console via SSH.)
</details>

<details>
<summary>Did thirdweb fail to publish?</summary>
If ThirdWeb fails to publish, please use any IPFS pinning service to publish your Agent Contract.
</details>

### Access the Published AI Agent

Once published, your AI Agent is available at the URL: `https://wapo-testnet.phala.network/ipfs/<your-cid>`. You can get it from the "Publish to IPFS" step.

You can test it with `curl`.

```bash
curl https://wapo-testnet.phala.network/ipfs/<your-cid>
```

### Add Secrets

By default, all the compiled JS code is visible for anyone to view if they look at IPFS CID. This makes private info like API keys, signer keys, etc. vulnerable to be stolen. To protect devs from leaking keys, we have added a field called `secret` in the `Request` object. It allows you to store secrets in a vault for your AI Agent to access.

To add your secrets,
1) edit the [setSecrets.ts](./scripts/setSecrets.ts) file and update the `secrets` variable at the top of the file
```typescript
// Update your key value JSON object here for your secrets
const secrets = JSON.stringify({
  // Add your secrets here
  // key: value
  chainbaseApiKey: process.env.CHAINBASE_API_KEY
})
```
2) Update the [.env](./.env.example) file with your published agent IPFS CID
```text
AGENT_CID=QmfZ4ApCnoDGCxwxp7Taax1tzGY9Vbu4YQFnkrKmu4yNd7
```
3) Run command to set the secrets
```shell
npm run set-secrets
```
Expected output:
```shell
Storing secrets...
  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed
100   184    0    68  100   116    118    202 --:--:-- --:--:-- --:--:--   321
{"token":"a6373db0d1f13078","key":"4622c3e3fc0fc307","succeed":true}

Secrets set successfully. Go to the URL below to interact with your agent:
https://wapo-testnet.phala.network/ipfs/QmfZ4ApCnoDGCxwxp7Taax1tzGY9Vbu4YQFnkrKmu4yNd7?key=4622c3e3fc0fc307
```

The API returns a `token` and a `key`. The `key` is the id of your secret. It can be used to specify which secret you are going to pass to your frame. The `token` can be used by the developer to access the raw secret. You should never leak the `token`.

To verify the secret, run the following command where `key` and `token` are replaced with the values from adding your `secret` to the vault.
```shell
curl https://wapo-testnet.phala.network/vaults/<key>/<token>
```

Expected output:
```shell
{"data":{"chainbaseApiKey":"<CHAINBASE_API_KEY>"},"succeed":true}
```

### Access Queries
To help create custom logic, we have an array variable named `queries` that can be accessed in the `Request` class. To access the `queries` array variable `chatQuery` value at index `0`, the syntax will look as follows:
```typescript
const query = req.queries.chatQuery[0] as string;
```
The example at https://wapo-testnet.phala.network/ipfs/QmfZ4ApCnoDGCxwxp7Taax1tzGY9Vbu4YQFnkrKmu4yNd7?key=4622c3e3fc0fc307&chain_id=8453&contract_address=0xd343a3f5593b93D8056aB5D60c433622d7D65a80 will have a queries for `chain_id` and `contract_address` with values of `8453` and `0xd343a3f5593b93D8056aB5D60c433622d7D65a80`. `queries` can have any field name, so `chain_id` & `contract_address` are just an example of a field names and not a mandatory name, but remember to update your `index.ts` file logic to use your expected field name.


## FAQ

<details>
<summary><b>What packages can I use in the AI Agent server?</b></summary>
<ul>
  <li>Most of the npm packages are supported: viem, onchainkit, ….</li>
  <li>Some packages with some advanced features are not supported:</li>
  <ul>
    <li>Memory usage over 100MB</li>
    <li>Web Assembly</li>
    <li>Browser only features: local storage, service workers, etc</li>
  </ul>
</ul>
</details>

<details>
<summary><b>What’s the spec of the Javascript runtime?</b></summary>
<ul>
  <li>The code runs inside a tailored <a href="https://bellard.org/quickjs/">QuickJS engine</a></li>
  <li>Available features: ES2023, async, fetch, setTimeout, setInterval, bigint</li>
  <li> <a href="https://docs.phala.network/tech-specs/ai-agent-contract#wapojs/">Tech spec doc</a></li>
</ul>
</details>

<details>
<summary><b>Why is the serverless platform secure?</b></summary>
<ul>
  <li>Your AI Agent code on is fully secure, private, and permissionless. Nobody can manipulate your program, steal any data from it, or censor it.</li>
  <li>Security: The code is executed in the decentralized TEE network running on Phala Network. It runs code inside a secure blackbox (called enclave) created by the CPU. It generates cryptographic proofs verifiable on Phala blockchain. It proves that the hosted code is exactly the one you deployed.</li>
  <li>Privacy: You can safely put secrets like API keys or user privacy on Phala Network. The code runs inside TEE hardware blackboxs. The memory of the program is fully encrypted by the TEE. It blocks any unauthorized access to your data.</li>
  <li>Learn more at <a href="https://phala.network">Phala Network Homepage</a></li>
</details>

<details>
<summary><b>What's TEE / Intel SGX?</b></summary>
<ul>
  <li><a href="https://collective.flashbots.net/t/tee-sgx-wiki/2019">TEE/SGX wiki</a></li>
  <li><a href="https://collective.flashbots.net/t/debunking-tee-fud-a-brief-defense-of-the-use-of-tees-in-crypto/2931">Debunking TEE FUD: A Brief Defense of The Use of TEEs in Crypto</a></li>
</details>
