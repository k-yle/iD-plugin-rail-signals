import { useMemo, useState, useSyncExternalStore } from 'react';
import {
  ActionIcon,
  Button,
  Card,
  Code,
  Flex,
  Group,
  Image,
  MultiSelect,
  Select,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { IconPlus, IconReplace, IconTrash } from '@tabler/icons-react';
import type * as iD from '@openstreetmap/id-plugin-sdk';
import { iso1A2Code } from '@rapideditor/country-coder';
import { ThemeProvider } from './components/ThemeProvider.js';
import type { Category, FieldOption } from './data/types.def.js';
import { CATEGORIES } from './data/schema.js';
import { AddModal } from './components/AddModal.js';
import { useConfirmModal } from './helpers/useConfirmModal.js';
import { StatesLongEditor } from './components/StatesLongEditor.js';
import { getImageUrl } from './helpers/image.js';
import { renderSelectOptionWithIcon } from './components/Select.js';
import { findPreset } from './helpers/preset.js';

export function isAllTagsHaveSameValue(tags: iD.MultiTags): tags is iD.Tags {
  return Object.values(tags).every((value) => !Array.isArray(value));
}

export const App: React.FC<{ domRoot: HTMLElement } & iD.PluginData> = ({
  domRoot,
  tagsStore,
  map,
  theme,
}) => {
  const country = useMemo(
    () =>
      // just for debugging (since the country currently isn't configurable in the UI)
      new URLSearchParams(window.location.search)
        .get('iDpO_country')
        ?.toUpperCase() || iso1A2Code(map.center)!,
    [map.center],
  );

  const [modal, setModal] = useState<Category | symbol>();

  const confirmModal = useConfirmModal();

  const tags = useSyncExternalStore(tagsStore.subscribe, tagsStore.getValue);

  if (!isAllTagsHaveSameValue(tags)) {
    return <>cannot use in this field with a multiselect</>;
  }

  return (
    <ThemeProvider domRoot={domRoot} themeColour={theme}>
      {Object.entries(CATEGORIES).map(([_cat, label]) => {
        const cat = _cat as Category;
        const value = tags[`railway:signal:${cat}`];
        if (!value) return null;

        const def = findPreset(tags, cat);

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
                        if (
                          key === `railway:signal:${cat}` ||
                          (key.startsWith(`railway:signal:${cat}:`) &&
                            // extra check to handle double categories like `train_protection:main`
                            !key
                              .replace(`railway:signal:${cat}:`, '')
                              .includes(':'))
                        ) {
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
                  // fixed value - no input field
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

                  if (!options.options.length) {
                    // there are no fixed options
                    return (
                      <TextInput
                        key={key}
                        label={key}
                        size="xs"
                        defaultValue={tags[`railway:signal:${cat}:${key}`]}
                        onBlur={(event) => {
                          const newTags = { ...tags };
                          if (event.target.value) {
                            newTags[`railway:signal:${cat}:${key}`] =
                              event.target.value;
                          } else {
                            delete newTags[`railway:signal:${cat}:${key}`];
                          }

                          return tagsStore.setValue(newTags);
                        }}
                      />
                    );
                  }

                  // there are limited options
                  const mappedOptions = options.options.map((o) => {
                    const option: FieldOption =
                      typeof o === 'string' ? { label: o } : o;
                    return { value: option.label, ...option };
                  });

                  // multi-select
                  if (options.multiple) {
                    return (
                      <MultiSelect
                        key={key}
                        label={key}
                        size="xs"
                        style={{ minWidth: '100%' }}
                        renderOption={renderSelectOptionWithIcon}
                        data={mappedOptions}
                        clearable
                        value={
                          tags[`railway:signal:${cat}:${key}`]?.split(';') || []
                        }
                        onChange={(newValue) => {
                          const newTags = { ...tags };
                          if (newValue.length) {
                            newTags[`railway:signal:${cat}:${key}`] =
                              newValue.join(';');
                          } else {
                            delete newTags[`railway:signal:${cat}:${key}`];
                          }
                          tagsStore.setValue(newTags);
                        }}
                      />
                    );
                  }

                  // single-select
                  const v = tags[`railway:signal:${cat}:${key}`] || '';
                  const selected = mappedOptions.find((o) => o.label === v);
                  return (
                    <Select
                      key={key}
                      label={key}
                      size="xs"
                      renderOption={renderSelectOptionWithIcon}
                      data={mappedOptions}
                      clearable
                      required={options.required}
                      value={v}
                      leftSection={
                        selected?.icon && (
                          <img
                            src={getImageUrl(selected.icon)}
                            alt="icon"
                            height={20}
                          />
                        )
                      }
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
          country={country}
          onClose={() => setModal(undefined)}
          onSelect={async (selected) => {
            const newTags = structuredClone(tags);

            const existing = tags[`railway:signal:${selected.category}`];

            const oldPreset = findPreset(tags, selected.category);

            // there can only be one per category, so show a confirmation
            // popup before overriding.
            if (existing && typeof modal !== 'string') {
              await confirmModal.open({
                title: `Override existing ${CATEGORIES[selected.category]} signal?`,
                description: (
                  <>
                    There is aready a <em>{CATEGORIES[selected.category]}</em>{' '}
                    signal, so if you continue,{' '}
                    <Code>{selected.signal.name}</Code> will replace{' '}
                    <Code>{oldPreset?.name || existing}</Code>.
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

            if (oldPreset?.const) {
              // delete all extra const tags from the old preset
              for (const key in oldPreset.const) {
                delete newTags[`railway:signal:${selected.category}:${key}`];
              }
            }

            newTags[`railway:signal:${selected.category}`] = selected.signal.id;
            newTags[`railway:signal:${selected.category}:form`] =
              selected.signal.form;

            for (const [key, value] of Object.entries(
              selected.signal.const || {},
            )) {
              newTags[`railway:signal:${selected.category}:${key}`] = value;
            }

            tagsStore.setValue(newTags);
          }}
        />
      )}
      {confirmModal.container}
    </ThemeProvider>
  );
};
App.displayName = 'SignalEditor';
