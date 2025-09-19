/* eslint-disable no-void */
import { useRef } from 'react';
import {
  ActionIcon,
  Button,
  Group,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import type { Tags } from '@openstreetmap/id-plugin-sdk';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import type { Category } from '../data/types.def.js';

export const StatesLongEditor: React.FC<{
  tags: Tags;
  category: Category;
  onChange(newTags: Tags): void;
}> = ({ tags, category, onChange }) => {
  const refs = useRef<Map<number, HTMLInputElement | null>>(new Map());
  const shortKey = `railway:signal:${category}:states`;
  const longKey = `railway:signal:${category}:states_long`;

  const short = tags[shortKey]?.split(';') || [];
  const long = tags[longKey]?.split(';') || [];

  // should be the same, but we have to handle bad data.
  // and always show one row even if there
  const length = Math.max(1, short.length, long.length);

  const canAddNewRow = short[length - 1] || long[length - 1];

  function addNewRow() {
    if (!canAddNewRow) return;

    const newShort = [...short];
    const newLong = [...long];
    newShort[length] = '';
    newLong[length] = '';
    onChange({
      [shortKey]: newShort.join(';'),
      [longKey]: newLong.join(';'),
    });
  }

  function onKeyDown(event: React.KeyboardEvent, i: number) {
    const offset = event.shiftKey ? -1 : +1;
    if (event.key === 'Enter') {
      const getNext = () => refs.current.get(i + offset);
      if (!getNext()) addNewRow();
      requestAnimationFrame(() => getNext()?.focus());
    }
  }

  return (
    <div style={{ width: '100%' }}>
      <Text size="sm" fw={600}>
        States
      </Text>
      {Array.from({ length })
        .fill(0)
        .map((_, i) => (
          // eslint-disable-next-line @eslint-react/no-array-index-key
          <Group key={i} gap={0} style={{ marginBottom: -1 }}>
            <TextInput
              ref={(r) => void refs.current.set(i, r)}
              onKeyDown={(event) => onKeyDown(event, i)}
              value={short[i] || ''}
              onChange={(event) => {
                const newShort = [...short];
                newShort[i] = event.target.value;
                onChange({
                  [shortKey]: newShort.join(';'),
                  [longKey]: long.join(';'),
                });
              }}
              size="xs"
              placeholder="U"
              w="40px"
              styles={{
                input: {
                  paddingLeft: 4,
                  borderRight: 'none',
                  ...(i && { borderTopLeftRadius: 0 }),
                  borderTopRightRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                },
              }}
            />
            <TextInput
              ref={(r) => void refs.current.set(i + 0.5, r)}
              onKeyDown={(event) => onKeyDown(event, i + 0.5)}
              value={long[i] || ''}
              onChange={(event) => {
                const newLong = [...long];
                newLong[i] = event.target.value;
                onChange({
                  [shortKey]: short.join(';'),
                  [longKey]: newLong.join(';'),
                });
              }}
              size="xs"
              placeholder="Up Main"
              rightSection={
                <Tooltip label="Delete">
                  <ActionIcon
                    variant="transparent"
                    size="xs"
                    onClick={() => {
                      const newShort = [...short];
                      const newLong = [...long];
                      newShort.splice(i, 1);
                      newLong.splice(i, 1);
                      onChange({
                        [shortKey]: newShort.join(';'),
                        [longKey]: newLong.join(';'),
                      });
                    }}
                  >
                    <IconTrash stroke={1.5} color="red" />
                  </ActionIcon>
                </Tooltip>
              }
              style={{ width: 'calc(100% - 40px)' }}
              styles={{
                input: {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  ...(i && { borderTopRightRadius: 0 }),
                  ...(i !== length - 1 && { borderBottomRightRadius: 0 }),
                },
              }}
            />
          </Group>
        ))}
      <Tooltip label="Add value">
        <Button
          size="xs"
          variant="default"
          w="41px"
          leftSection={<IconPlus size={14} />}
          style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
          onClick={addNewRow}
          disabled={!canAddNewRow}
        />
      </Tooltip>
    </div>
  );
};
