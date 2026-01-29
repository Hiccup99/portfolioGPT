import * as pdfjsLib from 'pdfjs-dist'
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url'

// Set worker source using Vite's URL import
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker

/**
 * Extract text content from a PDF file
 */
export async function extractTextFromPDF(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise

  const textParts: string[] = []

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i)
    const textContent = await page.getTextContent()

    const pageText = textContent.items
      .map((item) => {
        if ('str' in item) {
          return item.str
        }
        return ''
      })
      .join(' ')

    textParts.push(pageText)
  }

  return textParts.join('\n\n')
}

/**
 * Validate that a file is a PDF
 */
export function isPDFFile(file: File): boolean {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
}
