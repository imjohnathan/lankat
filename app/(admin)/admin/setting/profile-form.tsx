"use client";

import AvatarUpload from "@/components/setting/AvatarUpload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SOCIAL_LISTS } from "@/lib/constants/socialIcons";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { gql, useMutation } from "@urql/next";
import { useContext } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import IconLoading from "~icons/line-md/loading-twotone-loop";
import IconMove from "~icons/solar/sort-outline";
import IconDelete from "~icons/solar/trash-bin-minimalistic-outline";
import { ProfileContext } from "./layout.client";

const updateUserQuery = gql`
  mutation UpdateUser(
    $_set: users_set_input! = {
      bio: ""
      display_name: ""
      email: ""
      image: ""
      social_links: ""
      url_key: ""
    }
    $pk_columns: users_pk_columns_input! = {
      id: "4a5e811c-e66b-4b3a-afe0-5c0e8dbdd447"
    }
  ) {
    update_users_by_pk(pk_columns: $pk_columns, _set: $_set) {
      id
    }
  }
`;

const profileFormSchema = z.object({
  avatar: z.string(),
  username: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
  bio: z.string().max(160).min(4),
  url_key: z.string().max(30).min(3),
  urls: z
    .array(
      z.object({
        service: z.string(),
        value: z.string().url({ message: "Please enter a valid URL." }),
      }),
    )
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export function SortableItem(props: any) {
  const { form, field, index, remove } = props;
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id, data: { index } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style}>
      <FormField
        control={form.control}
        key={field.id}
        name={`urls.${index}.value`}
        render={({ field: fieldItem }) => {
          const findSocial = SOCIAL_LISTS.find(
            (item) => item.value === field.service,
          );
          const Icon = findSocial?.icon;
          const label = findSocial?.label;
          const pttn = findSocial?.pttn;
          const placeholder = label && pttn ? `${label} / ${pttn}` : "URL";
          return (
            <FormItem>
              <FormControl>
                <div className="flex gap-3">
                  <div className="grid grid-cols-2 place-items-center gap-4">
                    <button type="button" {...attributes} {...listeners}>
                      <IconMove />
                    </button>
                    {findSocial && Icon && <Icon />}
                  </div>
                  <Input {...fieldItem} placeholder={placeholder} />
                  <Button
                    type="button"
                    variant="outline"
                    className="text-base text-red-600"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <IconDelete />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </div>
  );
}

export function ProfileForm() {
  const { user } = useContext(ProfileContext);
  const [{ fetching: updating }, updateUser] = useMutation(updateUserQuery);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const defaultValues: Partial<ProfileFormValues> = {
    bio: user.bio ?? "",
    urls: user.social_links,
    username: user.display_name ?? "",
    email: user.email ?? "",
    avatar: user.image ?? "",
    url_key: user.url_key ?? "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const { fields, append, remove, move } = useFieldArray({
    name: "urls",
    control: form.control,
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      const variables = {
        _set: {
          bio: data.bio,
          display_name: data.username,
          email: data.email,
          image: data.avatar,
          url_key: data.url_key,
          social_links: data.urls,
        },
        pk_columns: {
          id: user.id,
        },
      };
      const { data: updateData, error } = await updateUser(variables);
      if (error) throw new Error(error.message);
      toast.success("更新成功");
    } catch (e) {
      console.error(e);
      toast.error("更新失敗");
    }
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const {
        data: {
          current: { index: activeIndex },
        },
      } = active;
      const {
        data: {
          current: { index: activeOver },
        },
      } = over;
      move(activeIndex, activeOver);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormItem>
          <FormLabel>大頭貼</FormLabel>
          <FormControl>
            <AvatarUpload userId={user.id} form={form} />
          </FormControl>
          <FormMessage />
        </FormItem>

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>使用者名稱</FormLabel>
              <FormControl>
                <Input placeholder="使用者名稱" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url_key"
          render={({ field }) => (
            <FormItem>
              <FormLabel>頁面專屬網址</FormLabel>
              <FormControl>
                <Input placeholder="專屬網址" {...field} />
              </FormControl>
              <FormDescription>這是你頁面的專屬網址</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>個人簡介</FormLabel>
              <FormControl>
                <Textarea placeholder="跟我們說關於你的故事" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <FormLabel>社群連結</FormLabel>
          <FormDescription className="my-2">
            您可以在這裡加入您的社群連結，讓大家更了解您。
          </FormDescription>
          <div className="grid gap-3">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext
                items={fields.map(({ id }) => id)}
                strategy={verticalListSortingStrategy}
              >
                {fields.map((field, index) => (
                  <SortableItem
                    key={field.id}
                    form={form}
                    field={field}
                    index={index}
                    remove={remove}
                  />
                ))}
              </SortableContext>
            </DndContext>
          </div>
          <div className="mx-auto mt-6 grid max-w-lg grid-cols-10 place-items-center gap-4">
            {SOCIAL_LISTS.map(({ icon, value, label }, index) => {
              const Icon = icon;
              return (
                <TooltipProvider delayDuration={100} key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        className="text-base"
                        variant="outline"
                        size="icon"
                        onClick={() =>
                          append({
                            value: "",
                            service: value,
                          })
                        }
                      >
                        <Icon />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{label}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            })}
          </div>
        </div>
        <Button disabled={updating} type="submit">
          {updating ? (
            <>
              <IconLoading className="mr-3 h-4 w-4" />
              請稍候
            </>
          ) : (
            "儲存"
          )}
        </Button>
      </form>
    </Form>
  );
}
