import { z } from "zod"

const PaymentSchema = z.object({
    nano: z.number(),
    currency: z.string().trim().min(1, 'Currency cannot be empty'),
    units: z.string().trim().min(1, 'Units cannot be empty'),
})

const ChildOperationSchema = z.object({
    instrumentUid: z.string().trim().min(1, 'InstrumentUid cannot be empty'),
    payment: PaymentSchema,
})

const PriceSchema = z.object({
    nano: z.number(),
    currency: z.string().trim().min(1, 'Currency cannot be empty'),
    units: z.string().trim().min(1, 'Units cannot be empty'),
})

const TradesSchema = z.object({
    tradeId: z.string().trim().min(1, 'TradeId cannot be empty'),
    dateTime: z.string().trim().min(1, 'DateTime cannot be empty'),
    quantity: z.string().trim().min(1, 'Quantity cannot be empty'),
    price: PriceSchema,
})

export const OperationSchema = z.object({
    date: z.string().trim().min(1, 'Date cannot be empty'),
    assetUid: z.string().trim().min(1, 'AssetUid cannot be empty'),
    instrumentType: z.string().trim().min(1, 'InstrumentType cannot be empty'),
    childOperations: z.array(ChildOperationSchema),
    quantity: z.string().trim().min(1, 'Quantity cannot be empty'),
    parentOperationId: z.string().trim().min(1, 'ParentOperationId cannot be empty'),
    trades: z.array(TradesSchema),
    positionUid: z.string().trim().min(1, 'PositionUid cannot be empty'),
    figi: z.string().trim().min(1, 'Figi cannot be empty'),
    type: z.string().trim().min(1, 'Type cannot be empty'),
    price: PriceSchema,
    instrumentUid: z.string().trim().min(1, 'InstrumentUid cannot be empty'),
    currency: z.string().trim().min(1, 'Currency cannot be empty'),
    payment: PaymentSchema,
    id: z.string().trim().min(1, 'Id cannot be empty'),
    quantityRest: z.string().trim().min(1, 'QuantityRest cannot be empty'),
})

