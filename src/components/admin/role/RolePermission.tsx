"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { IRole, IPermission, IRoleResponse } from "@/types/role";
import CustomTable from "@/components/global/CustomTable";
import { createRole, updateRole } from "@/app/actions/role.action";
import { AVAILABLE_MODULES, PERMISSIONS } from "@/utils/constants";

// Schema and Types
const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  description: z
    .string()
    .min(2, { message: "Description must be at least 2 characters" }),
  selectedModules: z
    .array(z.string())
    .min(1, { message: "Select at least one module" }),
});

interface PermissionData {
  key: string;
  permission: string;
  permissionAction: {
    [key: string]: boolean;
  };
}

interface RoleFormProps {
  initialData?: IRoleResponse | null;
  createNew?: boolean;
  id?: string;
}

export default function RoleForm({
  initialData,
  createNew = false,
  id,
}: RoleFormProps) {
  const router = useRouter();
  const [permissionData, setPermissionData] = useState<PermissionData[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [tableParams, setTableParams] = useState({ page: 1, limit: 10 });
  const [commandOpen, setCommandOpen] = useState(false);

  // Form initialization
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.data.name || "",
      description: initialData?.data.description || "",
      selectedModules:
        initialData?.data.permissions?.map((p) => p.module) || [],
    },
  });

  // Initialize permission data from initialData
  useEffect(() => {
    if (!initialData?.data.permissions) return;

    const initialPermissionData = initialData.data.permissions.map(
      (permission) => ({
        key: permission.module,
        permission:
          AVAILABLE_MODULES.find((m) => m._id === permission.module)?.name ||
          permission.module,
        permissionAction: {
          create: permission.actions.create,
          read: permission.actions.read,
          update: permission.actions.update,
          delete: permission.actions.delete,
        },
      })
    );

    setPermissionData(initialPermissionData);

    // Check if all permissions are selected
    const allSelected = initialPermissionData.every((module) =>
      Object.values(module.permissionAction).every((value) => value === true)
    );
    setSelectAll(allSelected);
  }, [initialData]);

  // Permission Management Functions
  const handleModuleSelection = (value: string[]) => {
    form.setValue("selectedModules", value);

    // Update permission data based on selected modules
    const updatedData = AVAILABLE_MODULES.filter((module) =>
      value.includes(module._id)
    ).map((module) => {
      const existingPermission = permissionData.find(
        (perm) => perm.key === module._id
      );

      return (
        existingPermission || {
          key: module._id,
          permission: module.name,
          permissionAction: {
            create: false,
            read: false,
            update: false,
            delete: false,
          },
        }
      );
    });

    setPermissionData(updatedData);

    // Update selectAll state
    const allSelected =
      updatedData.length > 0 &&
      updatedData.every((module) =>
        Object.values(module.permissionAction).every((value) => value === true)
      );
    setSelectAll(allSelected);
  };

  const toggleAllPermissions = () => {
    const newSelectAll = !selectAll;
    setSelectAll(newSelectAll);

    setPermissionData((prevData) =>
      prevData.map((item) => ({
        ...item,
        permissionAction: PERMISSIONS.reduce(
          (acc, action) => ({
            ...acc,
            [action]: newSelectAll,
          }),
          {} as { [key: string]: boolean }
        ),
      }))
    );
  };

  const handleColumnToggle = (action: string) => {
    const allChecked = permissionData.every(
      (item) => item.permissionAction[action]
    );

    const newPermissionData = permissionData.map((item) => ({
      ...item,
      permissionAction: {
        ...item.permissionAction,
        [action]: !allChecked,
      },
    }));

    setPermissionData(newPermissionData);
    updateSelectAllState(newPermissionData);
  };

  const handleRowToggle = (key: string) => {
    const newPermissionData = permissionData.map((item) =>
      item.key === key
        ? {
            ...item,
            permissionAction: PERMISSIONS.reduce(
              (acc, action) => ({
                ...acc,
                [action]: !Object.values(item.permissionAction).every(
                  (value) => value
                ),
              }),
              {} as { [key: string]: boolean }
            ),
          }
        : item
    );

    setPermissionData(newPermissionData);
    updateSelectAllState(newPermissionData);
  };

  const handleCheckboxChange = (key: string, action: string) => {
    const newPermissionData = permissionData.map((item) =>
      item.key === key
        ? {
            ...item,
            permissionAction: {
              ...item.permissionAction,
              [action]: !item.permissionAction[action],
            },
          }
        : item
    );

    setPermissionData(newPermissionData);
    updateSelectAllState(newPermissionData);
  };

  const updateSelectAllState = (data: PermissionData[]) => {
    const allSelected = data.every((item) =>
      Object.values(item.permissionAction).every((value) => value === true)
    );
    setSelectAll(allSelected);
  };

  // Table Columns Definition
  const columns: any = [
    {
      key: "permission",
      title: (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={selectAll}
            onCheckedChange={toggleAllPermissions}
            id="select-all"
          />
          <label htmlFor="select-all" className="text-sm font-medium">
            Select All
          </label>
        </div>
      ),
      dataIndex: "permission",
      render: (text: string, record: PermissionData) => (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={Object.values(record.permissionAction).every(
              (value) => value
            )}
            onCheckedChange={() => handleRowToggle(record.key)}
            id={`row-${record.key}`}
          />
          <label htmlFor={`row-${record.key}`} className="text-sm font-medium">
            {record.permission}
          </label>
        </div>
      ),
    },
    ...PERMISSIONS.map((action) => ({
      key: action,
      title: (
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={
              permissionData.length > 0 &&
              permissionData.every((item) => item.permissionAction[action])
            }
            onCheckedChange={() => handleColumnToggle(action)}
            id={`col-${action}`}
          />
          <label
            htmlFor={`col-${action}`}
            className="text-sm font-medium capitalize"
          >
            {action}
          </label>
        </div>
      ),
      dataIndex: ["permissionAction", action],
      render: (text: boolean, record: PermissionData) => (
        <Checkbox
          checked={record.permissionAction[action]}
          onCheckedChange={() => handleCheckboxChange(record.key, action)}
          id={`${record.key}-${action}`}
        />
      ),
    })),
  ];

  // Form Submission
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Validation: Check if any permissions are selected
    const hasPermissions = permissionData.some((item) =>
      Object.values(item.permissionAction).some((isChecked) => isChecked)
    );

    if (!hasPermissions) {
      form.setError("selectedModules", {
        message: "Select at least one permission for each module",
      });
      return;
    }

    // Validation: Check if all selected modules have at least one permission
    const allModulesHavePermissions = values.selectedModules.every(
      (moduleId) => {
        const permissionEntry = permissionData.find(
          (item) => item.key === moduleId
        );
        return (
          permissionEntry &&
          Object.values(permissionEntry.permissionAction).some(
            (isChecked) => isChecked
          )
        );
      }
    );

    if (!allModulesHavePermissions) {
      form.setError("selectedModules", {
        message: "All selected modules must have at least one permission",
      });
      return;
    }

    // Prepare data for submission
    const roleData: IRole = {
      name: values.name,
      description: values.description,
      permissions: permissionData.map((item) => ({
        module: item.key as IPermission["module"],
        actions: {
          create: item.permissionAction.create,
          read: item.permissionAction.read,
          update: item.permissionAction.update,
          delete: item.permissionAction.delete,
        },
      })),
    };

    try {
      if (createNew) {
        await createRole(roleData);
      } else {
        await updateRole(id || "", roleData);
      }
      router.push("/admin/role/");
    } catch (error) {
      console.error("Error submitting role data:", error);
    }
  };

  // Render UI Components
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {initialData ? "Edit Role" : "Create Role"}
        </h1>
        <Button variant="outline" onClick={() => router.push("/admin/role")}>
          Back
        </Button>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Role Information Card */}
          <Card>
            <CardHeader>
              <CardTitle>Role Information</CardTitle>
              <CardDescription>Enter the role details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Role Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter role name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description Field */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter role description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Module Selection Field */}
              <FormField
                control={form.control}
                name="selectedModules"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Modules</FormLabel>
                    <Popover open={commandOpen} onOpenChange={setCommandOpen}>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={commandOpen}
                            className={cn(
                              "w-full justify-between",
                              !field.value.length && "text-muted-foreground"
                            )}
                          >
                            {field.value.length > 0
                              ? `${field.value.length} module${
                                  field.value.length > 1 ? "s" : ""
                                } selected`
                              : "Select modules"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search modules..." />
                          <CommandList>
                            <CommandEmpty>No modules found.</CommandEmpty>
                            <CommandGroup>
                              {AVAILABLE_MODULES.map((module) => (
                                <CommandItem
                                  key={module._id}
                                  value={module.name}
                                  onSelect={() => {
                                    const currentValues = [...field.value];
                                    const index = currentValues.indexOf(
                                      module._id
                                    );

                                    if (index === -1) {
                                      currentValues.push(module._id);
                                    } else {
                                      currentValues.splice(index, 1);
                                    }

                                    handleModuleSelection(currentValues);
                                    setCommandOpen(false);
                                  }}
                                >
                                  <div className="flex items-center">
                                    <Checkbox
                                      checked={field.value.includes(module._id)}
                                      className="mr-2"
                                    />
                                    {module.name}
                                  </div>
                                  {field.value.includes(module._id) && (
                                    <Check className="ml-auto h-4 w-4" />
                                  )}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Permissions Table */}
          {permissionData.length > 0 && (
            <CustomTable
              columns={columns}
              record={{ data: permissionData }}
              tableParams={tableParams}
              setTableParams={setTableParams}
              pagination={false}
              type="Permissions"
            />
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/role")}
            >
              Cancel
            </Button>
            <Button type="submit">{initialData ? "Update" : "Create"}</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
