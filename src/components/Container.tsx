import Link from 'next/link'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full p-5 pt-20 lg:p-20 lg:pt-20 max-w-5xl mx-auto dark:bg-gray-950 dark:text-white">

      <div>
        {children}
        </div>
      <footer className="footer">
        
      </footer>
    </div>
  )
}
