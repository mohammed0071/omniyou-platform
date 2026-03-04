import { useState } from 'react'
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Settings, 
  Video, 
  Sparkles,
  Menu,
  ChevronRight,
  Play,
  Clock,
  Check,
  Lock,
  Zap,
  Palette,
  Glasses,
  Shirt,
  Wand2,
  Plus,
  Download,
  Eye
} from 'lucide-react'
import { cn } from './lib/utils'

// Types
interface Subscription {
  tier: 'core' | 'pro' | 'authority'
  videosPerMonth: number
  clonesIncluded: number
  usedVideos: number
  usedClones: number
}

interface Clone {
  id: string
  name: string
  status: 'active' | 'processing' | 'draft'
  createdAt: string
  appearance: CloneAppearance
}

interface CloneAppearance {
  clothing: string
  eyewear: string | null
  hat: string | null
  accessories: string[]
  beautified: boolean
  hairStyle: string | null
}

interface Script {
  id: string
  title: string
  content: string
  cloneId: string
  createdAt: string
  status: 'draft' | 'generating' | 'completed'
}

// Mock Data
const currentSubscription: Subscription = {
  tier: 'pro',
  videosPerMonth: 999,
  clonesIncluded: 3,
  usedVideos: 47,
  usedClones: 2
}

const clones: Clone[] = [
  {
    id: '1',
    name: 'Main Clone',
    status: 'active',
    createdAt: '2026-02-15',
    appearance: {
      clothing: 'business-suit',
      eyewear: null,
      hat: null,
      accessories: [],
      beautified: true,
      hairStyle: 'short'
    }
  },
  {
    id: '2',
    name: 'Casual Clone',
    status: 'active',
    createdAt: '2026-02-20',
    appearance: {
      clothing: 'casual',
      eyewear: null,
      hat: null,
      accessories: [],
      beautified: false,
      hairStyle: null
    }
  }
]

const scripts: Script[] = [
  {
    id: '1',
    title: 'Welcome Video',
    content: 'Welcome to our platform. I am here to help you...',
    cloneId: '1',
    createdAt: '2026-03-01',
    status: 'completed'
  },
  {
    id: '2',
    title: 'Product Demo',
    content: 'Let me show you how our product works...',
    cloneId: '1',
    createdAt: '2026-03-02',
    status: 'generating'
  }
]

