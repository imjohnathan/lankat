"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import Sketch from "@uiw/react-color-sketch";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

interface ColorFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  label: string;
  name: keyof T;
  classNames?: string;
}

export function ColorForm<T extends FieldValues>({
  form,
  label,
  name,
  classNames,
}: ColorFormProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name as Path<T>}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex h-16 flex-row items-center justify-between space-y-0 rounded-lg border px-4",
            classNames,
          )}
        >
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="flex items-center gap-3">
              <Input className="h-8 w-[102px] py-0 font-mono" {...field} />
              <Popover>
                <PopoverTrigger className="block">
                  <div>
                    <div
                      className="h-10 w-10 overflow-hidden rounded-full border-2 border-solid border-gray-300"
                      style={{
                        background: `rgba(50, 50, 50, 0.25)
                            repeating-conic-gradient(
                              rgba(50, 50, 50, 0.25) 0% 25%,
                              transparent 0% 50%
                            )
                            50% / 10px 10px`,
                      }}
                    >
                      <div
                        className="h-full w-full"
                        style={{ backgroundColor: field.value }}
                      />
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-[218px] p-1">
                  <Sketch
                    style={{
                      width: "100%",
                      borderRadius: 0,
                      boxShadow: "none",
                    }}
                    color={field.value}
                    onChange={(color) => field.onChange(color.hexa)}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface SliderFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  label: string;
  name: keyof T;
  max: number;
  min: number;
  step: number;
  unit?: string;
  classNames?: string;
}

export function SliderForm<T extends FieldValues>({
  form,
  label,
  name,
  max,
  min,
  step,
  unit,
  classNames,
}: SliderFormProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name as Path<T>}
      render={({ field }) => {
        return (
          <FormItem
            className={cn(
              "flex h-20 flex-row flex-wrap items-center justify-between space-y-0 rounded-lg border px-4",
              classNames,
            )}
          >
            <FormLabel>{label}</FormLabel>
            <div className="text-sm font-medium">
              {field.value}
              <span className="text-xs">{unit}</span>
            </div>
            <FormControl>
              <div className="w-full pb-1">
                <Slider
                  onValueChange={(v) => field.onChange(v[0])}
                  defaultValue={[field.value] ?? min}
                  max={max}
                  min={min}
                  step={step}
                  className="py-2"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

interface RadioFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  label: string;
  name: keyof T;
  items: { label: string; value: string }[];
  classNames?: string;
}

export function RadioForm<T extends FieldValues>({
  form,
  label,
  name,
  items,
  classNames,
}: RadioFormProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name as Path<T>}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex h-10 flex-row items-center justify-between space-y-0 rounded-lg border px-4 py-2",
            classNames,
          )}
        >
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              value={field.value}
              className="flex flex-row gap-5"
            >
              {items.map(({ label, value }) => (
                <FormItem
                  key={value}
                  className="flex items-center space-x-2 space-y-0"
                >
                  <FormControl>
                    <RadioGroupItem value={value} />
                  </FormControl>
                  <FormLabel className="font-normal">{label}</FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface SwitchFormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  label: string;
  name: keyof T;
  classNames?: string;
  switchClassnames?: string;
}

export function SwitchForm<T extends FieldValues>({
  form,
  label,
  name,
  classNames,
  switchClassnames,
}: SwitchFormProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name as Path<T>}
      render={({ field }) => (
        <FormItem
          className={cn(
            "flex h-16 flex-row items-center justify-between space-y-0 rounded-lg border px-4",
            classNames,
          )}
        >
          <FormLabel className="text-sm">{label}</FormLabel>
          <FormControl>
            <Switch
              className={switchClassnames}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
