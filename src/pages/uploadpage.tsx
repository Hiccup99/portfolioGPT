import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { generatePortfolio } from '../services/portfolio'
import { extractTextFromPDF, isPDFFile } from '../services/pdf'
import { fetchLinkedInProfile, linkedInProfileToText } from '../services/linkedin'
import { MOCK_PROFILES, type MockProfile } from '../data/mockLinkedIn'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { Upload, FileText, Loader2, Check, ArrowLeft, ArrowRight } from 'lucide-react'
import Footer from '../components/footer'

export default function UploadPage() {
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo(0, 0)

    // Auto-populate LinkedIn data in mock mode
    const useMock = import.meta.env.VITE_USE_MOCK_DATA === 'true'
    if (useMock) {
      // Select mock profile from query param, then env var, then default to 'sidharth'
      const urlParams = new URLSearchParams(window.location.search)
      const queryProfile = urlParams.get('profile')
      const profileKey = (queryProfile || import.meta.env.VITE_MOCK_PROFILE || 'sidharth') as MockProfile
      const mockData = MOCK_PROFILES[profileKey] || MOCK_PROFILES.sidharth

      const mockProfile = {
        name: mockData.fullName,
        summary: mockData.about,
        location: mockData.location,
        profile_picture_url: mockData.profile_photo,
        certifications: mockData.certification?.map((c: { certification: string; company_name: string; issue_date: string }) => ({
          name: c.certification,
          authority: c.company_name,
          date: c.issue_date
        })),
        languages: mockData.languages?.map((l: { name: string }) => l.name),
        awards: mockData.awards?.map((a: { name: string; organization: string; duration: string; summary: string }) => ({
          name: a.name,
          organization: a.organization,
          date: a.duration,
          summary: a.summary
        })),
        recommendations: mockData.recommendations?.map((r: { name: string; summary: string }) => ({
          name: r.name,
          summary: r.summary
        }))
      }
      const text = linkedInProfileToText(mockProfile)
      setLinkedinText(text)
      setLinkedinProfilePicture(mockData.profile_photo)
      setLinkedinStatus('success')
      setLinkedinUrl(`(mock: ${profileKey})`)
    }
  }, [])

  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [resumeText, setResumeText] = useState<string>('')
  const [isDragging, setIsDragging] = useState(false)

  const [linkedinUrl, setLinkedinUrl] = useState('')
  const [linkedinStatus, setLinkedinStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [linkedinText, setLinkedinText] = useState('')
  const [linkedinProfilePicture, setLinkedinProfilePicture] = useState<string | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  const handleDrop = useCallback(async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    const file = e.dataTransfer.files[0]
    if (file && isPDFFile(file)) {
      setResumeFile(file)
      try {
        const text = await extractTextFromPDF(file)
        setResumeText(text)
        toast.success('Resume uploaded successfully')
      } catch (err) {
        toast.error('Failed to extract text from PDF. Please try again.')
        console.error(err)
      }
    } else {
      toast.error('Please upload a PDF file')
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
        toast.success('Resume uploaded successfully')
      } catch (err) {
        toast.error('Failed to extract text from PDF. Please try again.')
        console.error(err)
      }
    } else if (file) {
      toast.error('Please upload a PDF file')
    }
  }, [])

  const handleLinkedInFetch = useCallback(async () => {
    if (!linkedinUrl.trim()) return

    setLinkedinStatus('loading')
    console.log('Fetching LinkedIn profile for:', linkedinUrl)

    try {
      const profile = await fetchLinkedInProfile(linkedinUrl)
      console.log('LinkedIn profile fetched:', profile)
      const text = linkedInProfileToText(profile)
      console.log('LinkedIn text generated:', text.substring(0, 200) + '...')
      setLinkedinText(text)
      setLinkedinProfilePicture(profile.profile_picture_url || null)
      setLinkedinStatus('success')
      toast.success('LinkedIn profile fetched successfully')
    } catch (err) {
      console.error('LinkedIn fetch failed:', err)
      setLinkedinStatus('error')
      toast.error(err instanceof Error ? err.message : 'Failed to fetch LinkedIn profile')
    }
  }, [linkedinUrl])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const portfolioData = await generatePortfolio({
        resumeText,
        linkedinText,
        profileImageUrl: linkedinProfilePicture,
      })

      sessionStorage.setItem('portfolioData', JSON.stringify(portfolioData))
      navigate('/portfolio')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to generate portfolio')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveResume = () => {
    setResumeFile(null)
    setResumeText('')
    toast.info('Resume removed')
  }

  const isReadyToGenerate = resumeText || linkedinText

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      {/* Navigation */}
      <nav className="border-b border-neutral-200 bg-white">
        <div className="max-w-xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-lg font-bold tracking-tight">
            <span className="text-black">Portfolio</span>
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">GPT</span>
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-neutral-500 hover:text-black"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Exit
          </Button>
        </div>
      </nav>

      <div className="flex-1 max-w-xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full animate-fade-in-up">
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
          {/* Resume Upload */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <Label className="block text-sm font-medium text-black mb-4">
                Resume
              </Label>
              {resumeFile ? (
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-blue-100">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-black">{resumeFile.name}</p>
                      <p className="text-xs text-neutral-500">{(resumeFile.size / 1024).toFixed(0)} KB · Ready</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveResume}
                    className="text-neutral-500 hover:text-black"
                  >
                    Remove
                  </Button>
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
                      <Upload className="w-6 h-6 text-blue-600" />
                    </div>
                    <p className="text-sm text-neutral-600">
                      Drop your PDF here, or{' '}
                      <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent font-medium">browse</span>
                    </p>
                  </label>
                </div>
              )}
            </CardContent>
          </Card>

          {/* LinkedIn */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <Label className="block text-sm font-medium text-black mb-4">
                LinkedIn
              </Label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="text"
                  value={linkedinUrl}
                  onChange={(e) => {
                    setLinkedinUrl(e.target.value)
                    setLinkedinStatus('idle')
                  }}
                  placeholder="linkedin.com/in/username"
                  className="flex-1"
                />
                <Button
                  type="button"
                  onClick={handleLinkedInFetch}
                  disabled={!linkedinUrl.trim() || linkedinStatus === 'loading'}
                  className="w-full sm:w-auto"
                >
                  {linkedinStatus === 'loading' ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : linkedinStatus === 'success' ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    'Fetch'
                  )}
                </Button>
              </div>
              {linkedinStatus === 'success' && (
                <p className="mt-3 text-sm text-green-600 flex items-center gap-1">
                  <Check className="w-4 h-4" /> Profile fetched successfully
                </p>
              )}
            </CardContent>
          </Card>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isLoading || !isReadyToGenerate}
            className="w-full group"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                Generate Portfolio
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </form>
      </div>

      <Footer maxWidth="max-w-xl" />
    </div>
  )
}
