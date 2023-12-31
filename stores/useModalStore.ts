'use client';

import { lazy } from 'react';
import { create } from 'zustand';

export const components = {
  LoadingModal: lazy(() => new Promise(() => {})),
  EditModal: lazy(() => import('@/components/widgets/modals')),
  QRcodeModal: lazy(() => import('@/components/userpage/modals/QRcode')),
  AddEditLinkModal: lazy(() => import('@/components/links/AddEditLinksModal'))
};

interface State {
  component: keyof typeof components | null;
  props: any;
  isLoading: boolean;
  isOpen: boolean;
  unSavedChanges: boolean;
}

interface Actions {
  open: (payload: Partial<State>) => void;
  close: () => void;
  setUnSavedChanges: (unSavedChanges: boolean) => void;
  openLoadingModal: (props: any) => void;
  openEditModal: (props: any) => void;
  openQRcodeModal: (props: any) => void;
  openAddEditLinkModal: (props: any) => void;
}

const initialState = {
  component: null,
  isOpen: false,
  props: {},
  isLoading: false,
  unSavedChanges: false
};

const useModalStore = create<State & Actions>((set, get) => ({
  ...initialState,
  open: (payload: Partial<State>) => {
    payload = { ...initialState, ...payload };

    const { props, component, isLoading } = payload;

    if (!component || !components.hasOwnProperty(component)) {
      return;
    }

    const body = document.body;
    body.style.overflowY = 'hidden';

    set({
      isOpen: true,
      component,
      props: props || {},
      isLoading
    });
  },
  close: () => {
    const body = document.body;
    body.style.overflowY = '';

    set({ isOpen: false });

    setTimeout(() => {
      set(initialState);
    }, 300);
  },
  setUnSavedChanges: (unSavedChanges: boolean) => {
    set({ unSavedChanges });
  },
  openEditModal: async (props: Partial<State>) => {
    get().open({
      props: { ...props, className: 'max-w-screen-lg sm:max-h-[90vh] <sm:max-h-[calc(100%-4rem)] <sm:h-full' },
      component: 'EditModal'
    });
  },
  openLoadingModal: async (props: Partial<State>) => {
    get().open({
      props,
      component: 'LoadingModal'
    });
  },
  openQRcodeModal: async (props: Partial<State>) => {
    get().open({
      props,
      component: 'QRcodeModal'
    });
  },
  openAddEditLinkModal: async (props: Partial<State>) => {
    get().open({
      props: { ...props, className: 'max-w-screen-lg sm:max-h-[90vh] <sm:max-h-[calc(100%-4rem)] <sm:h-full' },
      component: 'AddEditLinkModal'
    });
  }
}));

export default useModalStore;
