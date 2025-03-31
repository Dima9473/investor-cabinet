import { z } from 'zod';

export const AccountSchema = z.object({
    id: z
    .string({
      required_error: 'AccountId is required',
    })
    .trim()
    .min(1, 'AccountId cannot be empty'),
  openedDate: z
    .string()
    .trim()
    .min(1, 'OpenedDate cannot be empty')
    .optional(),
  closedDate: z
    .string()
    .trim()
    .min(1, 'ClosedDate cannot be empty')
    .optional(),
  name: z
    .string()
    .trim()
    .min(1, 'Name cannot be empty')
    .optional(),
});
