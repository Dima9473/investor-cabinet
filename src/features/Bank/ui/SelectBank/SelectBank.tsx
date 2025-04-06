import { BANK_NAMES } from 'lib/constants/bankNames';

import { Select } from 'shared/ui/Select';

export const SelectBank = () => {
  return (
    <Select
      label="Банк"
      options={Object.values(BANK_NAMES).map((bank) => ({
        id: bank,
        name: bank,
        option: bank,
      }))}
    />
  );
};

SelectBank.displayName = 'SelectBank';
