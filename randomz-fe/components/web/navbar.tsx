import Link from "next/link"
import { ModeToggle } from "../ui/mode-toggle"
import { buttonVariants } from "../ui/button"

function Navbar() {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex gap-6">
        <Link className={buttonVariants({ variant: "outline" })} href="/">
          Home
        </Link>
        <Link className={buttonVariants()} href="/room">
          Room
        </Link>
        <Link
          className={buttonVariants({ variant: "outline" })}
          href="/how-to-play"
        >
          How to Play
        </Link>
      </div>
      <ModeToggle className="flex flex-col items-center gap-2 py-4" />
    </div>
  )
}

export default Navbar
