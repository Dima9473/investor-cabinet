import { TOKEN } from "lib/constants/token"

 
const URL = 'https://invest-public-api.tinkoff.ru/rest/tinkoff.public.invest.api.contract.v1.UsersService/GetAccounts'

export const fetchTBankAccounts = async () => {
    return fetch(URL, { method: 'POST', headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
        'accept': 'application/json'
    } })
}
