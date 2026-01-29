import ImageConverter from "@/components/image-converter";
import { DotPattern } from "@/components/ui/dot-pattern";

const ASCII_LOGO = [
  "   ,-,--.    _,.----.  ,--.-,,-,--,       ___   ",
  " ,-.'-  _\\ .' .' -   \\/==/  /|=|  |.-._ .'=.'\\  ",
  "/==/_ ,_.'/==/  ,  ,-'|==|_ ||=|, /==/ \\|==|  | ",
  "\\==\\  \\   |==|-   |  .|==| ,|/=| _|==|,|  / - | ",
  " \\==\\ -\\  |==|_   `-' \\==|- `-' _ |==|  \\/  , | ",
  " _\\==\\ ,\\ |==|   _  , |==|  _     |==|- ,   _ | ",
  "/==/\\/ _ |\\==\\.       /==|   .-. ,\\==| _ /\\   | ",
  "\\==\\ - , / `-.`.___.-'/==/, //=/  /==/  / / , / ",
  " `--`---'             `--`-' `-`--`--`./  `--`  ",
].join("\n");

export default function Home() {
  return (
    <main className="flex flex-col min-h-[100dvh] text-foreground dashed-border-no-top overflow-x-hidden">
      <div className="relative flex flex-col gap-4 h-40 overflow-hidden">
        <DotPattern size={8} className="opacity-50" />
      </div>

      <div className="flex flex-col gap-2 dashed-border dashed-border-no-top p-4 items-center text-center">
        <h1 className="w-full overflow-x-auto flex justify-center" aria-hidden>
          <pre className="whitespace-pre font-mono text-[0.5rem] sm:text-xs md:text-sm select-none font-bold bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent">
            {ASCII_LOGO}
          </pre>
        </h1>
        <p className="text-muted-foreground max-w-md">
          Theme based image generator. Create beautiful color palettes with just a few clicks. Upload an image and let the magic happen.
        </p>
      </div>

      <div className="flex flex-col gap-2 dashed-border dashed-border-no-top p-4">
        <ImageConverter />
      </div>

      <footer className="flex flex-col gap-2 dashed-border dashed-border-no-top p-4">
        <p className="text-xs text-muted-foreground text-center">
          Drag & drop or click to upload • Multiple themes available • Instant download
        </p>
      </footer>

      <div className="relative flex flex-col gap-4 h-40 overflow-hidden">
        <DotPattern size={8} className="opacity-50" />
      </div>
    </main>
  );
}
