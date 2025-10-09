import { Group, type MultiSelectProps, Text } from '@mantine/core';
import type { FieldOption } from '../data/types.def.js';
import { getImageUrl } from '../helpers/image.js';

export const renderSelectOptionWithIcon: MultiSelectProps['renderOption'] = ({
  option: _option,
}) => {
  const option = _option as FieldOption;
  return (
    <Group gap="sm">
      {option.icon && (
        <img src={getImageUrl(option.icon)} alt="icon" height={20} />
      )}
      <Text size="sm">{option.label}</Text>
    </Group>
  );
};

// TODO: use https://mantine.dev/combobox/?e=MultiSelectValueRenderer
