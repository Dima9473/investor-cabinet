type PaymentDTO = {
    nano: number,
    currency: string,
    units: string
}

type childOperationDTO = {
    instrumentUid: string,
    payment: PaymentDTO
}

type PriceDTO = {
    nano: number,
    currency: string,
    units: string
}

type TradesDTO = {
    tradeId: string,
    dateTime: string,
    quantity: string,
    price: PriceDTO,
}

export type OperationDTO = {
    date: string,
    assetUid: string,
    instrumentType: string,
    childOperations:childOperationDTO[],
    quantity: string,
    parentOperationId: string,
    trades: TradesDTO[],
    positionUid: string,
    figi: string,
    type: string,
    price: PriceDTO,
    instrumentUid: string,
    currency: string,
    payment: PaymentDTO,
    id: string,
    quantityRest: string
}
