import { describe, it, expect, vi, beforeEach } from 'vitest'
import main from '../src'
import { app } from '../src'
import { ChainbaseResponse } from '../src'

// Mock the fetch function
const mockFetch = vi.fn()
global.fetch = mockFetch

// Mock process.env
const mockEnv = {
    secret: JSON.stringify({
        chainbaseApiKey: 'test-api-key'
    }),
    CHAINBASE_API_KEY: 'test-api-key'
}

vi.stubGlobal('process', { env: mockEnv })

describe('NFT Owners API', () => {
    beforeEach(() => {
        mockFetch.mockClear()
    })

    it('should handle Phala agent request successfully', async () => {
        const mockResponse: ChainbaseResponse = {
            code: 0,
            message: 'success',
            data: [{ address: '0x123...', total: 1 }],
            next_page: 2,
            count: 1
        }

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockResponse)
        })

        const input = {
            method: 'GET',
            queries: {
                chain_id: ['8453'],
                contract_address: ['0xd343a3f5593b93D8056aB5D60c433622d7D65a80']
            },
            secret: { chainbaseApiKey: 'test-api-key' }
        }

        const result = await main(JSON.stringify(input))
        const parsedResult = JSON.parse(result)

        expect(parsedResult.status).toBe(200)
        expect(parsedResult.headers['content-type']).toContain('text/html')
        expect(parsedResult.body).toContain('Chainbase NFT Owners')
        expect(parsedResult.body).toContain('0x123...')
    })

    it('should handle Phala agent API errors', async () => {
        mockFetch.mockResolvedValueOnce({
            ok: false,
            json: () => Promise.resolve({ error: 'Invalid API key' })
        })

        const input = {
            method: 'GET',
            queries: {},
            secret: { chainbaseApiKey: 'invalid-key' }
        }

        const result = await main(JSON.stringify(input))
        const parsedResult = JSON.parse(result)

        expect(parsedResult.status).toBe(200)
        expect(parsedResult.body).toContain('Invalid API key')
    })

    it('should handle Phala agent non-GET requests', async () => {
        const input = {
            method: 'POST',
            queries: {},
            secret: { chainbaseApiKey: 'test-api-key' }
        }

        const result = await main(JSON.stringify(input))
        const parsedResult = JSON.parse(result)

        expect(parsedResult.status).toBe(501)
        expect(parsedResult.body).toBe('Not Implemented')
    })

    // Hono app tests
    it('should handle Hono app request', async () => {
        const mockResponse: ChainbaseResponse = {
            code: 0,
            message: 'success',
            data: [{ address: '0x123...', total: 1 }],
            next_page: 2,
            count: 1
        }

        mockFetch.mockResolvedValueOnce({
            ok: true,
            json: () => Promise.resolve(mockResponse)
        })

        const res = await app.request('/')
        expect(res.status).toBe(200)
        expect(res.headers.get('content-type')).toContain('text/html')
    })

    it('should handle Hono app 404 routes', async () => {
        const res = await app.request('/invalid-route')
        expect(res.status).toBe(501)
        expect(await res.text()).toBe('Not Implemented')
    })
})
