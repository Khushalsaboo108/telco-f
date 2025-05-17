import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle, CheckCircle, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"
import { ButtonHTMLAttributes } from "react"

type AlertType = "error" | "success" | "warning"

interface AlertDialogDemoProps {
    type?: AlertType
    message?: string
    title?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
    triggerText?: string
    onSubmit?: () => void
    showCancelButton?: boolean
    actionButtonText?: string
    actionButtonStyle?: string
    cancelButtonText?: string
    cancelButtonStyle?: string
}

export function AlertDialogDemo({
    type = "error",
    message = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
    title = "Are you absolutely sure?",
    open,
    onOpenChange,
    triggerText = "Show Dialog",
    onSubmit = () => { },
    showCancelButton = true,
    actionButtonText = "Continue",
    actionButtonStyle = "",
    cancelButtonText = "Cancel",
    cancelButtonStyle = "",
}: AlertDialogDemoProps) {
    const getIcon = () => {
        switch (type) {
            case "error":
                return <AlertCircle className="h-6 w-6 text-destructive" />
            case "success":
                return <CheckCircle className="h-6 w-6 text-green-500" />
            case "warning":
                return <AlertTriangle className="h-6 w-6 text-amber-500" />
            default:
                return null
        }
    }

    const getHeaderClass = () => {
        switch (type) {
            case "error":
                return "border-l-4 border-destructive pl-4"
            case "success":
                return "border-l-4 border-green-500 pl-4"
            case "warning":
                return "border-l-4 border-amber-500 pl-4"
            default:
                return ""
        }
    }

    const getActionButtonClass = () => {
        if (actionButtonStyle) return actionButtonStyle;

        switch (type) {
            case "error":
                return "bg-destructive text-destructive-foreground hover:bg-destructive/90"
            case "success":
                return "bg-green-500 text-white hover:bg-green-600"
            case "warning":
                return "bg-amber-500 text-white hover:bg-amber-600"
            default:
                return ""
        }
    }

    const handleSubmit: ButtonHTMLAttributes<HTMLButtonElement>["onClick"] = (e) => {
        if (onSubmit) {
            onSubmit();
        }
    };

    return (
        <AlertDialog {...(open !== undefined ? { open, onOpenChange } : {})}>
            {/* <AlertDialogTrigger asChild>
                <Button variant="outline">{triggerText}</Button>
            </AlertDialogTrigger> */}
            <AlertDialogContent className=" bg-newBackgroundColor " >
                <AlertDialogHeader className={cn("flex flex-row items-start gap-4", getHeaderClass())}>
                    {getIcon()}
                    <div>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>{message}</AlertDialogDescription>
                    </div>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex gap-2">
                    {showCancelButton && (
                        <AlertDialogCancel className={cancelButtonStyle}>
                            {cancelButtonText}
                        </AlertDialogCancel>
                    )}
                    <AlertDialogAction
                        className={getActionButtonClass()}
                        onClick={handleSubmit}
                    >
                        {actionButtonText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}