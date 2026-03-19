import { ModeToggle } from "@/components/ui/mode-toggle"
import Navbar from "@/components/web/navbar"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col px-24 py-6">
      <div className="flex w-full items-center">
        <Navbar />
        <ModeToggle className="ml-auto" />
      </div>
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose"></div>
    </div>
  )
}
