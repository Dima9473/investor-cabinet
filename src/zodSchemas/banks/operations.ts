import { z } from 'zod';

import { OperationSchema } from './operation';

export const OperationsSchema = z.object({
  accountId: z
    .string({
      required_error: 'AccountId is required',
    })
    .trim()
    .min(1, 'AccountId cannot be empty'),
  operations: z.array(OperationSchema),
});
