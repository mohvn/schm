import ImageConverter from "@/components/image-converter"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 via-gray-100/30 to-gray-300/50 dark:from-gray-900/80 dark:via-gray-950/60 dark:to-gray-800/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gray-300/20 via-transparent to-transparent dark:from-gray-700/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-gray-400/10 via-transparent to-transparent dark:from-gray-600/20" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="flex min-h-screen flex-col items-center justify-start px-4 py-12 md:py-20">
        <div className="relative mb-12 text-center">
          <div className="absolute -inset-4 bg-gradient-to-r from-gray-400/30 via-gray-500/20 to-gray-400/30 blur-3xl opacity-50 -z-10" />

          <h1 className="relative">
            <pre className="whitespace-pre font-mono text-[0.5rem] sm:text-xs md:text-sm select-none font-bold bg-gradient-to-r from-gray-600 via-gray-800 to-gray-600 dark:from-gray-300 dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent drop-shadow-2xl">
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

          <div className="mt-6 flex items-center justify-center gap-2">
            <p className="text-lg md:text-xl font-medium bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-200 dark:to-white bg-clip-text text-transparent">
              Simple Color Hue Maker
            </p>
          </div>

          <p className="mt-3 text-sm md:text-base text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Create beautiful color palettes with just a few clicks. Upload an image and let the magic happen.
          </p>
        </div>

        <div className="relative w-full max-w-3xl">
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-400/20 via-gray-500/15 to-gray-400/20 rounded-2xl blur-xl opacity-75" />
          <div className="relative backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-2xl border border-white/20 dark:border-gray-700/50 shadow-2xl p-2 md:p-4">
            <ImageConverter />
          </div>
        </div>

        <footer className="mt-16 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Drag & drop or click to upload • Multiple themes available • Instant download
          </p>
        </footer>
      </div>
    </main>
  )
}