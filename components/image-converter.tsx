'use client'

import React, { useState, useRef } from 'react';
import { themes, convertImageToTheme } from '../utils/image-utils';
import { Button } from "@/components/ui/button"
import { Download, Upload, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

type ThemeKey = keyof typeof themes;

function getThemeColors(themeColors: number[]): string[] {
  const colors: string[] = [];
  for (let i = 0; i < themeColors.length; i += 3) {
    colors.push(`rgb(${themeColors[i]}, ${themeColors[i + 1]}, ${themeColors[i + 2]})`);
  }
  return colors;
}

export default function ImageConverter() {
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey | ''>('');
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyTheme = () => {
    if (originalImage && selectedTheme) {
      setIsLoading(true);
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (canvas) {
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const convertedImageData = convertImageToTheme(imageData, themes[selectedTheme]);
            ctx.putImageData(convertedImageData, 0, 0);
            setConvertedImage(canvas.toDataURL());
            setIsLoading(false);
          }
        }
      };
      img.src = originalImage;
    }
  };

  const downloadImage = () => {
    if (convertedImage) {
      const link = document.createElement('a');
      link.href = convertedImage;
      link.download = 'converted-image.png';
      link.click();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
      <div className="space-y-6">
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl cursor-pointer bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-300">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 mb-3">
                <Upload strokeWidth={1.5} className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              </div>
              <p className="mb-1 text-sm text-gray-600 dark:text-gray-300"><span className="font-semibold text-gray-800 dark:text-gray-200">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
          </label>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Select a Theme</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {Object.entries(themes).map(([themeName, themeColors]) => {
              const colors = getThemeColors(themeColors);
              const isSelected = selectedTheme === themeName;

              return (
                <button
                  key={themeName}
                  onClick={() => setSelectedTheme(themeName as ThemeKey)}
                  className={cn(
                    "relative group p-3 rounded-xl border-2 transition-all duration-300 text-left",
                    "hover:scale-[1.02] hover:shadow-lg",
                    isSelected
                      ? "border-gray-800 dark:border-gray-200 bg-gray-100 dark:bg-gray-800 shadow-md shadow-gray-300 dark:shadow-gray-900/50"
                      : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 hover:border-gray-300 dark:hover:border-gray-600"
                  )}
                >
                  {isSelected && (
                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-800 dark:bg-gray-200 rounded-full flex items-center justify-center shadow-md">
                      <Check className="w-3 h-3 text-white dark:text-gray-900" />
                    </div>
                  )}

                  <p className={cn(
                    "text-xs font-medium mb-2 truncate",
                    isSelected ? "text-gray-900 dark:text-gray-100" : "text-gray-700 dark:text-gray-300"
                  )}>
                    {themeName}
                  </p>

                  <div className="flex flex-wrap gap-0.5">
                    {colors.slice(0, 8).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-sm shadow-sm ring-1 ring-black/5"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>

                  <div
                    className="mt-2 h-1.5 rounded-full overflow-hidden"
                    style={{
                      background: `linear-gradient(to right, ${colors.slice(0, 12).join(', ')})`
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <Button
          onClick={applyTheme}
          disabled={!originalImage || !selectedTheme || isLoading}
          variant="outline"
          className={cn(
            "w-full font-semibold py-5 rounded-lg transition-colors duration-200",
            "border-2 border-dashed border-border bg-muted/80 text-foreground",
            "hover:bg-muted hover:border-foreground/30",
            "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-muted/80 disabled:hover:border-border"
          )}
        >
          {isLoading ? "Converting..." : "Apply Theme"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {originalImage && (
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">Original Image</h2>
            <div className="relative rounded-xl overflow-hidden shadow-lg ring-1 ring-black/5">
              <img src={originalImage} alt="Original" className="w-full h-auto" />
            </div>
          </div>
        )}
        {convertedImage && (
          <div className="space-y-3">
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">Converted Image</h2>
            <div className="relative rounded-xl overflow-hidden shadow-lg ring-1 ring-black/5">
              <img src={convertedImage} alt="Converted" className="w-full h-auto" />
            </div>
            <Button
              onClick={downloadImage}
              variant="outline"
              className="w-full font-semibold border-2 border-dashed border-border bg-muted/80 text-foreground hover:bg-muted hover:border-foreground/30"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Image
            </Button>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

