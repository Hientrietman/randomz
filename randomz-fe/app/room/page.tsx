"use client"

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Plus, Spinner, DoorOpen, Clock, Users, CaretLeft, CaretRight } from "@phosphor-icons/react"
import { getRooms } from "@/lib/endpoints/room"
import { ApiError } from "@/lib/api"
import { CreateRoomForm } from "@/components/web/create-room-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Page } from "@/types/api"
import type { RoomResponse, RoomStatus } from "@/types/room"

const statusLabels: Record<RoomStatus, { label: string; color: string }> = {
  NEW: { label: "Mới", color: "bg-blue-500/15 text-blue-700 dark:text-blue-400" },
  WAITING: { label: "Chờ", color: "bg-yellow-500/15 text-yellow-700 dark:text-yellow-400" },
  READY: { label: "Sẵn sàng", color: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" },
  ONGOING: { label: "Đang chơi", color: "bg-orange-500/15 text-orange-700 dark:text-orange-400" },
  ENDING: { label: "Sắp kết thúc", color: "bg-rose-500/15 text-rose-700 dark:text-rose-400" },
  FINISHED: { label: "Hoàn thành", color: "bg-muted text-muted-foreground" },
}

function StatusBadge({ status }: { status: RoomStatus }) {
  const { label, color } = statusLabels[status]
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${color}`}>
      {label}
    </span>
  )
}

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds}s`
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return s > 0 ? `${m}m ${s}s` : `${m}m`
}

export default function RoomPage() {
  const router = useRouter()
  const [page, setPage] = useState<Page<RoomResponse> | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const fetchRooms = useCallback(async (p = 0) => {
    setLoading(true)
    setError(null)
    try {
      const res = await getRooms(p)
      setPage(res.data)
      setCurrentPage(p)
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Không thể tải danh sách phòng")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRooms()
  }, [fetchRooms])

  const rooms = page?.content ?? []

  return (
    <div className="mx-auto max-w-4xl py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Phòng chơi</h1>
          <p className="text-sm text-muted-foreground">
            Danh sách các phòng hiện có
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus weight="bold" />
              Tạo phòng
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Tạo phòng mới</DialogTitle>
              <DialogDescription>
                Điền thông tin để tạo phòng chơi
              </DialogDescription>
            </DialogHeader>
            <CreateRoomForm
              className="border-0 p-0 shadow-none"
              showHeader={false}
              onSuccess={() => {
                setDialogOpen(false)
                fetchRooms(0)
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <Spinner size={24} className="animate-spin text-muted-foreground" />
        </div>
      )}

      {error && (
        <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {!loading && !error && rooms.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted-foreground">
          <DoorOpen size={40} weight="duotone" />
          <p className="text-sm">Chưa có phòng nào. Hãy tạo phòng mới!</p>
        </div>
      )}

      {!loading && !error && rooms.length > 0 && (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            {rooms.map((room) => (
              <Card
                key={room.id}
                className="cursor-pointer transition-colors hover:bg-muted/50"
                onClick={() => router.push(`/room/${room.id}`)}
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-2">
                    <CardTitle className="truncate">{room.name}</CardTitle>
                    <StatusBadge status={room.status} />
                  </div>
                  {room.description && (
                    <CardDescription className="line-clamp-2">
                      {room.description}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {format(new Date(room.startTime), "dd/MM/yyyy HH:mm")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={14} />
                      {formatDuration(room.duration)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {page && page.page.totalPages > 1 && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 0}
                onClick={() => fetchRooms(currentPage - 1)}
              >
                <CaretLeft size={14} />
                Trước
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentPage + 1} / {page.page.totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage + 1 >= page.page.totalPages}
                onClick={() => fetchRooms(currentPage + 1)}
              >
                Sau
                <CaretRight size={14} />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
