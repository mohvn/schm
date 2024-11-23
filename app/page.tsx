import ImageConverter from "@/components/image-converter"
import { ModeToggle } from "@/components/mode-toggle"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="absolute top-2 right-2">
        <ModeToggle />
      </div>
      <h1>
        <pre className="whitespace-pre font-mono text-sm select-none mb-20 font-bold">
          {`      ___           ___           ___           ___
     /\\  \\         /\\  \\         /\\__\\         /\\__\\
    /::\\  \\       /::\\  \\       /:/  /        /::|  |
   /:/\\ \\  \\     /:/\\:\\  \\     /:/__/        /:|:|  |
  _\\:\\~\\ \\  \\   /:/  \\:\\  \\   /::\\  \\ ___   /:/|:|__|__
 /\\ \\:\\ \\ \\__\\ /:/__/ \\:\\__\\ /:/\\:\\  /\\__\\ /:/ |::::\\__\\
 \\:\\ \\:\\ \\/__/ \\:\\  \\  \\/__/ \\/__\\:\\/:/  / \\/__/~~/:/  /
  \\:\\ \\:\\__\\    \\:\\  \\            \\::/  /        /:/  /
   \\:\\/:/  /     \\:\\  \\           /:/  /        /:/  /
    \\::/  /       \\:\\__\\         /:/  /        /:/  /
     \\/__/         \\/__/         \\/__/         \\/__/`}</pre>
      </h1>
      <ImageConverter />
    </main>
  )
}