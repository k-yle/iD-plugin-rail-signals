import { useCallback, useState } from 'react';
import { Button, Flex, Modal, Text } from '@mantine/core';

export interface Options {
  title: React.ReactNode;
  description?: React.ReactNode;
  buttonProps?: React.ComponentProps<typeof Button<'button'>>;
}

/** allows you to open a modal as a promise */
export function useConfirmModal() {
  const [state, setState] = useState<{
    options: Options;
    resolve(isOkay: boolean): void;
  }>();

  const open = useCallback((options: Options) => {
    return new Promise<boolean>((resolve) => {
      setState({ options, resolve });
    });
  }, []);

  const container = state && (
    <Modal
      opened
      zIndex={102} // iD's toolbar is 101
      title={<Text fw={700}>{state.options.title}</Text>}
      onClose={() => {
        state.resolve(false);
        setState(undefined);
      }}
    >
      {state.options.description}
      <Flex justify="end">
        <Button
          {...state.options.buttonProps}
          onClick={() => {
            state.resolve(true);
            setState(undefined);
          }}
        >
          {state.options.buttonProps?.children || 'OK'}
        </Button>
      </Flex>
    </Modal>
  );

  return { open, container };
}
