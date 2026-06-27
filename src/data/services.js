const services = [
  {
    id: 'svc-basic-tuneup',
    name: 'Basic PC Tune-up',
    tagline: 'Speed up a sluggish PC',
    price: 79,
    turnaround: '24 hours',
    guarantee: '30-day satisfaction guarantee',
    popular: false,
    category: 'Repair',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=600&h=400&fit=crop',
    description:
      'For PCs that feel slow, crash often, or need a fresh start. We handle the messy stuff so you don\'t have to.',
    includes: [
      'Full malware & virus scan',
      'Startup program cleanup',
      'Driver updates',
      'Disk cleanup & optimization',
      'Performance report when done',
    ],
  },
  {
    id: 'svc-gaming-setup',
    name: 'Game-Ready PC Setup',
    tagline: 'From box to playing in 24 hours',
    price: 149,
    turnaround: '24 hours',
    guarantee: '30-day support included',
    popular: true,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=600&h=400&fit=crop',
    description:
      'New PC or console-to-PC switch? We install, configure, and test everything so you can jump straight into games.',
    includes: [
      'Windows & gaming platform setup',
      'GPU driver + game-ready optimization',
      'Controller pairing & button mapping',
      'Network latency check for online play',
      '3 game installs + settings tuned',
      'Benchmark report included',
    ],
  },
  {
    id: 'svc-business-starter',
    name: 'Small Business IT Starter',
    tagline: 'Stable, secure, tested',
    price: 299,
    turnaround: '2–3 business days',
    guarantee: '60-day remote support',
    popular: false,
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    description:
      'Home office or small shop with no IT person? We set up your network, backups, and security properly the first time.',
    includes: [
      'Wi-Fi audit & optimization',
      'Backup system configured',
      'Antivirus & firewall setup',
      'Email & printer troubleshooting',
      'Remote access for future fixes',
      'Written setup documentation',
    ],
  },
  {
    id: 'svc-custom-build',
    name: 'Custom PC Build + Setup',
    tagline: 'Built, cabled, benchmarked',
    price: 299,
    priceNote: 'Labor only — parts separate',
    turnaround: '3–5 business days',
    guarantee: '90-day build warranty',
    popular: false,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f347bece?w=600&h=400&fit=crop',
    description:
      'Tell us your budget and games. We source parts, build clean, cable-manage, and deliver a benchmark report.',
    includes: [
      'Parts consultation & compatibility check',
      'Professional assembly & cable management',
      'Stress test + thermal check',
      'Full OS + driver install',
      'Benchmark report with photos',
    ],
  },
  {
    id: 'svc-game-optimization',
    name: 'Game Performance Optimization',
    tagline: 'Smoother frames, less stutter',
    price: 49,
    turnaround: 'Same day (remote)',
    guarantee: 'Re-tune free if not satisfied',
    popular: false,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
    description:
      'Game runs badly? We tune settings, drivers, and background apps remotely — usually done in under an hour.',
    includes: [
      'Remote session (you watch or walk away)',
      'In-game settings optimized for your hardware',
      'Background process cleanup',
      'FPS before/after report',
    ],
  },
  {
    id: 'svc-controller-setup',
    name: 'Controller Setup + Mapping',
    tagline: 'Plug in and play — properly',
    price: 25,
    turnaround: 'Same day',
    guarantee: 'Works or we redo it free',
    popular: false,
    category: 'Gaming',
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=400&fit=crop',
    description:
      'Bought a controller but buttons feel wrong? We pair, map, and test it with your games.',
    includes: [
      'Bluetooth or wired pairing',
      'Button mapping for your main games',
      'Dead zone & sensitivity tuning',
      'Quick test session included',
    ],
  },
  {
    id: 'svc-virus-removal',
    name: 'Virus & Malware Removal',
    tagline: 'Same-day fix + peace of mind',
    price: 99,
    turnaround: 'Same day',
    guarantee: '30-day re-infection support',
    popular: false,
    category: 'Repair',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
    description:
      'Pop-ups, slow PC, or suspicious activity? We clean it thoroughly and show you how to stay safe.',
    includes: [
      'Deep malware scan & removal',
      'Browser reset & extension cleanup',
      'Security software installed',
      'Data backup before work starts',
      'Prevention tips walkthrough',
    ],
  },
  {
    id: 'svc-monthly-health',
    name: 'Monthly PC Health Plan',
    tagline: 'Set it and forget it',
    price: 19,
    priceNote: '/month',
    turnaround: 'Ongoing',
    guarantee: 'Cancel anytime',
    popular: false,
    category: 'Retainer',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    description:
      'Monthly check-ins, updates, backups verified, and priority remote support when something breaks.',
    includes: [
      'Monthly health check & updates',
      'Backup verification',
      'Priority remote support queue',
      '10% off all other services',
    ],
  },
]

export const servicesWithType = services.map((s) => ({
  ...s,
  type: 'service',
}))

export function getServiceById(id) {
  return servicesWithType.find((s) => s.id === id)
}

export const SERVICE_AREA = 'Local pickup & on-site within 25 miles · Remote available worldwide'
export const RESPONSE_TIME = 'Most bookings confirmed within 2 hours'
export const RUSH_FEE = 'Same-day rush available — +50% on any service'

export default servicesWithType
