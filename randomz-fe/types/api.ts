export type ApiResponse<T> = {
  status: number
  message: string
  data: T
}

export type Page<T> = {
  content: T[]
  page: {
    size: number
    number: number
    totalElements: number
    totalPages: number
  }
}
