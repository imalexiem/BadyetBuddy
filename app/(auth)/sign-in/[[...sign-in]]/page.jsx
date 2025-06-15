import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <main className="flex w-full h-screen">
      {/* Left side: Image - now with flex-1/2 instead of flex-1 */}
      <div className="relative w-1/2 hidden lg:block">
        <img 
          src={'/login.jpg'} 
          alt="Unsplash Image" 
          className="w-full h-screen object-cover" 
        />
      </div>

      {/* Right side: Sign-In form - now with w-1/2 instead of flex-1 */}
      <div className="w-1/2 flex items-center justify-center bg-white px-4 py-8 lg:px-0">
        <div className="w-full max-w-md space-y-8">
          <SignIn />
        </div>
      </div>
    </main>
  )
}
