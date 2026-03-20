import { api } from "@/lib/api"
import type { Page } from "@/types/api"
import type { RoomRequest, RoomResponse } from "@/types/room"

export function getRooms(page = 0, size = 10) {
  return api<Page<RoomResponse>>(`/api/v1/rooms?page=${page}&size=${size}`)
}

export function createRoom(data: RoomRequest) {
  return api<RoomResponse>("/api/v1/rooms", {
    method: "POST",
    body: JSON.stringify(data),
  })
}
