'use client'

import React, { useState, useRef } from 'react';
import { themes, convertImageToTheme } from '../utils/image-utils';
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, Upload } from 'lucide-react';

type ThemeKey = keyof typeof themes;

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
      <div className="space-y-4">
        <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border dark:border-[#313131] rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-[#181818] dark:bg-[#141415] hover:bg-gray-100 dark:hover:border-[#252525]">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload strokeWidth={1.2} className='mb-5' />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
          </label>
        </div>
        <Select onValueChange={(value: ThemeKey) => setSelectedTheme(value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a theme" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(themes).map(([themeName, themeColors]) => (
              <SelectItem key={themeName} value={themeName}>
                <div className="flex items-center">
                  <span className="mr-2">{themeName}</span>
                  <div className="flex">
                    {themeColors.slice(0, 15).map((color, index) => (
                      index % 3 === 0 && (
                        <div
                          key={index}
                          className="w-4 h-4 mr-1"
                          style={{
                            backgroundColor: `rgb(${themeColors[index]}, ${themeColors[index + 1]}, ${themeColors[index + 2]})`
                          }}
                        />
                      )
                    ))}
                  </div>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={applyTheme}
          variant="outline"
          disabled={!originalImage || !selectedTheme || isLoading}
          className="w-full dark:bg-[#181818] dark:hover:bg-[#383838] font-bold"
        >
          {isLoading ? "Converting..." : "Apply Theme"}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {originalImage && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Original Image</h2>
            <img src={originalImage} alt="Original" className="w-full h-auto rounded-lg shadow-md" />
          </div>
        )}
        {convertedImage && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Converted Image</h2>
            <img src={convertedImage} alt="Converted" className="w-full h-auto rounded-lg shadow-md" />
            <Button onClick={downloadImage} className="w-full mt-2 font-bold">
              <Download />
              Download Converted Image
            </Button>
          </div>
        )}
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}

