import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/ui/mode-toggle"

export default function Page() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <div>
          <h1 className="text-2xl font-bold">Hello world</h1>
          <p>
            This is a simple example of a Next.js page using the new app
            directory structure.
          </p>
          <ModeToggle />
          <Button className="mt-2">Button</Button>
        </div>
      </div>
    </div>
  )
}
