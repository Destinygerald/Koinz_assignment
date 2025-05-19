import { tokens, capitalGains } from './dummyData.json'

export interface IResponse {
    status: number,
    data?: any,
    err?: string
}

export function fetchTokens (): Promise<IResponse> {
    return new Promise((resolve, _) => {
        resolve({ status: 200, data: tokens })
    })
}

export function fetchGains (): Promise<IResponse> {
    return new Promise((resolve, _) => {
        resolve({ status: 200, data: capitalGains })
    })
}