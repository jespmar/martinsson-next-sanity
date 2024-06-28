import Link from 'next/link'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full p-5 pt-20 lg:p-20 lg:pt-40 max-w-7xl mx-auto">

      <div>
        {children}
        </div>
      <footer className="footer">
        
      </footer>
    </div>
  )
}
