const controllers = [
  {
    id: 'ctrl-basic-wired',
    name: 'D Games Wired Controller',
    subtitle: 'USB Plug & Play',
    category: 'Wired',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=400&fit=crop',
    description: 'Reliable wired gamepad for PC. Compatible with all major titles.',
    features: ['USB-C connection', 'Dual vibration', '8-hour comfort grip'],
    inStock: true,
  },
  {
    id: 'ctrl-wireless-pro',
    name: 'D Games Wireless Pro',
    subtitle: 'Bluetooth 5.0',
    category: 'Wireless',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1592840500803-1a68975faec4?w=600&h=400&fit=crop',
    description: 'Low-latency wireless controller with rechargeable battery.',
    features: ['40-hour battery', 'Bluetooth + 2.4GHz', 'Programmable back buttons'],
    inStock: true,
  },
  {
    id: 'ctrl-elite',
    name: 'D Games Elite Controller',
    subtitle: 'Tournament Grade',
    category: 'Pro',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1612287230202-1ff1d85c1bdf?w=600&h=400&fit=crop',
    description: 'Adjustable tension sticks, hair triggers, and swappable D-pad.',
    features: ['Hall-effect sticks', '4 rear paddles', 'Aluminum triggers'],
    inStock: true,
  },
  {
    id: 'ctrl-racing-wheel',
    name: 'D Games Racing Wheel',
    subtitle: 'Force Feedback',
    category: 'Racing',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    description: '270° force feedback wheel with pedal set for sim racing.',
    features: ['Force feedback', 'Pedal set included', 'Clamp mount'],
    inStock: true,
  },
  {
    id: 'ctrl-fight-stick',
    name: 'D Games Fight Stick',
    subtitle: 'Arcade Style',
    category: 'Fighting',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
    description: 'Sanwa-style joystick and buttons for fighting games.',
    features: ['Sanwa-compatible parts', '8-button layout', 'Non-slip base'],
    inStock: true,
  },
  {
    id: 'ctrl-mobile',
    name: 'D Games Mobile Grip',
    subtitle: 'Phone & Tablet',
    category: 'Mobile',
    price: 34.99,
    image: 'https://images.unsplash.com/photo-1605902711622-cfb43c4437b3?w=600&h=400&fit=crop',
    description: 'Telescopic controller for cloud gaming on the go.',
    features: ['Fits 4.7–7" screens', 'USB-C / Lightning', 'Foldable design'],
    inStock: true,
  },
]

export const controllersWithType = controllers.map((c) => ({
  ...c,
  type: 'controller',
}))

export function getControllerById(id) {
  return controllersWithType.find((c) => c.id === id)
}

export default controllersWithType
