"use client";

import { Finish, Styles, UserName, UserUrl } from "@/components/hello/Steps";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { produce } from "immer";
import {
  Suspense,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import IconLoading from "~icons/line-md/loading-twotone-loop";

const FORM_STATE = {
  selectedIndex: 0,
  steps: {
    userUrl: {
      valid: false,
      dirty: false,
      value: {
        url_key: "",
      },
    },
    userName: {
      valid: false,
      dirty: false,
      value: {
        display_name: "",
        genres: [],
      },
    },
    theme: {
      valid: false,
      dirty: false,
      value: {
        theme: "0",
      },
    },
    finish: {
      valid: false,
      dirty: false,
    },
  },
};

const FORM_STEPS = [
  {
    label: `設定網址`,
  },
  {
    label: `設定名稱`,
  },
  {
    label: `選擇風格`,
  },
  {
    label: `完成`,
  },
];

export const FormStateContext = createContext({
  form: FORM_STATE,
  setForm: (
    form: typeof FORM_STATE | ((form: typeof FORM_STATE) => typeof FORM_STATE),
  ) => {},
});

function CreateTaskMultiStepFormContainer() {
  const [form, setForm] = useState(FORM_STATE);

  return (
    <FormStateContext.Provider
      value={{
        form,
        setForm,
      }}
    >
      <CreateTaskMultiStepForm />
    </FormStateContext.Provider>
  );
}

export const Loading = () => {
  return (
    <div className="grid h-32 w-full place-items-center">
      <IconLoading className="h-10 w-10" />
    </div>
  );
};

const CreateTaskMultiStepForm = () => {
  const { form, setForm } = useContext(FormStateContext);

  const next = useCallback(() => {
    setForm(
      produce((form) => {
        form.selectedIndex += 1;
      }),
    );
  }, [setForm]);

  const prev = useCallback(() => {
    setForm(
      produce((form) => {
        form.selectedIndex -= 1;
      }),
    );
  }, [setForm]);

  const setSelectedIndex = useCallback(
    (index: number) => {
      setForm(
        produce((form) => {
          form.selectedIndex = index;
        }),
      );
    },
    [setForm],
  );

  const selectedIndex = form.selectedIndex;
  const canSelectStep = (index: number) =>
    Object.values(form.steps)
      .slice(0, index)
      .every((step) => step.valid && !step.dirty);

  return (
    <div className="mx-auto mt-20 grid max-w-2xl place-items-center px-6">
      <Tabs
        defaultValue="0"
        value={String(selectedIndex)}
        onValueChange={(goToStep) => {
          if (canSelectStep(+goToStep)) setSelectedIndex(+goToStep);
        }}
        className="flex w-full flex-col justify-center"
      >
        <div className="flex justify-center">
          <TabsList>
            <TabsTrigger disabled value="reg">
              1. 註冊
            </TabsTrigger>
            {FORM_STEPS.map((step, index) => {
              return (
                <TabsTrigger key={index} value={String(index)}>
                  {index + 2 + ". " + step.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        <div className="p-6">
          <TabsContent value="0">
            <UserUrl onNext={next} />
          </TabsContent>
          <TabsContent value="1">
            <Suspense fallback={<Loading />}>
              <UserName onNext={next} onPrev={prev} />
            </Suspense>
          </TabsContent>
          <TabsContent value="2">
            <Styles onNext={next} onPrev={prev} />
          </TabsContent>
          <TabsContent value="3">
            <Finish onNext={next} onPrev={prev} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CreateTaskMultiStepFormContainer;
