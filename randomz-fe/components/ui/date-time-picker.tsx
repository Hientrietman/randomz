"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarBlank, Clock } from "@phosphor-icons/react"
import { Calendar } from "@/components/ui/calendar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type DateTimePickerProps = {
  value?: Date
  onChange?: (date: Date | undefined) => void
  disabled?: boolean
  placeholder?: string
  className?: string
  "aria-invalid"?: boolean
}

export function DateTimePicker({
  value,
  onChange,
  disabled,
  placeholder = "Chọn ngày và giờ",
  className,
  "aria-invalid": ariaInvalid,
}: DateTimePickerProps) {
  const [open, setOpen] = React.useState(false)

  const hours = value ? String(value.getHours()).padStart(2, "0") : "00"
  const minutes = value ? String(value.getMinutes()).padStart(2, "0") : "00"

  function handleDateSelect(day: Date | undefined) {
    if (!day) return

    const next = new Date(day)
    if (value) {
      next.setHours(value.getHours(), value.getMinutes(), 0, 0)
    }
    onChange?.(next)
  }

  function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const [h, m] = e.target.value.split(":").map(Number)
    const next = value ? new Date(value) : new Date()
    next.setHours(h, m, 0, 0)
    onChange?.(next)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          aria-invalid={ariaInvalid}
          className={cn(
            "h-9 w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            className,
          )}
        >
          <CalendarBlank className="size-4 shrink-0 opacity-60" />
          {value ? format(value, "dd/MM/yyyy HH:mm") : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={handleDateSelect}
          defaultMonth={value}
        />
        <div className="border-border flex items-center gap-2 border-t px-3 py-2">
          <Clock className="size-4 opacity-60" />
          <Input
            type="time"
            value={`${hours}:${minutes}`}
            onChange={handleTimeChange}
            className="h-8 w-auto"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
