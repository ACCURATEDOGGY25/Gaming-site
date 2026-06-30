const guides = [
  {
    id: 'fighting-games-setup',
    title: 'Start Fighting Games the Right Way',
    subtitle: 'MK, Tekken, Street Fighter — gear + setup guide',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop',
    readTime: '4 min read',
    intro:
      'Fighting games demand low input lag, the right controller, and a PC that holds 60fps+ consistently. This guide covers what to buy and what to book.',
    sections: [
      {
        heading: 'Best controllers for fighters',
        body: 'Fight sticks give you arcade accuracy. For pad players, an elite controller with hair triggers and good D-pad matters.',
        links: [
          { label: 'D Games Fight Stick', to: '/controllers/ctrl-fight-stick' },
          { label: 'D Games Elite Controller', to: '/controllers/ctrl-elite' },
        ],
      },
      {
        heading: 'Recommended games',
        body: 'Start with Mortal Kombat 11 for accessibility, or Tekken 8 for depth. Classic MK is cheap if you want retro.',
        links: [
          { label: 'Mortal Kombat 11', to: '/games/mk11' },
          { label: 'Tekken 8', to: '/games/tekken-8' },
          { label: 'MK Starter Bundle', to: '/bundles/bundle-mk-starter' },
        ],
      },
      {
        heading: 'Don\'t skip setup',
        body: 'Button mapping, dead zones, and network tuning make online play feel fair. We do it in one session.',
        links: [
          { label: 'Controller Setup — $25', to: '/services/svc-controller-setup' },
          { label: 'Game Optimization — $49', to: '/services/svc-game-optimization' },
        ],
      },
    ],
  },
  {
    id: 'console-to-pc',
    title: 'Switching from Console to PC Gaming',
    subtitle: 'Everything you need in one weekend',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=800&h=450&fit=crop',
    readTime: '5 min read',
    intro:
      'Console players often underestimate drivers, game launchers, and controller pairing. Here\'s the fastest path to a working PC setup without the headaches.',
    sections: [
      {
        heading: 'The one service that solves most of it',
        body: 'Game-Ready PC Setup installs Windows tools, GPU drivers, 3 games, controller pairing, and a benchmark — done in 24 hours.',
        links: [
          { label: 'Game-Ready PC Setup — $149', to: '/services/svc-gaming-setup' },
          { label: 'Gaming PC Starter Bundle', to: '/bundles/bundle-gaming-starter' },
        ],
      },
      {
        heading: 'Controller that feels familiar',
        body: 'Wireless pro controllers with Bluetooth and 2.4GHz work like console pads but with lower latency on PC.',
        links: [
          { label: 'Wireless Pro Controller', to: '/controllers/ctrl-wireless-pro' },
        ],
      },
      {
        heading: 'Games to start with',
        body: 'Pick titles you already know — Elden Ring and Forza are great PC showcases with broad controller support.',
        links: [
          { label: 'Elden Ring', to: '/games/elden-ring' },
          { label: 'Forza Horizon 5', to: '/games/forza-horizon5' },
        ],
      },
    ],
  },
  {
    id: 'fc-football-pc',
    title: 'EA Sports FC on PC — Best Setup',
    subtitle: 'Controller, optimization, and which FC to buy',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=450&fit=crop',
    readTime: '3 min read',
    intro:
      'FC on PC needs a solid controller, stable online connection, and the right graphics settings. Newer FC titles cost more — here\'s why and what to get.',
    sections: [
      {
        heading: 'Which FC to buy',
        body: 'FC 26 has the best graphics and largest file size. FC 24 is cheaper. Prices scale with graphics tier on our catalog.',
        links: [
          { label: 'EA Sports FC 26', to: '/games/fc26' },
          { label: 'EA Sports FC 24', to: '/games/fc23' },
        ],
      },
      {
        heading: 'Best bundle for football fans',
        body: 'Wireless controller + latest FC + performance tune for smooth online matches.',
        links: [
          { label: 'FC Football Bundle', to: '/bundles/bundle-fc-football' },
        ],
      },
      {
        heading: 'Online lag fixes',
        body: 'We tune network settings, in-game graphics, and background apps remotely — usually same day.',
        links: [
          { label: 'Game Optimization — $49', to: '/services/svc-game-optimization' },
        ],
      },
    ],
  },
  {
    id: 'pc-running-slow',
    title: 'PC Running Slow? Start Here',
    subtitle: 'When to DIY vs when to book us',
    image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&h=450&fit=crop',
    readTime: '4 min read',
    intro:
      'Slow boot, pop-ups, or games stuttering — most people can Google fixes but waste hours. Here\'s when our packages save you time and data.',
    sections: [
      {
        heading: 'Symptoms → solutions',
        body: 'Pop-ups and weird toolbars = virus removal ($99). General slowness = tune-up ($79). Games only lag = optimization ($49).',
        links: [
          { label: 'Virus Removal — $99', to: '/services/svc-virus-removal' },
          { label: 'Basic Tune-up — $79', to: '/services/svc-basic-tuneup' },
          { label: 'Game Optimization — $49', to: '/services/svc-game-optimization' },
        ],
      },
      {
        heading: 'Peace of mind',
        body: 'We backup your data before major work and include guarantees — you\'re not gambling with your files.',
        links: [
          { label: 'Book a service', to: '/book' },
        ],
      },
    ],
  },
]

export function getGuideById(id) {
  return guides.find((g) => g.id === id)
}

export default guides
