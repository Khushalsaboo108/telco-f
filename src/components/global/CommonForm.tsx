"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IFormField } from "@/types/common";
import { LuEyeOff } from "react-icons/lu";
import { FaEye } from "react-icons/fa";
import { AnimatedCommonButton } from "./CommonButton";
import Editor from "@/components/admin/blog/Editor"; // Make sure this path is correct

// Default value for the Editor
export const defaultValue = {
  type: "doc",
  content: [
    {
      type: "paragraph",
      content: [],
    },
  ],
};

interface ICustomFormProps {
  fields: IFormField[];
  onSubmit?: (data: any) => void;
  submitButtonText?: string;
  submitButtonType?: "simple" | "unique";
  showSubmitButton?: boolean;
}

const CustomForm: React.FC<ICustomFormProps> = ({
  fields,
  onSubmit,
  submitButtonType = "simple",
  submitButtonText = "Submit",
  showSubmitButton = true,
}) => {
  // State for password visibility
  const [passwordVisibility, setPasswordVisibility] = useState<{
    [key: string]: boolean;
  }>({});

  // State for editor content
  const [editorContent, setEditorContent] = useState<{
    [key: string]: string;
  }>({});

  // Initialize editor content from field values
  useEffect(() => {
    const initialEditorContent: { [key: string]: string } = {};

    fields.forEach((field) => {
      if (field.type === "textEditor" && field.initialEditorContent) {
        initialEditorContent[field.name] = field.initialEditorContent;
      }
    });

    if (Object.keys(initialEditorContent).length > 0) {
      setEditorContent((prev) => ({
        ...prev,
        ...initialEditorContent,
      }));
    }
  }, [fields]);

  // Toggle password visibility
  const togglePasswordVisibility = (fieldName: string) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [fieldName]: !prev[fieldName],
    }));
  };

  // Generate Zod schema from fields
  const generateZodSchema = (fields: IFormField[]) => {
    const schemaMap: Record<string, any> = {};

    fields.forEach((field) => {
      let fieldSchema: any;

      // Apply schema based on field type
      if (field.type === "number") {
        fieldSchema = z.coerce.number();
      } else if (field.type === "date") {
        fieldSchema = z.date();
      } else if (field.type === "email") {
        fieldSchema = z
          .string()
          .email("Invalid email format")
          .regex(
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address"
          );
      } else if (field.type === "textEditor") {
        // For text editor, handle required differently
        if (field.rules?.some((rule) => rule.required)) {
          fieldSchema = z
            .string()
            .min(
              1,
              field.rules.find((r) => r.required)?.message ||
                `${field.label} is required`
            );
        } else {
          fieldSchema = z.string().optional();
        }
      } else {
        fieldSchema = z.string();
      }

      // Apply validation rules for non-textEditor fields
      if (
        field.type !== "textEditor" &&
        field.rules &&
        field.rules.length > 0
      ) {
        for (const rule of field.rules) {
          if (rule.required) {
            fieldSchema = fieldSchema.min(
              1,
              rule.message || `${field.label} is required`
            );
          }
          if (rule.min && field.type === "number") {
            fieldSchema = fieldSchema.min(
              rule.min,
              `Minimum value is ${rule.min}`
            );
          }
          if (rule.max && field.type === "number") {
            fieldSchema = fieldSchema.max(
              rule.max,
              `Maximum value is ${rule.max}`
            );
          }
          if (rule.pattern) {
            fieldSchema = fieldSchema.regex(
              rule.pattern,
              rule.message || "Invalid format"
            );
          }
        }
      }

      if (field.name === "conformPassword") {
        fieldSchema = z
          .string()
          .min(
            1,
            field.rules?.find((r) => r.required)?.message ||
              "Confirm Password is required"
          );
      }

      schemaMap[field.name] = fieldSchema;
    });
    const schema = z.object(schemaMap);

    // If we have both password and confirmPassword fields, add a refine method
    const hasPassword = fields.some((field) => field.name === "password");
    const hasConfirmPassword = fields.some(
      (field) => field.name === "conformPassword"
    );

    if (hasPassword && hasConfirmPassword) {
      return schema.refine((data) => data.password === data.conformPassword, {
        message: "Passwords do not match",
        path: ["conformPassword"], // Path determines which field gets the error
      });
    }

    return schema;
  };

  const formSchema = generateZodSchema(fields);

  // Set up the form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: fields.reduce((acc, field) => {
      acc[field.name] = field.value || "";
      return acc;
    }, {} as Record<string, any>),
  });

  // Handle form submission
  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    // Merge editor content with form data
    const mergedData = {
      ...data,
      ...editorContent,
    };

    if (onSubmit) {
      onSubmit(mergedData);
    }
  };

  // Check if a field is required
  const isFieldRequired = (field: IFormField): boolean => {
    return field.rules?.some((rule) => rule.required) || false;
  };

  // Render the appropriate field component based on type
  const renderFormField = (field: IFormField) => {
    const isRequired = isFieldRequired(field);

    switch (field.type) {
      case "textEditor":
        return (
          <FormItem key={field.name} className="mt-6">
            <FormLabel className="block text-sm font-medium text-lableTextColor mb-1">
              {field.label}{" "}
              {isRequired && <span className="text-red-500">*</span>}
            </FormLabel>
            <FormControl>
              <div className="border rounded-md bg-inputBackgroundColor focus:border-transparent outline-none transition-all">
                <Controller
                  name={field.name}
                  control={form.control}
                  render={({ field: formField }) => (
                    <Editor
                      initialValue={field.initialEditorContent || defaultValue}
                      onChange={(content) => {
                        // Preserve the content exactly as it comes from the editor
                        setEditorContent((prev) => ({
                          ...prev,
                          [field.name]: content,
                        }));
                        // Pass the exact HTML to the form controller
                        formField.onChange(content);
                      }}
                    />
                  )}
                />
              </div>
            </FormControl>
            <FormMessage className="text-red-500 font-medium text-[16px] mt-1" />
          </FormItem>
        );

      case "input":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className=" mt-6 ">
                <FormLabel className="block text-sm font-medium text-lableTextColor mb-1">
                  {field.label}{" "}
                  {isRequired && <span className="text-red-500">*</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    {...formField}
                    type="text"
                    placeholder={
                      field.placeholder || `Enter ${field.label.toLowerCase()}`
                    }
                    disabled={field.disable}
                    className={`${field.className} text-[20px] !important w-full px-4 py-6 rounded-md border bg-inputBackgroundColor focus:border-transparent outline-none transition-all`}
                  />
                </FormControl>
                <FormMessage className="text-red-500 font-medium text-[16px] mt-1" />
              </FormItem>
            )}
          />
        );

      case "email":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className="mt-6">
                <FormLabel className="block text-sm font-medium text-lableTextColor mb-1">
                  {field.label}{" "}
                  {isRequired && <span className="text-red-500">*</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    {...formField}
                    type="text"
                    placeholder={
                      field.placeholder || `Enter ${field.label.toLowerCase()}`
                    }
                    disabled={field.disable}
                    className={`${field.className} w-full px-4 py-6 rounded-md border bg-inputBackgroundColor focus:border-transparent outline-none transition-all`}
                  />
                </FormControl>
                <FormMessage className="text-red-500 font-medium text-[16px] mt-1" />
              </FormItem>
            )}
          />
        );

      case "number":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className=" mt-6 ">
                <FormLabel className="block text-sm font-medium text-lableTextColor mb-1">
                  {field.label}{" "}
                  {isRequired && <span className="text-red-500">*</span>}
                </FormLabel>
                <FormControl>
                  <Input
                    {...formField}
                    type="text"
                    inputMode="numeric"
                    placeholder={
                      field.placeholder || `Enter ${field.label.toLowerCase()}`
                    }
                    disabled={field.disable}
                    className="w-full px-4 py-6 rounded-md border focus:outline-none bg-inputBackgroundColor focus:border-transparent outline-none transition-all appearance-none"
                    maxLength={field.name === "phone" ? 10 : undefined}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      formField.onChange(value);
                    }}
                    style={{
                      MozAppearance: "textfield",
                    }}
                  />
                </FormControl>
                <FormMessage className="text-red-500 font-medium text-[16px] mt-1" />
              </FormItem>
            )}
          />
        );

      case "password":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className=" mt-6 ">
                <FormLabel className="block text-sm font-medium text-lableTextColor mb-1">
                  {field.label}{" "}
                  {isRequired && <span className="text-red-500">*</span>}
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...formField}
                      type={
                        passwordVisibility[field.name] ? "text" : "password"
                      }
                      placeholder={
                        field.placeholder ||
                        `Enter ${field.label.toLowerCase()}`
                      }
                      disabled={field.disable}
                      className="w-full px-4 py-6 rounded-md border bg-inputBackgroundColor focus:border-transparent outline-none transition-all pr-10"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      onClick={() => togglePasswordVisibility(field.name)}
                      tabIndex={-1}
                    >
                      {passwordVisibility[field.name] ? (
                        <LuEyeOff size={18} />
                      ) : (
                        <FaEye size={18} />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage className="text-red-500 font-medium text-[16px] mt-1" />
              </FormItem>
            )}
          />
        );

      case "textarea":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className=" mt-6 ">
                <FormLabel className="block text-sm font-medium text-lableTextColor mb-1">
                  {field.label}{" "}
                  {isRequired && <span className="text-red-500">*</span>}
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...formField}
                    placeholder={
                      field.placeholder || `Enter ${field.label.toLowerCase()}`
                    }
                    disabled={field.disable}
                    className="w-full px-4 py-5 rounded-md border bg-inputBackgroundColor focus:border-transparent outline-none transition-all"
                  />
                </FormControl>
                <FormMessage className="text-red-500 font-medium text-[16px] mt-1" />
              </FormItem>
            )}
          />
        );

      case "select":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className=" mt-6 ">
                <FormLabel className="block text-sm font-medium text-lableTextColor mb-1">
                  {field.label}{" "}
                  {isRequired && <span className="text-red-500">*</span>}
                </FormLabel>
                <Select
                  onValueChange={formField.onChange}
                  value={formField.value}
                  defaultValue={formField.value}
                  disabled={field.disable}
                >
                  <FormControl>
                    <SelectTrigger className="w-full px-4 py-6 rounded-md border bg-inputBackgroundColor focus:border-transparent outline-none transition-all">
                      <SelectValue
                        placeholder={
                          field.placeholder ||
                          `Select ${field.label.toLowerCase()}`
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem
                        key={String(option.value)}
                        value={String(option.value)}
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500 font-medium text-[16px] mt-1" />
              </FormItem>
            )}
          />
        );

      case "radio":
        return (
          <FormField
            key={field.name}
            control={form.control}
            name={field.name}
            render={({ field: formField }) => (
              <FormItem className=" mt-6 ">
                <FormLabel className="block text-sm font-medium text-lableTextColor mb-1">
                  {field.label}{" "}
                  {isRequired && <span className="text-red-500">*</span>}
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={formField.onChange}
                    defaultValue={formField.value}
                    className="flex space-x-4"
                    disabled={field.disable}
                  >
                    {field.options?.map((option) => (
                      <div
                        key={String(option.value)}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={String(option.value)}
                          id={`${field.name}-${option.value}`}
                        />
                        <FormLabel
                          htmlFor={`${field.name}-${option.value}`}
                          className="font-normal"
                        >
                          {option.label}
                        </FormLabel>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-red-500 font-medium text-[16px] mt-1" />
              </FormItem>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className=" w-full ">
        <div className=" w-full ">
          {fields.map((field) => renderFormField(field))}
        </div>
        {showSubmitButton &&
          (submitButtonType === "simple" ? (
            <button
              type="submit"
              className="w-full border shadow-lg md:w-auto px-8 mt-3 py-3 bg-inputBackgroundColor text-lableTextColor rounded-md  transition-colors duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitButtonText}
            </button>
          ) : (
            <AnimatedCommonButton text={submitButtonText} />
          ))}
      </form>
    </Form>
  );
};

export default CustomForm;
