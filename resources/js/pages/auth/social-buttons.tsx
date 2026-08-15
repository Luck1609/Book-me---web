
import facebook from "@/assets/images/facebook.png"
import google from "@/assets/images/google.webp"
import tiktok from "@/assets/images/tiktok.webp"
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'


const strategies = [
  {
    label: "Google",
    logo: google,
    value: "google"
  },
  {
    label: "Facebook",
    logo: facebook,
    value: "facebook"
  },
  {
    label: "TikTok",
    logo: tiktok,
    value: "tiktok"
  },
]

export default function SocialAuthButtons({ className }: { className?: string; }) {
  return (
    <div className={cn("w-full mx-auto flex justify-center gap-5", className)}>
      {
        strategies.map((strategy) => (
          <Button key={strategy.value} variant="outline" className="size-12">
            <img src={strategy.logo} className="size-6" />
          </Button>
        ))
      }
    </div>
  )
}


export const AlternateLogin = ({ className }: { className?: string; }) => {
  return (
    <div className={cn("w-full flex items-center justify-center gap-4 py-4 relative", className)}>
      <div className="w-full h-px bg-slate-200 absolute"></div>
      <span className="relative z-1 bg-background text-sm font-medium p-3 text-center uppercase">OR Continue with</span>
    </div>
  )
}
