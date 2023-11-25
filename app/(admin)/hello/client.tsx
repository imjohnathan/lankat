"use client";

import { Styles, UserName, UserUrl } from "@/components/hello/Steps";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { produce } from "immer";
import {
  Suspense,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";

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
    styles: {
      valid: false,
      dirty: false,
      value: {
        style: "",
      },
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
            {FORM_STEPS.map((step, index) => {
              return (
                <TabsTrigger key={index} value={String(index)}>
                  {index + 1 + ". " + step.label}
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
            <Suspense>
              <UserName onNext={next} onPrev={prev} />
            </Suspense>
          </TabsContent>
          <TabsContent value="2">
            <Styles onNext={next} onPrev={prev} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default CreateTaskMultiStepFormContainer;