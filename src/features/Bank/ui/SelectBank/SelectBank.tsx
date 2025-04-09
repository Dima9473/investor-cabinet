import { BANK_NAMES } from 'lib/constants/bankNames';
import { useMemo } from 'react';
import { useStore } from 'store/useStore';

import { Select } from 'shared/ui/Select';

export const SelectBank = () => {
  const { bankId, setBankId } = useStore();

  const options = useMemo(
    () =>
      Object.entries(BANK_NAMES).map(([key, bank]) => ({
        id: key,
        name: bank,
        value: bank,
      })),
    [],
  );

  return (
    <Select
      label="Банк"
      options={options}
      onChange={(option) => {
        setBankId(option?.id);
      }}
      value={bankId}
    />
  );
};

SelectBank.displayName = 'SelectBank';
