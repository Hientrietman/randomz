"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTransition } from "react"
import { DoorOpen, Spinner } from "@phosphor-icons/react"
import { roomRequestSchema, type RoomFormValues } from "@/schemas/room"
import { createRoom } from "@/lib/endpoints/room"
import { ApiError } from "@/lib/api"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { DateTimePicker } from "@/components/ui/date-time-picker"
import { cn } from "@/lib/utils"
import type { RoomResponse } from "@/types/room"

type CreateRoomFormProps = {
  onSuccess?: (room: RoomResponse) => void
  className?: string
  showHeader?: boolean
}

export function CreateRoomForm({
  onSuccess,
  className,
  showHeader = true,
}: CreateRoomFormProps) {
  const [isPending, startTransition] = useTransition()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setError,
    reset,
  } = useForm<RoomFormValues>({
    resolver: zodResolver(roomRequestSchema),
    defaultValues: {
      name: "",
      description: "",
      startTime: undefined,
      duration: 60,
    },
  })

  function onSubmit(values: RoomFormValues) {
    startTransition(async () => {
      try {
        const payload = {
          name: values.name,
          ...(values.description ? { description: values.description } : {}),
          startTime: values.startTime.toISOString(),
          duration: values.duration,
        }
        const res = await createRoom(payload)
        reset()
        onSuccess?.(res.data)
      } catch (e) {
        setError("root", {
          message: e instanceof ApiError ? e.message : "Đã có lỗi xảy ra",
        })
      }
    })
  }

  return (
    <div
      className={cn(
        "w-full max-w-md rounded-xl border border-border bg-card p-6 shadow-sm",
        className
      )}
    >
      {showHeader && (
        <div className="mb-6 flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <DoorOpen size={22} weight="duotone" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Tạo phòng mới
            </h2>
            <p className="text-sm text-muted-foreground">
              Điền thông tin để tạo phòng chơi
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="room-name">
            Tên phòng <span className="text-destructive">*</span>
          </Label>
          <Input
            id="room-name"
            placeholder="VD: Phòng của Nam"
            aria-invalid={!!errors.name}
            {...register("name")}
          />
          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="room-description">Mô tả</Label>
          <Textarea
            id="room-description"
            placeholder="Mô tả ngắn về phòng (tuỳ chọn)"
            rows={3}
            aria-invalid={!!errors.description}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-sm text-destructive">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label>
            Thời gian bắt đầu <span className="text-destructive">*</span>
          </Label>
          <Controller
            control={control}
            name="startTime"
            render={({ field }) => (
              <DateTimePicker
                value={field.value}
                onChange={field.onChange}
                aria-invalid={!!errors.startTime}
              />
            )}
          />
          {errors.startTime && (
            <p className="text-sm text-destructive">
              {errors.startTime.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="room-duration">
            Thời lượng (giây) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="room-duration"
            type="number"
            min={1}
            placeholder="VD: 60"
            aria-invalid={!!errors.duration}
            {...register("duration")}
          />
          {errors.duration && (
            <p className="text-sm text-destructive">
              {errors.duration.message}
            </p>
          )}
        </div>

        {errors.root && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {errors.root.message}
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Spinner size={16} className="animate-spin" />
              Đang tạo...
            </>
          ) : (
            "Tạo phòng"
          )}
        </Button>
      </form>
    </div>
  )
}
