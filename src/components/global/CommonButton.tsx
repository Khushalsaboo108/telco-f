"use client";

import React from "react";
import { ArrowRight, CirclePlus, Forward, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, Pencil, Trash } from "lucide-react";

import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/use-redux";
import { progilePermission } from "@/store/features/profileSlice";
import { IPermission } from "@/types/role";
interface IButton {
  className?: string;
  text: string;
  onSubmit?: any;
  url?: string;
}

interface IPurmissionButton {
  className?: string;
  text: string;
  url: string;
  modal: string;
}

interface TableCommonButtonsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onReply?: () => void;
  onDetail?: () => void;
  replyDisabled?: boolean;
  deleteDisabled?: boolean;
  modal: string;
  tooltipTitles?: {
    view?: string;
    edit?: string;
    delete?: string;
    reply?: string;
    detail?: string;
  };
}

export function AnimatedCommonButton({ className, text, onSubmit }: IButton) {
  return (
    <Button
      type="submit"
      className={`w-[150px] mt-4 flex justify-start relative group overflow-hidden rounded-full border bg-inputBackgroundColor hover:bg-cyan-500/10 ${className}`}
      onClick={onSubmit}
    >
      <span className="text-orange-500 group-hover:text-cyan-400 text-start">
        {text}
      </span>
      <span className="absolute right-1 bg-cyan-500 rounded-full p-2 transform group-hover:translate-x-1 transition-transform">
        <ArrowRight className="h-4 w-4 text-white" />
      </span>
    </Button>
  );
}

export function CommonButton({ className, text, onSubmit }: IButton) {
  return (
    <Button
      type="submit"
      className={`w-full md:w-auto px-8 py-3 rounded-md transition-colors duration-200 font-medium disabled:cursor-not-allowed ${className} `}
      onClick={onSubmit}
    >
      {text}
    </Button>
  );
}

export function HandleAdmins({
  className,
  text,
  url,
  modal,
}: IPurmissionButton) {
  const router = useRouter();

  const permissions = useAppSelector(progilePermission) as
    | IPermission[]
    | undefined;

  const permissionsMap: Record<string, { create: boolean }> = {};

  if (permissions && Array.isArray(permissions)) {
    permissions.forEach((permission) => {
      permissionsMap[permission.module] = {
        create: permission.actions.create,
      };
    });
  }

  // Get permissions for the current module
  const modulePermissions = permissionsMap[modal] || {
    create: false,
  };

  const handleSubmit = () => {
    router.push(`${url}`);
  };
  return (
    <>
      {modulePermissions.create && (
        <Button
          type="submit"
          className={`w-full md:w-auto px-8 py-3 rounded-md transition-colors duration-200 font-medium disabled:cursor-not-allowed ${className} `}
          onClick={handleSubmit}
        >
          <CirclePlus /> {text}
        </Button>
      )}
    </>
  );
}

export const TableCommonButtons: React.FC<TableCommonButtonsProps> = ({
  onView,
  onEdit,
  onDelete,
  onReply,
  onDetail,
  modal,
  replyDisabled,
  deleteDisabled,
  tooltipTitles = {
    view: "View",
    edit: "Edit",
    delete: "Delete",
    reply: "Reply",
    detail: "Detail",
  },
}) => {
  const permissions = useAppSelector(progilePermission) as
    | IPermission[]
    | undefined;

  const permissionsMap: Record<
    string,
    { read: boolean; update: boolean; delete: boolean }
  > = {};

  if (permissions && Array.isArray(permissions)) {
    permissions.forEach((permission) => {
      permissionsMap[permission.module] = {
        update: permission.actions.update,
        delete: permission.actions.delete,
        read: permission.actions.read,
      };
    });
  }

  // Get permissions for the current module
  const modulePermissions = permissionsMap[modal] || {
    update: false,
    delete: false,
    read: false,
  };

  return (
    <div className="flex space-x-2">
      {onView && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onView}
                className="h-8 w-8"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipTitles.view}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {onEdit && modulePermissions.update && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onEdit}
                className="h-8 w-8"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipTitles.edit}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {onReply && modulePermissions.update && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onReply}
                className="h-8 w-8"
                disabled={replyDisabled}
              >
                <Reply className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipTitles.reply}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {onDetail && modulePermissions.read && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onDetail}
                className="h-8 w-8"
                disabled={replyDisabled}
              >
                <Forward className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipTitles.detail}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {onDelete && modulePermissions.delete && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                onClick={onDelete}
                className="h-8 w-8 text-destructive hover:bg-destructive/10"
                disabled={deleteDisabled}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{tooltipTitles.delete}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};
