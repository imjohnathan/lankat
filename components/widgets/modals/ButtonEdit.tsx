import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { classes } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { gql, useMutation } from "@urql/next";
import { produce } from "immer";
import { useEffect, useState } from "react";

interface Link {
  id?: string; //links的id，更新需要
  url: string | undefined | null;
}

interface WidgetLink {
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
          update_columns: [name, link_id]
        }
      }
    }
  ) {
    insert_widgets_one(
      object: $object
      on_conflict: { constraint: widgets_pkey, update_columns: [isShow, name] }
    ) {
      id
    }
  }
`;

function Preview({ fields }: { fields: WidgetLink[] }) {
  return (
    <div>
      <div className="mx-auto grid max-w-xs gap-4">
        {fields.map(({ name, url }, index) => (
          <div key={index} className="w-full">
            <Button asChild variant="outline" className="w-full">
              <a href={url}>{name ? name : "..."}</a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ButtonEdit({ widget }: { widget: WidgetLinkProps }) {
  const [form, setForm] = useState<Form>(initialForm);

  const [upsertWidgetLinksResult, upsertWidgetLinks] = useMutation(
    upsertWidgetLinksQuery,
  );

  // 處理新增欄位組的功能
  const addField = () => {
    setForm(
      produce((form) => {
        form.widgets_links.push({ name: "", url: "" });
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

  const sendForm = () => {
    const variables = form.widgets_links.map((field) => {});
  };

  useEffect(() => {
    if (!form.id) {
      let widgetLinks: WidgetLink[] = [];
      if (widget.widgets_links.length === 0) {
        widgetLinks = [{ name: "", url: "" }];
      } else {
        widgetLinks = widget.widgets_links.map(
          ({ id, name, isShow, link }, index) => {
            return {
              id,
              name: name || "",
              isShow,
              url: link?.url || "",
              link_id: link?.id,
            };
          },
        );
      }
      console.log(form);
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
            {form.widgets_links.map((field, index) => (
              <div
                key={index}
                className="grid gap-4 rounded-md border-[1px] border-solid p-4 py-4"
              >
                <div
                  className={cn(
                    classes,
                    "flex items-center justify-center overflow-hidden p-0",
                  )}
                >
                  <div className="flex h-full items-center justify-center bg-gray-100 px-4">
                    文字
                  </div>
                  <input
                    type="text"
                    id="name"
                    className="h-full flex-1 px-4 py-2 outline-0"
                    value={field.name}
                    onChange={(e) =>
                      handleFieldChange(index, { name: e.target.value })
                    }
                  />
                </div>
                <div
                  className={cn(
                    classes,
                    "flex items-center justify-center overflow-hidden p-0",
                  )}
                >
                  <div className="flex h-full items-center justify-center bg-gray-100 px-4">
                    連結
                  </div>
                  <input
                    type="text"
                    id="name"
                    className="h-full flex-1 px-4 py-2 outline-0"
                    value={field.url}
                    onChange={(e) =>
                      handleFieldChange(index, { url: e.target.value })
                    }
                  />
                </div>
              </div>
            ))}
            <Button onClick={addField}>新增</Button>
          </div>
          <code className="mt-10 block max-w-sm whitespace-pre">
            {JSON.stringify(form, null, 2)}
          </code>
        </ScrollArea>
        <div className="flex-1">
          <Preview fields={form.widgets_links} />
        </div>
      </div>
      <DialogFooter>
        <Button form="linkForm" type="submit">
          儲存
        </Button>
      </DialogFooter>
    </>
  );
}
