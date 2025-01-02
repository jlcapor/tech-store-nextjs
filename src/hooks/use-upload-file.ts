import * as React from "react"
import type { ProductFile } from "@/types"
import { toast } from "sonner"
import type { AnyFileRoute, UploadFilesOptions } from "uploadthing/types"

import { getErrorMessage } from "@/lib/handle-error"
import { uploadFiles } from "@/lib/uploadthing"
import { type OurFileRouter } from "@/app/api/uploadthing/core"

interface UseUploadFileOptions<TFileRoute extends AnyFileRoute>
  extends Pick<
    UploadFilesOptions<TFileRoute>,
    "headers" | "onUploadBegin" | "onUploadProgress" | "skipPolling"
  > {
  defaultUploadedFiles?: ProductFile[]
}

export function useUploadFile(
  endpoint: keyof OurFileRouter,
  {
    defaultUploadedFiles = [],
    ...props
  }: UseUploadFileOptions<OurFileRouter[keyof OurFileRouter]> = {}
) {
  const [uploadedFiles, setUploadedFiles] = React.useState<ProductFile[]>(defaultUploadedFiles)
  const [progresses, setProgresses] = React.useState<Record<string, number>>({})
  const [isUploading, setIsUploading] = React.useState(false)

  async function uploadThings(files: File[]) {
    setIsUploading(true)
    try {
      const res = await uploadFiles(endpoint, {
        ...props,
        files,
        onUploadProgress: ({ file, progress }) => {
          setProgresses((prev) => ({
            ...prev,
            [file.name]: progress,
          }));
        },
      });
      const formattedRes: ProductFile[] = res.map((file) => ({
        id: file.key,
        name: file.name,
        url: file.url,
      }));
  
      setUploadedFiles((prev) => (prev ? [...prev, ...formattedRes] : formattedRes));
      return formattedRes; 
    } catch (err) {
      toast.error(getErrorMessage(err))
    } finally {
      setProgresses({})
      setIsUploading(false)
    }
  }

  return {
    uploadThings,
    uploadedFiles,
    progresses,
    isUploading,
  }
}