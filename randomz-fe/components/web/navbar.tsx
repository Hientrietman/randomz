function Navbar() {
  return (
    <div className="flex items-center gap-4">
      <h1 className="text-lg font-bold">
        Random
        <span className="font-extrabold text-red-600">Z</span>
      </h1>
      <nav className="flex gap-4">
        <a
          href="#"
          className="text-sm text-muted-foreground hover:text-primary"
        >
          Home
        </a>
        <a
          href="#"
          className="text-sm text-muted-foreground hover:text-primary"
        >
          Room
        </a>
        <a
          href="#"
          className="text-sm text-muted-foreground hover:text-primary"
        >
          <span>How to play</span>
        </a>
      </nav>
    </div>
  )
}

export default Navbar
