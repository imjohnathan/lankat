'use client';

import { Finish, Styles, UserName, UserUrl } from '@/components/hello/Steps';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { produce } from 'immer';
import { useSession } from 'next-auth/react';
import { Suspense, createContext, useCallback, useContext, useEffect, useState } from 'react';
import IconLoading from '~icons/line-md/loading-twotone-loop';
interface FormState {
  selectedIndex: number;
  steps: {
    userUrl: {
      valid: boolean;
      dirty: boolean;
      value: {
        url_key: string;
      };
    };
    userName: {
      valid: boolean;
      dirty: boolean;
      value: {
        display_name: string;
        genres: number[];
      };
    };
    theme: {
      valid: boolean;
      dirty: boolean;
      value: {
        theme: string;
      };
    };
    finish: {
      valid: boolean;
      dirty: boolean;
    };
  };
}

const FORM_STATE: FormState = {
  selectedIndex: 0,
  steps: {
    userUrl: {
      valid: false,
      dirty: false,
      value: {
        url_key: ''
      }
    },
    userName: {
      valid: false,
      dirty: false,
      value: {
        display_name: '',
        genres: []
      }
    },
    theme: {
      valid: false,
      dirty: false,
      value: {
        theme: '0'
      }
    },
    finish: {
      valid: false,
      dirty: false
    }
  }
};

const FORM_STEPS = [
  {
    label: `設定網址`
  },
  {
    label: `設定名稱`
  },
  {
    label: `選擇風格`
  },
  {
    label: `完成`
  }
];

export const FormStateContext = createContext({
  form: FORM_STATE,
  setForm: (form: typeof FORM_STATE | ((form: typeof FORM_STATE) => typeof FORM_STATE)) => {}
});

function CreateTaskMultiStepFormContainer() {
  const [form, setForm] = useState(FORM_STATE);

  return (
    <FormStateContext.Provider
      value={{
        form,
        setForm
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
  const { data: session } = useSession();
  const { form, setForm } = useContext(FormStateContext);

  const next = useCallback(() => {
    setForm(
      produce((form) => {
        form.selectedIndex += 1;
      })
    );
  }, [setForm]);

  const prev = useCallback(() => {
    setForm(
      produce((form) => {
        form.selectedIndex -= 1;
      })
    );
  }, [setForm]);

  const setSelectedIndex = useCallback(
    (index: number) => {
      setForm(
        produce((form) => {
          form.selectedIndex = index;
        })
      );
    },
    [setForm]
  );

  const selectedIndex = form.selectedIndex;
  const canSelectStep = (index: number) =>
    Object.values(form.steps)
      .slice(0, index)
      .every((step) => step.valid && !step.dirty);

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.userUrl.value.url_key = session?.user?.url_key || '';
        form.steps.userName.value.display_name = session?.user?.display_name || '';
        form.steps.userName.value.genres = [13];
      })
    );
  }, []);

  return (
    <div className="mx-auto mt-20 grid max-w-2xl place-items-center px-6 <md:overflow-hidden">
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
            <TabsTrigger
              disabled
              value="reg"
              className={cn({
                '<sm:hidden': selectedIndex !== 0
              })}
            >
              1. 註冊
            </TabsTrigger>
            {FORM_STEPS.map((step, index) => {
              return (
                <TabsTrigger
                  key={index}
                  value={String(index)}
                  className={cn({
                    '<sm:hidden': !(selectedIndex >= index - 1 && selectedIndex <= index + 1)
                  })}
                >
                  {index + 2 + '. ' + step.label}
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
