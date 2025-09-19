import { useState, useSyncExternalStore } from 'react';
import {
  ActionIcon,
  Button,
  Card,
  Code,
  Flex,
  Group,
  Image,
  Select,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { IconPlus, IconReplace, IconTrash } from '@tabler/icons-react';
import type * as iD from '@openstreetmap/id-plugin-sdk';
import { ThemeProvider } from './components/ThemeProvider.js';
import type { Category } from './data/types.def.js';
import { CATEGORIES, SCHEMA } from './data/schema.js';
import { AddModal } from './components/AddModal.js';
import { useConfirmModal } from './helpers/useConfirmModal.js';
import { StatesLongEditor } from './components/StatesLongEditor.js';
import { getImageUrl } from './helpers/image.js';

export function isAllTagsHaveSameValue(tags: iD.MultiTags): tags is iD.Tags {
  return Object.values(tags).every((value) => !Array.isArray(value));
}

const COUNTRY = 'NZ' as const; // TODO: get from upstream

export const App: React.FC<{ domRoot: HTMLElement } & iD.PluginData> = ({
  domRoot,
  tagsStore,
}) => {
  const [modal, setModal] = useState<Category | symbol>();

  const confirmModal = useConfirmModal();

  const tags = useSyncExternalStore(tagsStore.subscribe, tagsStore.getValue);

  if (!isAllTagsHaveSameValue(tags)) {
    return <>cannot use in this field with a multiselect</>;
  }

  return (
    <ThemeProvider domRoot={domRoot}>
      {Object.entries(CATEGORIES).map(([_cat, label]) => {
        const cat = _cat as Category;
        const value = tags[`railway:signal:${cat}`];
        if (!value) return null;

        const def = Object.values(SCHEMA[COUNTRY]!)
          .map((network) => network.signals[cat]?.[value])
          .find(Boolean);

        // these are rendered as a single field
        if (def?.extra?.states && def.extra.states_long) {
          delete def.extra.states;
        }

        return (
          <Card key={cat} shadow="sm" p={0} radius="md" my={8} withBorder>
            <Group justify="space-between" pe="sm">
              <Group>
                {def && (
                  <Image src={getImageUrl(def?.image)} height={50} p={4} />
                )}
                <Flex direction="column">
                  <Text size="sm" fw={500}>
                    {def?.name || <em>Unknown</em>}
                  </Text>
                  <Text c="dimmed" size="xs">
                    {value}
                  </Text>
                </Flex>
              </Group>
              <Group gap={6}>
                <Tooltip label={`Swap ${label} Signal`}>
                  <ActionIcon
                    variant="default"
                    size="sm"
                    onClick={() => setModal(cat)}
                  >
                    <IconReplace stroke={1.5} />
                  </ActionIcon>
                </Tooltip>
                <Tooltip label="Delete">
                  <ActionIcon
                    variant="default"
                    size="sm"
                    onClick={() => {
                      const newTags = structuredClone(tags);
                      for (const key in newTags) {
                        if (key.startsWith(`railway:signal:${cat}`)) {
                          delete newTags[key];
                        }
                      }
                      tagsStore.setValue(newTags);
                    }}
                  >
                    <IconTrash stroke={1.5} color="red" />
                  </ActionIcon>
                </Tooltip>
              </Group>
            </Group>
            {def?.extra && (
              <Group p="sm" style={{ textTransform: 'capitalize' }}>
                {Object.entries(def.extra).map(([key, options]) => {
                  if (key === 'states_long') {
                    // special field
                    return (
                      <StatesLongEditor
                        key={key}
                        tags={tags}
                        category={cat}
                        onChange={(newTags) =>
                          tagsStore.setValue({ ...tags, ...newTags })
                        }
                      />
                    );
                  }

                  if (options.length) {
                    // there are limited options
                    return (
                      <Select
                        key={key}
                        label={key}
                        size="xs"
                        data={options}
                        clearable
                        value={tags[`railway:signal:${cat}:${key}`]}
                        onChange={(newValue) => {
                          const newTags = { ...tags };
                          if (newValue) {
                            newTags[`railway:signal:${cat}:${key}`] = newValue;
                          } else {
                            delete newTags[`railway:signal:${cat}:${key}`];
                          }
                          tagsStore.setValue(newTags);
                        }}
                      />
                    );
                  }

                  // there are no fixed options
                  return (
                    <TextInput
                      key={key}
                      label={key}
                      size="xs"
                      value={tags[`railway:signal:${cat}:${key}`]}
                      onBlur={(event) =>
                        tagsStore.setValue({
                          ...tags,
                          [`railway:signal:${cat}:${key}`]: event.target.value,
                        })
                      }
                    />
                  );
                })}
              </Group>
            )}
          </Card>
        );
      })}
      <Button
        size="xs"
        leftSection={<IconPlus size={18} />}
        onClick={() => setModal(Symbol(''))}
      >
        Add
      </Button>
      {modal && (
        <AddModal
          limitToCategory={typeof modal === 'string' ? modal : undefined}
          country={COUNTRY}
          onClose={() => setModal(undefined)}
          onSelect={async (selected) => {
            const newTags = structuredClone(tags);

            const existing = tags[`railway:signal:${selected.category}`];

            // there can only be one per category, so show a confirmation
            // popup before overriding.
            if (existing && typeof modal !== 'string') {
              await confirmModal.open({
                title: `Override existing ${CATEGORIES[selected.category]} signal?`,
                description: (
                  <>
                    There is aready a <em>{CATEGORIES[selected.category]}</em>{' '}
                    signal, so if you continue, <Code>{selected.signalId}</Code>{' '}
                    will replace <Code>{existing}</Code>.
                  </>
                ),
                buttonProps: {
                  color: 'red',
                  children: 'Continue',
                },
              });

              // delete any extra tags from the signal that will be overwritten
              for (const key in newTags) {
                if (key.startsWith(`railway:signal:${selected.category}`)) {
                  delete newTags[key];
                }
              }
            }

            newTags[`railway:signal:${selected.category}`] = selected.signalId;
            newTags[`railway:signal:${selected.category}:form`] =
              selected.signal.form;

            tagsStore.setValue(newTags);
          }}
        />
      )}
      {confirmModal.container}
    </ThemeProvider>
  );
};
App.displayName = 'SignalEditor';
