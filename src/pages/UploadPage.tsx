import { useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { generatePortfolio } from '../services/portfolio'
import { extractTextFromPDF, isPDFFile } from '../services/pdf'
import { fetchLinkedInProfile, linkedInProfileToText } from '../services/linkedin'

export default function UploadPage() {
  const navigate = useNavigate()

  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeText, setResumeText] = useState<string>('')
  const [isDragging, setIsDragging] = useState(false)

  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [linkedinStatus, setLinkedinStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [linkedinText, setLinkedinText] = useState('')

  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && isPDFFile(file)) {
      setResumeFile(file)
      try {
        const text = await extractTextFromPDF(file)
        setResumeText(text)
      } catch (err) {
        setError('Failed to extract text from PDF. Please try again.')
        console.error(err)
      }
    } else {
      setError('Please upload a PDF file')
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleResumeSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && isPDFFile(file)) {
      setResumeFile(file)
      try {
        const text = await extractTextFromPDF(file)
        setResumeText(text)
      } catch (err) {
        setError('Failed to extract text from PDF. Please try again.')
        console.error(err)
      }
    } else if (file) {
      setError('Please upload a PDF file')
    }
  }, [])

  const handleLinkedInFetch = useCallback(async () => {
    if (!linkedinUrl.trim()) return

    setLinkedinStatus('loading')
    setError(null)

    try {
      const profile = await fetchLinkedInProfile(linkedinUrl)
      const text = linkedInProfileToText(profile)
      setLinkedinText(text)
      setLinkedinStatus('success')
    } catch (err) {
      setLinkedinStatus('error')
      setError(err instanceof Error ? err.message : 'Failed to fetch LinkedIn profile')
    }
  }, [linkedinUrl])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const portfolioData = await generatePortfolio({
        resumeText,
        linkedinText,
        profileImageUrl: imagePreview,
      })

      sessionStorage.setItem('portfolioData', JSON.stringify(portfolioData))
      navigate('/portfolio')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate portfolio')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveResume = () => {
    setResumeFile(null)
    setResumeText('')
  }

  const isReadyToGenerate = resumeText || linkedinText

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-neutral-200 bg-white">
        <div className="max-w-xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-lg font-semibold text-black">PortfolioGPT</span>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-neutral-500 hover:text-black transition-colors duration-300"
          >
            ← Exit
          </button>
        </div>
      </nav>

      <div className="flex-1 max-w-xl mx-auto px-6 py-12 w-full animate-fade-in-up">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold text-black mb-2 tracking-tight">
            Create your <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">portfolio</span>
          </h1>
          <p className="text-neutral-500">
            Add your details and we'll generate your website.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Image */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200">
            <label className="block text-sm font-medium text-black mb-4">
              Photo
            </label>
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden flex items-center justify-center border-2 border-blue-100 transition-all duration-300 hover:border-blue-200">
                {imagePreview ? (
                  <img src={imagePreview} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-8 h-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="profile-upload"
                />
                <label
                  htmlFor="profile-upload"
                  className="cursor-pointer text-sm bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent font-medium hover:opacity-80 transition-opacity"
                >
                  Upload photo
                </label>
                {imagePreview && (
                  <>
                    <span className="mx-2 text-neutral-300">·</span>
                    <button
                      type="button"
                      onClick={() => setImagePreview(null)}
                      className="text-sm text-neutral-500 hover:text-black transition-colors"
                    >
                      Remove
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Resume Upload */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200">
            <label className="block text-sm font-medium text-black mb-4">
              Resume
            </label>
            {resumeFile ? (
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-blue-100">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">{resumeFile.name}</p>
                    <p className="text-xs text-neutral-500">{(resumeFile.size / 1024).toFixed(0)} KB · Ready</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveResume}
                  className="text-sm text-neutral-500 hover:text-black transition-colors"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                  isDragging
                    ? 'border-blue-400 bg-blue-50'
                    : 'border-neutral-200 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeSelect}
                  className="hidden"
                  id="resume-upload"
                />
                <label htmlFor="resume-upload" className="cursor-pointer">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <p className="text-sm text-neutral-600">
                    Drop your PDF here, or{' '}
                    <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent font-medium">browse</span>
                  </p>
                </label>
              </div>
            )}
          </div>

          {/* LinkedIn */}
          <div className="bg-white p-6 rounded-xl border border-neutral-200">
            <label className="block text-sm font-medium text-black mb-4">
              LinkedIn
            </label>
            <div className="flex gap-3">
              <input
                type="text"
                value={linkedinUrl}
                onChange={(e) => {
                  setLinkedinUrl(e.target.value)
                  setLinkedinStatus('idle')
                }}
                placeholder="linkedin.com/in/username"
                className="flex-1 px-4 py-3 border border-neutral-200 rounded-lg text-black placeholder-neutral-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all duration-300"
              />
              <button
                type="button"
                onClick={handleLinkedInFetch}
                disabled={!linkedinUrl.trim() || linkedinStatus === 'loading'}
                className="px-5 py-3 bg-black text-white text-sm font-medium rounded-lg disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed hover:bg-neutral-800 transition-all duration-300"
              >
                {linkedinStatus === 'loading' ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : linkedinStatus === 'success' ? (
                  '✓'
                ) : (
                  'Fetch'
                )}
              </button>
            </div>
            {linkedinStatus === 'success' && (
              <p className="mt-3 text-sm text-green-600 flex items-center gap-1">
                <span>✓</span> Profile fetched successfully
              </p>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl animate-fade-in">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading || !isReadyToGenerate}
            className="group w-full py-4 bg-black text-white font-medium rounded-xl disabled:bg-neutral-200 disabled:text-neutral-400 disabled:cursor-not-allowed hover:bg-neutral-800 transition-all duration-300 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                Generate Portfolio
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Footer */}
      <footer className="border-t border-neutral-200 py-6 bg-white">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="text-sm text-neutral-500">
            © VibeLabs Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
