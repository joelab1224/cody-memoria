'use client';

import { useState } from 'react';
import { 
  Glass, 
  Button, 
  Avatar, 
  Input, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui';

// Icons - these would typically come from lucide-react
const MicIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z"/>
    <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <path d="M12 19v3"/>
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3l18 9-18 9v-6l15-3-15-3z"/>
  </svg>
);

const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="4"/>
    <path d="M16 20v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8"/>
    <path d="M21 21l-4.35-4.35"/>
  </svg>
);

export default function ExamplesPage() {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F5F3] via-[#F0EDE8] to-[#E8E3DB] p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Section */}
        <Glass animate="breathe" intensity="medium" className="p-6 rounded-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-[#3A4B39] mb-2">Gentle Memories Design System</h1>
              <p className="text-[#7A8A76]">Experience the complete component library in action</p>
            </div>
            <Avatar 
              variant="profile" 
              size="profile"
              animation="shimmer"
              showStatus
              statusColor="online"
              fallback="GM"
            />
          </div>
        </Glass>

        {/* Memory Cards Grid */}
        <section>
          <h2 className="text-2xl font-medium text-[#3A4B39] mb-6">Memory Collection</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Memory Card 1 */}
            <Card variant="memory" animate="breathe" animationDelay={0}>
              <div className="p-6 text-center space-y-4">
                <Avatar 
                  variant="memory" 
                  size="lg" 
                  animation="shimmer" 
                  fallback="GR"
                  showStatus
                  statusColor="online"
                />
                <div>
                  <h3 className="text-lg font-medium text-[#3A4B39]">Grandma Rose</h3>
                  <p className="text-[#7A8A76] text-sm">Beloved grandmother with endless wisdom</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-2 py-1 bg-[#7A8A76]/20 text-[#5A6B59] text-xs rounded-full">Cooking Stories</span>
                  <span className="px-2 py-1 bg-[#B8952F]/20 text-[#8B7424] text-xs rounded-full">Family Tales</span>
                </div>
                <Button variant="primary" size="sm" className="w-full">
                  Continue Conversation
                </Button>
              </div>
            </Card>

            {/* Memory Card 2 */}
            <Card variant="memory" animate="breathe" animationDelay={1}>
              <div className="p-6 text-center space-y-4">
                <Avatar 
                  variant="memory" 
                  size="lg" 
                  animation="shimmer" 
                  fallback="JD"
                  showStatus
                  statusColor="offline"
                />
                <div>
                  <h3 className="text-lg font-medium text-[#3A4B39]">Dad</h3>
                  <p className="text-[#7A8A76] text-sm">Stories of adventure and life lessons</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-2 py-1 bg-[#E6B8A2]/30 text-[#B8952F] text-xs rounded-full">Travel</span>
                  <span className="px-2 py-1 bg-[#7A8A76]/20 text-[#5A6B59] text-xs rounded-full">Work Stories</span>
                </div>
                <Button variant="secondary" size="sm" className="w-full">
                  Start New Memory
                </Button>
              </div>
            </Card>

            {/* Memory Card 3 */}
            <Card variant="memory" animate="breathe" animationDelay={2}>
              <div className="p-6 text-center space-y-4">
                <Avatar 
                  variant="memory" 
                  size="lg" 
                  animation="shimmer" 
                  fallback="MJ"
                  showStatus
                  statusColor="offline"
                />
                <div>
                  <h3 className="text-lg font-medium text-[#3A4B39]">Uncle Mike</h3>
                  <p className="text-[#7A8A76] text-sm">The family's keeper of funny stories</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="px-2 py-1 bg-[#B8952F]/20 text-[#8B7424] text-xs rounded-full">Humor</span>
                  <span className="px-2 py-1 bg-[#E6B8A2]/30 text-[#B8952F] text-xs rounded-full">Childhood</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View Memories
                </Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Voice Interface Section */}
        <section>
          <h2 className="text-2xl font-medium text-[#3A4B39] mb-6">Voice Conversation</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Voice Interface */}
            <Card variant="voice" animate="breatheSlow" animationDelay={0}>
              <div className="p-8 text-center space-y-6">
                <div className="relative">
                  <Avatar 
                    variant="voice" 
                    size="voice" 
                    animation={isRecording ? "pulse" : "shimmer"}
                    showStatus
                    statusColor={isRecording ? "speaking" : "online"}
                    fallback="GR"
                  />
                  {isRecording && (
                    <div className="absolute inset-0 rounded-full border-4 border-[#B8952F] animate-ping" />
                  )}
                </div>
                
                <div>
                  <h2 className="text-xl font-medium text-[#3A4B39] mb-2">Speaking with Grandma Rose</h2>
                  <p className="text-[#7A8A76]">Share your favorite childhood memory with her</p>
                </div>

                {/* Waveform Visualization */}
                <div className="flex items-center justify-center gap-1 h-12">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i}
                      className={`w-1 bg-gradient-to-t from-[#7A8A76] to-[#B8952F] rounded-full transition-all duration-300 ${
                        isRecording 
                          ? `animate-pulse h-${Math.floor(Math.random() * 8) + 2}` 
                          : 'h-2'
                      }`}
                      style={{
                        animationDelay: `${i * 50}ms`
                      }}
                    />
                  ))}
                </div>

                {/* Voice Controls */}
                <div className="flex justify-center gap-4">
                  <Button variant="voiceSecondary" size="voice">
                    ⏸️
                  </Button>
                  <Button 
                    variant={isRecording ? "voicePrimary" : "voiceSecondary"} 
                    size="voice"
                    onClick={() => setIsRecording(!isRecording)}
                  >
                    🎤
                  </Button>
                  <Button variant="voiceSecondary" size="voice">
                    ⏹️
                  </Button>
                </div>

                {/* Live Transcript */}
                <Glass intensity="light" className="p-4 rounded-xl">
                  <p className="text-[#5A6B59] text-sm italic">
                    {isRecording 
                      ? "Listening... Tell me about your favorite summer memory with me."
                      : "Tap the microphone to start sharing your memory"
                    }
                  </p>
                </Glass>
              </div>
            </Card>

            {/* Profile Card */}
            <Card variant="profile" animate="breathe" animationDelay={1}>
              <CardHeader>
                <div className="flex items-center gap-4">
                  <Avatar 
                    variant="profile" 
                    size="lg"
                    animation="shimmer"
                    fallback="GR"
                    showStatus
                    statusColor="online"
                  />
                  <div>
                    <CardTitle className="text-xl">Grandma Rose</CardTitle>
                    <p className="text-[#7A8A76]">Born 1942 • Your Maternal Grandmother</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Emotional Essence */}
                <div>
                  <h4 className="font-medium text-[#3A4B39] mb-2">Her Essence</h4>
                  <p className="text-[#5A6B59] leading-relaxed">
                    A gentle soul with infinite patience, known for her warm hugs, 
                    homemade cookies, and stories that always had a lesson hidden within.
                  </p>
                </div>

                {/* Memory Categories */}
                <div>
                  <h4 className="font-medium text-[#3A4B39] mb-3">Memory Categories</h4>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-[#E6B8A2]/30 text-[#B8952F] text-sm rounded-full">
                      Cooking & Recipes
                    </span>
                    <span className="px-3 py-1 bg-[#7A8A76]/20 text-[#5A6B59] text-sm rounded-full">
                      Family Stories
                    </span>
                    <span className="px-3 py-1 bg-[#B8952F]/20 text-[#8B7424] text-sm rounded-full">
                      Life Wisdom
                    </span>
                    <span className="px-3 py-1 bg-[#E6B8A2]/20 text-[#B8952F] text-sm rounded-full">
                      Holiday Traditions
                    </span>
                  </div>
                </div>

                {/* Memory Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-[#B8952F]">47</div>
                    <div className="text-xs text-[#7A8A76]">Conversations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-[#7A8A76]">12h</div>
                    <div className="text-xs text-[#7A8A76]">Recorded</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-semibold text-[#E6B8A2]">156</div>
                    <div className="text-xs text-[#7A8A76]">Stories</div>
                  </div>
                </div>

                <Button variant="primary" className="w-full" leftIcon={<MicIcon />}>
                  Start New Conversation
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Chat Interface Section */}
        <section>
          <h2 className="text-2xl font-medium text-[#3A4B39] mb-6">Chat Interface</h2>
          
          <Card variant="chat" animate="breathe">
            <CardContent className="p-6 space-y-4">
              {/* Chat Messages */}
              <div className="space-y-4 max-h-64 overflow-y-auto">
                <div className="flex gap-3">
                  <Avatar variant="chat" size="sm" fallback="You" />
                  <Glass intensity="light" className="flex-1 p-3 rounded-xl">
                    <p className="text-[#3A4B39]">Tell me about your favorite childhood memory with Dad.</p>
                  </Glass>
                </div>
                
                <div className="flex gap-3">
                  <Avatar variant="chat" size="sm" fallback="GR" animation="shimmer" />
                  <Glass intensity="medium" className="flex-1 p-3 rounded-xl">
                    <p className="text-[#3A4B39]">
                      Oh honey, I remember when your father was just seven years old. 
                      We had this old oak tree in our backyard, and he would spend hours 
                      building little forts underneath it...
                    </p>
                  </Glass>
                </div>

                <div className="flex gap-3">
                  <Avatar variant="chat" size="sm" fallback="You" />
                  <Glass intensity="light" className="flex-1 p-3 rounded-xl">
                    <p className="text-[#3A4B39]">That sounds wonderful! What did he like to do in those forts?</p>
                  </Glass>
                </div>
              </div>

              {/* Chat Input */}
              <div className="flex gap-3 items-end pt-4 border-t border-[#7A8A76]/20">
                <Input 
                  variant="chat" 
                  placeholder="Type your message or question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1"
                />
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" leftIcon={<MicIcon />}>
                    Voice
                  </Button>
                  <Button variant="primary" size="sm" leftIcon={<SendIcon />}>
                    Send
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Button Variations */}
        <section>
          <h2 className="text-2xl font-medium text-[#3A4B39] mb-6">Button Library</h2>
          <Glass animate="breathe" intensity="medium" className="p-6 rounded-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-3">
                <h4 className="font-medium text-[#5A6B59] text-sm">Primary Actions</h4>
                <div className="space-y-2">
                  <Button variant="primary" size="lg" className="w-full">Large Primary</Button>
                  <Button variant="primary" size="md" className="w-full">Medium Primary</Button>
                  <Button variant="primary" size="sm" className="w-full">Small Primary</Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-[#5A6B59] text-sm">Secondary</h4>
                <div className="space-y-2">
                  <Button variant="secondary" size="lg" className="w-full">Large Secondary</Button>
                  <Button variant="secondary" size="md" className="w-full">Medium Secondary</Button>
                  <Button variant="secondary" size="sm" className="w-full">Small Secondary</Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-[#5A6B59] text-sm">Outline & Ghost</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="md" className="w-full">Outline</Button>
                  <Button variant="ghost" size="md" className="w-full">Ghost</Button>
                  <Button variant="outline" size="md" leftIcon={<UserIcon />} className="w-full">With Icon</Button>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium text-[#5A6B59] text-sm">Voice Controls</h4>
                <div className="space-y-2 flex flex-col items-center">
                  <Button variant="voicePrimary" size="voice">🎤</Button>
                  <Button variant="voiceSecondary" size="voice">⏸️</Button>
                  <Button variant="voiceSecondary" size="voice">⏹️</Button>
                </div>
              </div>
            </div>
          </Glass>
        </section>

        {/* Input Variations */}
        <section>
          <h2 className="text-2xl font-medium text-[#3A4B39] mb-6">Input Components</h2>
          <Glass animate="breathe" intensity="medium" className="p-6 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-[#5A6B59]">Standard Inputs</h4>
                <div className="space-y-3">
                  <Input variant="default" placeholder="Default input style" />
                  <Input variant="glass" placeholder="Glass input with blur effect" />
                  <Input variant="chat" placeholder="Chat-optimized input" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-[#5A6B59]">With Icons</h4>
                <div className="space-y-3">
                  <Input variant="glass" placeholder="Search memories..." leftIcon={<SearchIcon />} />
                  <Input variant="chat" placeholder="Type a message..." rightIcon={<SendIcon />} />
                  <Input variant="default" placeholder="Find by person..." leftIcon={<UserIcon />} />
                </div>
              </div>
            </div>
          </Glass>
        </section>

        {/* Footer */}
        <Glass animate="breathe" intensity="light" className="p-6 rounded-2xl text-center">
          <p className="text-[#7A8A76]">
            Built with 💝 for preserving precious family memories • Gentle Memories Design System v1.0
          </p>
        </Glass>
      </div>
    </div>
  );
}