// Components
function Sidebar({ activeTab, setActiveTab, isOpen, setIsOpen }: { 
  activeTab: string
  setActiveTab: (tab: string) => void
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}) {
  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'clones', icon: Users, label: 'My Clones' },
    { id: 'scripts', icon: Video, label: 'Scripts' },
    { id: 'subscription', icon: CreditCard, label: 'Subscription' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={cn(
        "fixed top-0 left-0 z-50 h-full w-64 bg-card border-r border-border transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-primary" />
            </div>
            <span className="font-display font-bold text-xl">OmniYou</span>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  setIsOpen(false)
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  activeTab === item.id 
                    ? "bg-primary/10 text-primary border border-primary/20" 
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <div className="glass rounded-lg p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Zap className="w-4 h-4 text-primary" />
              <span>Pro Plan</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {currentSubscription.usedVideos} / {currentSubscription.videosPerMonth} videos
            </div>
            <div className="w-full h-1.5 bg-secondary rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${(currentSubscription.usedVideos / currentSubscription.videosPerMonth) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

function DashboardTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Video Credits */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Video className="w-5 h-5 text-primary" />
            <span className="text-xs text-muted-foreground">This month</span>
          </div>
          <div className="text-3xl font-bold font-display">{currentSubscription.videosPerMonth - currentSubscription.usedVideos}</div>
          <div className="text-sm text-muted-foreground mt-1">Videos remaining</div>
          <div className="w-full h-1.5 bg-secondary rounded-full mt-4 overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full"
              style={{ width: `${(currentSubscription.usedVideos / currentSubscription.videosPerMonth) * 100}%` }}
            />
          </div>
        </div>
        
        {/* Clone Credits */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Users className="w-5 h-5 text-primary" />
            <span className="text-xs text-muted-foreground">Total</span>
          </div>
          <div className="text-3xl font-bold font-display">
            {currentSubscription.clonesIncluded - currentSubscription.usedClones}
          </div>
          <div className="text-sm text-muted-foreground mt-1">Clones available</div>
          <div className="flex gap-1 mt-4">
            {[...Array(currentSubscription.clonesIncluded)].map((_, i) => (
              <div 
                key={i}
                className={cn(
                  "w-3 h-3 rounded-full",
                  i < currentSubscription.usedClones ? "bg-primary" : "bg-secondary"
                )}
              />
            ))}
          </div>
        </div>
        
        {/* Active Scripts */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <Play className="w-5 h-5 text-primary" />
            <span className="text-xs text-muted-foreground">Status</span>
          </div>
          <div className="text-3xl font-bold font-display">{scripts.filter(s => s.status === 'completed').length}</div>
          <div className="text-sm text-muted-foreground mt-1">Completed videos</div>
          <div className="flex items-center gap-2 mt-4">
            <Clock className="w-4 h-4 text-yellow-500" />
            <span className="text-sm text-yellow-500">1 generating</span>
          </div>
        </div>
        
        {/* Subscription */}
        <div className="glass rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <CreditCard className="w-5 h-5 text-primary" />
            <span className="text-xs text-muted-foreground">Plan</span>
          </div>
          <div className="text-3xl font-bold font-display capitalize">{currentSubscription.tier}</div>
          <div className="text-sm text-muted-foreground mt-1">£997/month</div>
          <button className="text-xs text-primary mt-4 hover:underline">
            Manage plan →
          </button>
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="glass rounded-xl p-6">
        <h3 className="font-display font-bold text-lg mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { title: 'Video generated', desc: 'Welcome Video • Main Clone', time: '2 hours ago', status: 'completed' },
            { title: 'Script created', desc: 'Product Demo', time: '5 hours ago', status: 'generating' },
            { title: 'Clone updated', desc: 'Casual Clone appearance changed', time: '1 day ago', status: 'completed' },
          ].map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  item.status === 'completed' ? "bg-green-500" : "bg-yellow-500 animate-pulse"
                )} />
                <div>
                  <div className="text-sm font-medium">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ClonesTab() {
  const [selectedClone, setSelectedClone] = useState<Clone | null>(clones[0])
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl">My Clones</h2>
          <p className="text-muted-foreground">Manage your digital twins</p>
        </div>
        <button className="px-4 py-2 bg-primary text-background rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Clone
        </button>
      </div>
      
      {/* Clone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clones.map((clone) => (
          <div 
            key={clone.id}
            onClick={() => setSelectedClone(clone)}
            className={cn(
              "glass rounded-xl p-4 cursor-pointer transition-all duration-200 hover:border-primary/30",
              selectedClone?.id === clone.id ? "border-primary" : "border-border"
            )}
          >
            <div className="aspect-video bg-secondary rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
              <Users className="w-12 h-12 text-muted-foreground" />
              {clone.status === 'active' && (
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">{clone.name}</h3>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  clone.status === 'active' ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
                )}>
                  {clone.status}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Clone Customization */}
      {selectedClone && (
        <div className="glass rounded-xl p-6">
          <h3 className="font-display font-bold text-lg mb-6">Customize: {selectedClone.name}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Clothing */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-3">
                <Shirt className="w-4 h-4 text-primary" />
                Clothing
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['Business Suit', 'Casual', 'Smart Casual', 'Sport', 'Formal', 'Custom'].map((item) => (
                  <button
                    key={item}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm transition-all border",
                      selectedClone.appearance.clothing === item.toLowerCase().replace(' ', '-')
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-secondary border-border hover:border-primary/30"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Eyewear */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-3">
                <Glasses className="w-4 h-4 text-primary" />
                Eyewear
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['None', 'Reading', 'Sunglasses', 'Blue Light', 'Round', 'Aviator'].map((item) => (
                  <button
                    key={item}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm transition-all border",
                      (item === 'None' && !selectedClone.appearance.eyewear) ||
                      selectedClone.appearance.eyewear === item.toLowerCase().replace(' ', '-')
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-secondary border-border hover:border-primary/30"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Hat */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-3">
                <Palette className="w-4 h-4 text-primary" />
                Hat / Headwear
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['None', 'Cap', 'Beanie', 'Fedora', 'Beret', 'Headband'].map((item) => (
                  <button
                    key={item}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm transition-all border",
                      (item === 'None' && !selectedClone.appearance.hat) ||
                      selectedClone.appearance.hat === item.toLowerCase()
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-secondary border-border hover:border-primary/30"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Accessories */}
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-3">
                <Sparkles className="w-4 h-4 text-primary" />
                Accessories
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['None', 'Watch', 'Necklace', 'Earrings', 'Bracelet', 'Pins'].map((item) => (
                  <button
                    key={item}
                    className={cn(
                      "px-3 py-2 rounded-lg text-sm transition-all border",
                      item === 'None' && selectedClone.appearance.accessories.length === 0
                        ? "bg-primary/10 border-primary text-primary"
                        : "bg-secondary border-border hover:border-primary/30"
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Premium Features */}
          <div className="mt-6 pt-6 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                  <Wand2 className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="font-medium flex items-center gap-2">
                    Beautify Enhancement
                    <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-0.5 rounded-full">
                      PREMIUM
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">AI-enhanced features & hair styling</div>
                </div>
              </div>
              <button className="px-4 py-2 bg-secondary border border-border rounded-lg hover:border-primary/30 transition-colors flex items-center gap-2">
                <Wand2 className="w-4 h-4" />
                Enhance
              </button>
            </div>
            
            {/* Hair Style Selection (Premium) */}
            <div className="mt-4">
              <label className="text-sm font-medium mb-3 flex items-center gap-2">
                <Lock className="w-3 h-3 text-purple-400" />
                Hair Style (Premium)
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {['Short', 'Medium', 'Long', 'Curly', 'Wavy', 'Bald'].map((item) => (
                  <button
                    key={item}
                    className="px-3 py-2 rounded-lg text-sm transition-all border border-border hover:border-purple-500/30 bg-secondary/50 opacity-75"
                  >
                    {item}
                  </button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Upgrade to Authority for unlimited hair styles
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ScriptsTab() {
  const [selectedScript, setSelectedScript] = useState<Script | null>(scripts[0])
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-2xl">Scripts</h2>
          <p className="text-muted-foreground">Create and manage your video scripts</p>
        </div>
        <button className="px-4 py-2 bg-primary text-background rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Script
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Script List */}
        <div className="lg:col-span-1 space-y-3">
          {scripts.map((script) => (
            <div
              key={script.id}
              onClick={() => setSelectedScript(script)}
              className={cn(
                "glass rounded-xl p-4 cursor-pointer transition-all duration-200",
                selectedScript?.id === script.id ? "border-primary" : "border-border hover:border-primary/30"
              )}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium">{script.title}</h3>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  script.status === 'completed' ? "bg-green-500/20 text-green-400" : 
                  script.status === 'generating' ? "bg-yellow-500/20 text-yellow-400" :
                  "bg-gray-500/20 text-gray-400"
                )}>
                  {script.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">{script.content}</p>
              <div className="text-xs text-muted-foreground mt-2">
                {new Date(script.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
        
        {/* Script Editor */}
        <div className="lg:col-span-2 glass rounded-xl p-6">
          {selectedScript ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  value={selectedScript.title}
                  onChange={() => {}}
                  className="bg-transparent text-xl font-display font-bold focus:outline-none"
                />
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="mb-4">
                <label className="text-sm text-muted-foreground mb-2 block">Select Clone</label>
                <select className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary">
                  {clones.map((clone) => (
                    <option key={clone.id} value={clone.id}>{clone.name}</option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="text-sm text-muted-foreground mb-2 block">Script Content</label>
                <textarea
                  value={selectedScript.content}
                  onChange={() => {}}
                  className="w-full h-64 bg-secondary border border-border rounded-lg px-4 py-3 focus:outline-none focus:border-primary resize-none"
                  placeholder="Write your script here..."
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {selectedScript.content.length} characters
                </div>
                <button className="px-6 py-2 bg-primary text-background rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                  <Video className="w-4 h-4" />
                  Generate Video
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-muted-foreground">
              <Video className="w-12 h-12 mb-4 opacity-50" />
              <p>Select a script to edit</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function SubscriptionTab() {
  const plans = [
    {
      name: 'Core',
      price: 497,
      videos: 12,
      clones: 1,
      features: ['1 Digital Clone', '12 videos/month', 'Script writing assistance', 'Basic dashboard', 'Email support'],
      current: false
    },
    {
      name: 'Pro',
      price: 997,
      videos: 999,
      clones: 3,
      features: ['3 Digital Clones', 'Unlimited videos', 'Voice refinement', 'Bilingual (2 languages)', 'Priority queue', 'Priority support'],
      current: true
    },
    {
      name: 'Authority',
      price: 'Custom',
      videos: 'Unlimited',
      clones: 'Unlimited',
      features: ['Unlimited clones', 'Multi-language (10+)', 'Custom tone modes', 'Dedicated manager', 'API access', 'SLA guarantee'],
      current: false
    }
  ]
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-2xl">Subscription</h2>
        <p className="text-muted-foreground">Manage your plan and usage</p>
      </div>
      
      {/* Current Usage */}
      <div className="glass rounded-xl p-6">
        <h3 className="font-display font-bold text-lg mb-4">Current Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Video Credits</span>
              <span>{currentSubscription.usedVideos} / {currentSubscription.videosPerMonth}</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full"
                style={{ width: `${(currentSubscription.usedVideos / currentSubscription.videosPerMonth) * 100}%` }}
              />
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Clones</span>
              <span>{currentSubscription.usedClones} / {currentSubscription.clonesIncluded}</span>
            </div>
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full"
                style={{ width: `${(currentSubscription.usedClones / currentSubscription.clonesIncluded) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan) => (
          <div 
            key={plan.name}
            className={cn(
              "glass rounded-xl p-6 relative",
              plan.current ? "border-primary" : "border-border"
            )}
          >
            {plan.current && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-background px-3 py-1 rounded-full text-xs font-medium">
                Current Plan
              </div>
            )}
            <h3 className="font-display font-bold text-xl mb-2">{plan.name}</h3>
            <div className="mb-4">
              <span className="text-3xl font-bold font-display">
                {typeof plan.price === 'number' ? `£${plan.price}` : plan.price}
              </span>
              {typeof plan.price === 'number' && <span className="text-muted-foreground">/month</span>}
            </div>
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <Video className="w-4 h-4 text-primary" />
                <span>{plan.videos} videos/month</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="w-4 h-4 text-primary" />
                <span>{plan.clones} clones</span>
              </div>
            </div>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <button 
              className={cn(
                "w-full py-2 rounded-lg font-medium transition-colors",
                plan.current 
                  ? "bg-secondary border border-border cursor-default"
                  : "bg-primary text-background hover:bg-primary/90"
              )}
              disabled={plan.current}
            >
              {plan.current ? 'Current Plan' : 'Upgrade'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function SettingsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display font-bold text-2xl">Settings</h2>
        <p className="text-muted-foreground">Manage your account preferences</p>
      </div>
      
      <div className="glass rounded-xl p-6 space-y-6">
        {/* Profile */}
        <div>
          <h3 className="font-display font-bold text-lg mb-4">Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Full Name</label>
              <input 
                type="text" 
                defaultValue="John Doe"
                className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Email</label>
              <input 
                type="email" 
                defaultValue="john@example.com"
                className="w-full bg-secondary border border-border rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>
        
        {/* Security */}
        <div className="pt-6 border-t border-border">
          <h3 className="font-display font-bold text-lg mb-4">Security</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-muted-foreground">Add an extra layer of security</div>
              </div>
              <button className="px-4 py-2 bg-secondary border border-border rounded-lg hover:border-primary/30 transition-colors">
                Enable
              </button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Change Password</div>
                <div className="text-sm text-muted-foreground">Update your password</div>
              </div>
              <button className="px-4 py-2 bg-secondary border border-border rounded-lg hover:border-primary/30 transition-colors">
                Change
              </button>
            </div>
          </div>
        </div>
        
        {/* Notifications */}
        <div className="pt-6 border-t border-border">
          <h3 className="font-display font-bold text-lg mb-4">Notifications</h3>
          <div className="space-y-4">
            {[
              { label: 'Email notifications', desc: 'Receive updates via email', enabled: true },
              { label: 'Push notifications', desc: 'Receive updates in browser', enabled: true },
              { label: 'Video generation alerts', desc: 'Notify when video is ready', enabled: true },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{item.label}</div>
                  <div className="text-sm text-muted-foreground">{item.desc}</div>
                </div>
                <button className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  item.enabled ? "bg-primary" : "bg-secondary"
                )}>
                  <div className={cn(
                    "w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform",
                    item.enabled ? "translate-x-6" : "translate-x-0.5"
                  )} />
                </button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-6 border-t border-border">
          <button className="px-6 py-2 bg-primary text-background rounded-lg font-medium hover:bg-primary/90 transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

// Main App
function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  
  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />
      case 'clones': return <ClonesTab />
      case 'scripts': return <ScriptsTab />
      case 'subscription': return <SubscriptionTab />
      case 'settings': return <SettingsTab />
      default: return <DashboardTab />
    }
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border flex items-center justify-between px-4 z-30">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-display font-bold">OmniYou</span>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-4 lg:p-8">
          {renderTab()}
        </div>
      </main>
    </div>
  )
}

export default App
