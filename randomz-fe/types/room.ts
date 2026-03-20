export type RoomStatus = "NEW" | "WAITING" | "READY" | "ONGOING" | "ENDING" | "FINISHED"

export type RoomResponse = {
  id: string
  name: string
  description: string | null
  status: RoomStatus
  startTime: string
  duration: number
}

export type RoomRequest = {
  name: string
  description?: string
  startTime: string
  duration: number
}
