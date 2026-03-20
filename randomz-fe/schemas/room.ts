import { z } from "zod"

export const roomRequestSchema = z.object({
  name: z
    .string()
    .min(1, "Tên phòng không được để trống")
    .max(50, "Tên phòng tối đa 50 ký tự"),
  description: z
    .string()
    .max(200, "Mô tả tối đa 200 ký tự")
    .optional()
    .or(z.literal("")),
  startTime: z.date({ required_error: "Thời gian bắt đầu không được để trống" }),
  duration: z.coerce
    .number()
    .int("Thời lượng phải là số nguyên")
    .min(1, "Thời lượng phải lớn hơn 0"),
})

export type RoomFormValues = z.infer<typeof roomRequestSchema>
