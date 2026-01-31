interface Props {
  maxWidth?: string
}

export default function Footer({ maxWidth = 'max-w-6xl' }: Props) {
  return (
    <footer className="border-t border-neutral-200 py-6 bg-white">
      <div className={`${maxWidth} mx-auto px-6 text-center`}>
        <p className="text-sm text-neutral-500">
          © VibeLabs Inc. All rights reserved @ 2026.
        </p>
      </div>
    </footer>
  )
}
