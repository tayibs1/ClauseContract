"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { FileText, Upload, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function DocumentUploader() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null)
    const file = acceptedFiles[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB")
        return
      }
      setFile(file)
      handleAnalysis(file)
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
    multiple: false,
  })

  const handleAnalysis = async (file: File) => {
    setIsAnalyzing(true)
    setProgress(0)

    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 500)

    // Simulate analysis delay
    setTimeout(() => {
      setIsAnalyzing(false)
      clearInterval(interval)
    }, 5000)
  }

  return (
    <AnimatePresence mode="wait">
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-4"
        >
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative">
        <div
          {...getRootProps()}
          className={`group relative overflow-hidden rounded-lg border-2 border-dashed transition-all duration-300
            ${isDragActive ? "border-primary bg-primary/5" : "border-gray-200 hover:border-primary/50"}
          `}
        >
          {/* Background gradient effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Glowing orb effects */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl 
              transition-transform duration-500 group-hover:translate-x-16 group-hover:translate-y-8"
            />
            <div
              className="absolute -right-32 bottom-0 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl 
              transition-transform duration-500 group-hover:-translate-x-16 group-hover:-translate-y-8"
            />
          </div>

          <div className="relative px-6 py-24 text-center">
            <input {...getInputProps()} />

            <motion.div
              initial={false}
              animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
              className="flex flex-col items-center space-y-4"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl transition-all duration-300 group-hover:bg-primary/30" />
                <div className="relative rounded-full bg-primary/10 p-4 transition-transform duration-300 group-hover:scale-110">
                  <Upload className="h-8 w-8 text-primary transition-colors duration-300 group-hover:text-primary/80" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-semibold tracking-tight">
                  {isDragActive ? "Drop your document here" : "Upload your document"}
                </h3>
                <p className="text-sm text-muted-foreground">Drop your PDF or Word document here, or click to browse</p>
                <p className="text-xs text-muted-foreground">Maximum file size: 10MB</p>
              </div>

              <Button
                variant="outline"
                className="relative overflow-hidden transition-all duration-300 hover:border-primary/50 hover:bg-primary/5"
              >
                <FileText className="mr-2 h-4 w-4" />
                Select File
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/10 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
              </Button>
            </motion.div>
          </div>
        </div>

        {isAnalyzing && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-4">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                <span>Analyzing document...</span>
              </div>
              <span className="text-primary">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-primary/10" />
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

