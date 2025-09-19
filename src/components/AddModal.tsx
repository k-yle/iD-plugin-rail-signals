import { Fragment, useState } from 'react';
import {
  Button,
  Flex,
  Group,
  Image,
  Modal,
  ScrollArea,
  Text,
  TextInput,
} from '@mantine/core';
import { IconReplace, IconSearch } from '@tabler/icons-react';
import { CATEGORIES, SCHEMA } from '../data/schema.js';
import type { Category, Schema } from '../data/types.def.js';
import { getImageUrl } from '../helpers/image.js';

export const AddModal: React.FC<{
  limitToCategory: Category | undefined;
  country: string;
  onClose(): void;
  onSelect(data: {
    category: Category;
    signalId: string;
    signal: Schema.Signal;
  }): void;
}> = ({ limitToCategory, country, onClose, onSelect }) => {
  const networks = Object.values(SCHEMA[country]!);

  const [filter, setFilter] = useState('');
  const [network, setNetwork] = useState<Schema.Network | undefined>(() => {
    if (networks.length === 1) return networks[0];
    return undefined;
  });

  let anyMatches = false;

  return (
    <Modal
      opened
      zIndex={102} // iD's toolbar is 101
      onClose={onClose}
      title={
        <Flex justify="space-between" w="100%" align="center">
          <Text fw={700}>
            {limitToCategory
              ? `Replace ${CATEGORIES[limitToCategory]} Signal`
              : 'Add Signal'}
          </Text>
          <TextInput
            leftSectionPointerEvents="none"
            leftSection={<IconSearch stroke={1.5} />}
            placeholder="Search"
            w="50%"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />
          <span>&shy;</span>
        </Flex>
      }
      transitionProps={{ transition: 'pop', duration: 50 }}
      size="80vw"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      {network ? (
        <div>
          {networks.length > 1 && (
            <>
              <Button
                leftSection={<IconReplace size={14} />}
                variant="transparent"
                size="sm"
                p={0}
                onClick={() => setNetwork(undefined)}
              >
                Change Network
              </Button>
              <br />
            </>
          )}

          {Object.entries(network.signals).map(([_catId, cat]) => {
            const catId = _catId as Category;

            if (limitToCategory && limitToCategory !== catId) return null;

            const itemsToShow = Object.entries(cat).filter(([, signal]) =>
              filter
                ? signal.name.toLowerCase().includes(filter.toLowerCase())
                : true,
            );

            // hide category header if there are no matches
            if (!itemsToShow.length) return null;

            anyMatches = true;

            return (
              <Fragment key={catId}>
                <Text fw={500}>{CATEGORIES[catId]}</Text>
                <Flex gap={12} wrap="wrap" mb="lg">
                  {itemsToShow.map(([signalId, signal]) => (
                    <Button
                      key={signalId}
                      variant="default"
                      size="xl"
                      h="auto"
                      w={150}
                      p="sm"
                      onClick={() => {
                        onSelect({ category: catId, signalId, signal });
                        onClose();
                      }}
                    >
                      <Group justify="center" style={{ whiteSpace: 'wrap' }}>
                        <Image
                          src={getImageUrl(signal.image)}
                          height={50}
                          alt={signal.name}
                        />
                        <Text size="xs">{signal.name}</Text>
                      </Group>
                    </Button>
                  ))}
                </Flex>
              </Fragment>
            );
          })}
          {!(() => anyMatches)() && (
            <Flex w="100%" justify="center" my={32}>
              <Text c="dimmed" size="sm">
                No results
              </Text>
            </Flex>
          )}
        </div>
      ) : (
        <Flex gap={12}>
          {networks.map((n) => (
            <Button
              key={n.networkName}
              variant="default"
              size="xl"
              h="auto"
              onClick={() => setNetwork(n)}
            >
              <Flex direction="column">
                <Image
                  src={getImageUrl(n.networkImage)}
                  height={50}
                  alt={n.networkName}
                />
                <span>{n.networkName}</span>
              </Flex>
            </Button>
          ))}
        </Flex>
      )}
    </Modal>
  );
};
