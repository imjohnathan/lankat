"use client";

import { lazy } from "react";
import { create } from "zustand";

const components = {
  LoadingModal: lazy(() => new Promise(() => {})),
  EditModal: lazy(() => import("@/components/widgets/modals")),
};

interface State {
  component: keyof typeof components | null;
  props: any;
  isLoading: boolean;
}

interface Actions {
  open: (payload: Partial<State>) => void;
  close: () => void;
  openLoadingModal: (props: any) => void;
  openEditModal: (props: any) => void;
}

const initialState = {
  component: null,
  props: {},
  isLoading: false,
};

const useModalStore = create<State & Actions>((set, get) => ({
  ...initialState,
  open: (payload: Partial<State>) => {
    payload = { ...initialState, ...payload };

    const { props, component, isLoading } = payload;

    if (component === null) {
      return;
    }

    const body = document.body;
    body.style.overflowY = "hidden";

    set({
      component: components[component] ?? null,
      props: props || {},
      isLoading,
    });
  },
  close: () => {
    const body = document.body;
    body.style.overflowY = "";
    set(initialState);
  },
  openEditModal: async (props: Partial<State>) => {
    get().open({
      props,
      component: "EditModal",
    });
  },
  openLoadingModal: async (props: Partial<State>) => {
    get().open({
      props,
      component: "LoadingModal",
    });
  },
}));

export default useModalStore;
