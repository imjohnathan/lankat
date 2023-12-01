import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PreviewItem } from "@/components/widgets/preview/Buttons";
import { isValidUrl } from "@/lib/utils";
import useModalStore from "@/stores/useModalStore";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { gql, useMutation } from "@urql/next";
import { produce } from "immer";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import Fields from "./Fields";

interface Link {
  id?: string; //links的id，更新需要
  url: string | undefined | null;
}

export interface WidgetLink {
  dragId: string;
  id?: number; //widget_links 中介合集id，更新需要
  name: string; //按鈕名稱
  link_id?: string; //將Link關聯時需要
  url: string;
  isShow?: boolean;
  link?: Link;
}

interface Form {
  id: string;
  name: string;
  isShow?: boolean;
  type: string;
  widgets_links: WidgetLink[];
}

interface WidgetLinkProps {
  id: string;
  link_id: string;
  name: string;
  widget_id: string;
  widgets_links: WidgetLink[];
}

const initialForm: Form = {
  name: "",
  id: "", //widget的id，必要
  type: "links",
  widgets_links: [],
};

const upsertWidgetLinksQuery = gql`
  mutation upsertWidget(
    $object: widgets_insert_input = {
      id: "17daee77-4830-437b-9a78-8dcd730b53bd"
      isShow: true
      name: "好看的小工具"
      user: "4a5e811c-e66b-4b3a-afe0-5c0e8dbdd447"
      widgets_links: {
        data: [
          {
            id: 11 #更新需要
            #link_id: "8b348d87-c081-4b3b-bf6a-15fed934f372" #將Link關聯時需要
            name: "按鈕名稱6"
            link: {
              data: {
                id: "8b348d87-c081-4b3b-bf6a-15fed934f372" #更新需要
                key: "gdfgdg" #新增需要
                user: "4a5e811c-e66b-4b3a-afe0-5c0e8dbdd447" #新增需要
                url: "https://tyutyutyut" #新增更新都需要
              }
              on_conflict: { constraint: links_pkey, update_columns: url }
            }
          }
        ]
        on_conflict: {
          constraint: widgets_links_pkey
          update_columns: [name, link_id, isShow]
        }
      }
    }
    $deleteIds: widgets_links_bool_exp = { id: { _in: [] } }
  ) {
    insert_widgets_one(
      object: $object
      on_conflict: { constraint: widgets_pkey, update_columns: [isShow, name] }
    ) {
      id
    }
    delete_widgets_links(where: $deleteIds) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export function Preview({ fields }: { fields: WidgetLink[] }) {
  return (
    <div>
      <div className="mx-auto grid max-w-xs gap-4">
        {fields.map(({ name, url, isShow }, index) => (
          <PreviewItem
            key={index}
            name={name}
            url={url}
            isShow={isShow ?? true}
          />
        ))}
      </div>
    </div>
  );
}
export default function ButtonEdit({ widget }: { widget: WidgetLinkProps }) {
  const [form, setForm] = useState<Form>(initialForm);
  const deletedFields = useRef<number[]>([]);
  const { data: session } = useSession();
  const { close } = useModalStore();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );
  const [upsertWidgetLinksResult, upsertWidgetLinks] = useMutation(
    upsertWidgetLinksQuery,
  );

  // 處理新增欄位組的功能
  const addField = () => {
    setForm(
      produce((form) => {
        form.widgets_links.push({
          dragId: nanoid(),
          isShow: true,
          name: "",
          url: "",
        });
      }),
    );
  };

  // 處理欄位值變化的功能
  const handleFieldChange = (index: number, field: Partial<WidgetLink>) => {
    setForm(
      produce((form) => {
        form.widgets_links[index] = { ...form.widgets_links[index], ...field };
      }),
    );
  };

  const handleDeleteField = (index: number) => {
    setForm(
      produce((form) => {
        form.widgets_links.splice(index, 1);
      }),
    );
    const deletedFieldId = form.widgets_links[index]?.id || null;
    if (deletedFieldId) deletedFields.current.push(deletedFieldId);
  };

  const handleCopyField = (index: number) => {
    setForm(
      produce((form) => {
        const field = { ...form.widgets_links[index], dragId: nanoid() };
        delete field.id;
        delete field.link_id;
        form.widgets_links.splice(index + 1, 0, field);
      }),
    );
  };

  const handleShowField = (index: number) => {
    setForm(
      produce((form) => {
        form.widgets_links[index].isShow = !form.widgets_links[index].isShow;
      }),
    );
  };

  const sendForm = async () => {
    try {
      form.widgets_links.forEach(({ name, url }) => {
        if (!name || !url) throw new Error("文字或連結不得為空");
        if (!isValidUrl(url)) throw new Error("連結格式錯誤");
      });
      const variablesLinks = form.widgets_links.map((field, index) => {
        const fieldData = {
          name: field.name,
          sort: index,
          //更新時把link_id加入，only for關聯已存在的連結
          ...(!field.id && field.link_id && { link_id: field.link_id }),
          //更新時把widgets_links id, isShow 加入
          ...(field.id && { id: field.id, isShow: field.isShow }),
          link: {
            data: {
              url: field.url,
              //更新時才把link_id帶入
              ...(field.link_id && { id: field.link_id }),
              //新增時才帶入key和user
              ...(!field.id && { key: nanoid(7) }),
            },
            on_conflict: {
              constraint: "links_pkey",
              update_columns: ["url"],
            },
          },
        };

        return fieldData;
      });

      const variables = {
        object: {
          id: form.id,
          isShow: form.isShow,
          name: form.name,
          widgets_links: {
            data: variablesLinks,
            on_conflict: {
              constraint: "widgets_links_pkey",
              update_columns: ["name", "link_id", "isShow", "sort"],
            },
          },
        },
        deleteIds: { id: { _in: deletedFields.current } },
      };
      const { error } = await upsertWidgetLinks(variables);
      if (error) throw new Error(error.message);
      toast.success("儲存成功！");
      close();
    } catch (e) {
      if (e instanceof Error) {
        console.error(e.message);
        toast.error("錯誤：" + e.message);
        throw new Error(e.message);
      } else {
        console.error("An unknown error occurred");
        throw new Error("An unknown error occurred");
      }
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    console.log(active, over);
    if (active.id !== over?.id) {
      setForm(
        produce((form) => {
          const oldIndex = form.widgets_links.findIndex(
            ({ dragId }) => dragId === active.id,
          );
          const newIndex = form.widgets_links.findIndex(
            ({ dragId }) => dragId === over?.id,
          );

          form.widgets_links = arrayMove(
            form.widgets_links,
            oldIndex,
            newIndex,
          );
        }),
      );
    }
  };

  useEffect(() => {
    if (!form.id) {
      let widgetLinks: WidgetLink[] = [];
      if (widget.widgets_links.length === 0) {
        widgetLinks = [{ dragId: nanoid(), name: "", url: "", isShow: true }];
      } else {
        widgetLinks = widget.widgets_links.map(
          ({ id, name, isShow, link }, index) => {
            return {
              dragId: nanoid(),
              id,
              name: name || "",
              isShow,
              url: link?.url || "",
              link_id: link?.id,
            };
          },
        );
      }
      setForm((prev) => ({ ...prev, ...widget, widgets_links: widgetLinks }));
    }
  }, [form, widget]);

  return (
    <>
      <DialogHeader>
        <DialogTitle>編輯連結列表</DialogTitle>
        <DialogDescription>新增完成後就可顯示在頁面裡面啦！</DialogDescription>
      </DialogHeader>
      <div className="flex">
        <ScrollArea className="max-h-[500px] flex-1 px-4">
          <div className="grid gap-3">
            <DndContext
              modifiers={[restrictToVerticalAxis]}
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={useMemo(
                  () => form.widgets_links.map(({ dragId }) => dragId),
                  [form.widgets_links],
                )}
                strategy={verticalListSortingStrategy}
              >
                {form.widgets_links.map((field, index) => (
                  <Fields
                    key={index}
                    index={index}
                    field={field}
                    handleFieldChange={handleFieldChange}
                    handleDeleteField={handleDeleteField}
                    handleCopyField={handleCopyField}
                    handleShowField={handleShowField}
                  />
                ))}
              </SortableContext>
            </DndContext>
            <Button onClick={addField}>新增</Button>
          </div>
          {/* <code className="mt-10 block max-w-sm whitespace-pre">
            {JSON.stringify(form, null, 2)}
          </code> */}
        </ScrollArea>
        <div className="flex-1">
          <Preview fields={form.widgets_links} />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={sendForm} form="linkForm" type="submit">
          儲存
        </Button>
      </DialogFooter>
    </>
  );
}
