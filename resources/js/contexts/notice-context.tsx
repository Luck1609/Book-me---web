import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

import { Notice } from '@/components/form/notice';
import { Modal } from '@/components/ui/dialog';


type NoticeClassNames = {
  container?: string;
  title?: string;
  description?: string;
  footer?: {
    container?: string;
    cancelButton?: string;
    continueButton?: string;
  };
}

export type NoticeModalConfig = {
  type: 'modal';
  content: ReactNode;
  modalType?: 'default' | 'custom'
  classNames?: {
    trigger?: string;
    content?: string;
    heading?: {
      header?: string;
      title?: string;
      description?: string;
    }
  }
}
type NoticeContextConfig = {
  title?: string;
  description?: string;
} & ({
  type: 'notice';
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  classNames?: NoticeClassNames;
} | NoticeModalConfig | {
  type: 'alert';
  classNames?: NoticeClassNames
})


interface NoticeContextType {
  show: (config: NoticeContextConfig) => void;
  hide: () => void;
  isOpen: boolean;
  isLoading: boolean;
  toggleLoading: (state: boolean) => void;
}

const NoticeContext = createContext<NoticeContextType | undefined>(undefined);

interface NoticeProviderProps {
  children: ReactNode;
}

export function NoticeProvider({ children }: NoticeProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [config, setConfig] = useState<NoticeContextConfig>({
    title: '',
    description: '',
    type: 'notice',
    onConfirm: () => {},
  });

  const showNotice = (config: NoticeContextConfig) => {
    setConfig(config);
    setIsOpen(true);
  };

  const hideNotice = () => {
    setIsOpen(false);
  };

  const handleAction = () => {
    if (config.type === 'notice' && config.onConfirm) {
      config.onConfirm();
    }
  };

  const toggleLoading = (state: boolean) => {
    setIsLoading(state)
  }

  return (
    <NoticeContext.Provider value={{ show: showNotice, hide: hideNotice, isOpen, isLoading, toggleLoading }}>
      {children}

      {
        config.type === 'notice' || config.type === 'alert'
          ? (
            <Notice
              title={config.title}
              description={config.description}
              open={isOpen}
              type={config.type}
              toggler={hideNotice}
              action={handleAction}
              classNames={config.classNames}
              isLoading={isLoading}
            />

          )
          : (
            <Modal
              title={config?.title}
              description={config.description}
              open={isOpen}
              dialogToggler={hideNotice}
              classNames={config.classNames}
              modalType={config.modalType}
            >{config.content}</Modal>
          )
      }


    </NoticeContext.Provider>
  );
}

export function useNotice() {
  const context = useContext(NoticeContext);

  if (context === undefined) {
    throw new Error('useNotice must be used within a NoticeProvider');
  }

  return context;
}
