'use client'

import { useState } from 'react'
import { Send, Mail, MailOpen, ChevronRight, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { messages as initialMessages, members, currentUser } from '@/lib/mock-data'
import type { Message } from '@/lib/types'
import { cn } from '@/lib/utils'

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

export default function MessagesAdminPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [isComposeOpen, setIsComposeOpen] = useState(false)

  // Compose form state
  const [formData, setFormData] = useState({
    recipientId: '',
    subject: '',
    content: '',
  })

  const unreadCount = messages.filter((m) => !m.isRead).length

  const handleSendMessage = () => {
    const recipient = members.find((m) => m.id === formData.recipientId)
    if (!recipient) return

    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.fullName,
      senderRole: currentUser.role,
      recipientId: formData.recipientId,
      recipientName: recipient.fullName,
      subject: formData.subject,
      content: formData.content,
      isRead: false,
      createdAt: new Date(),
    }

    setMessages([newMessage, ...messages])
    setIsComposeOpen(false)
    setFormData({ recipientId: '', subject: '', content: '' })
  }

  const handleMarkAsRead = (messageId: string) => {
    setMessages(
      messages.map((m) =>
        m.id === messageId ? { ...m, isRead: true } : m
      )
    )
  }

  const openMessage = (message: Message) => {
    setSelectedMessage(message)
    if (!message.isRead) {
      handleMarkAsRead(message.id)
    }
  }

  if (selectedMessage) {
    return (
      <div className="space-y-6">
        <Button
          variant="ghost"
          onClick={() => setSelectedMessage(null)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Messages
        </Button>

        <Card className="border-border bg-card">
          <CardHeader className="border-b border-border">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl text-foreground">{selectedMessage.subject}</CardTitle>
                <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                  <p>
                    From: <span className="text-foreground">{selectedMessage.senderName}</span>
                    <Badge variant="secondary" className="ml-2 capitalize">
                      {selectedMessage.senderRole}
                    </Badge>
                  </p>
                  <p>
                    To: <span className="text-foreground">{selectedMessage.recipientName}</span>
                  </p>
                </div>
              </div>
              <span className="text-sm text-muted-foreground">
                {formatDate(selectedMessage.createdAt)}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="whitespace-pre-wrap text-foreground leading-relaxed">
              {selectedMessage.content}
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Messages</h2>
          <p className="text-muted-foreground">
            {unreadCount > 0 ? `${unreadCount} unread messages` : 'Communicate with members'}
          </p>
        </div>
        <Dialog open={isComposeOpen} onOpenChange={setIsComposeOpen}>
          <DialogTrigger asChild>
            <Button>
              <Send className="mr-2 h-4 w-4" />
              Compose Message
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>New Message</DialogTitle>
              <DialogDescription>
                Send a message to a gym member.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient</Label>
                <Select
                  value={formData.recipientId}
                  onValueChange={(value) => setFormData({ ...formData, recipientId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select member" />
                  </SelectTrigger>
                  <SelectContent>
                    {members.map((member) => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Message subject"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Message</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Write your message..."
                  rows={5}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleSendMessage}
                disabled={!formData.recipientId || !formData.subject || !formData.content}
              >
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Messages List */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">All Messages ({messages.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {messages.length === 0 ? (
              <div className="py-12 text-center">
                <Mail className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">No messages yet</h3>
                <p className="mt-2 text-muted-foreground">
                  Start by composing a new message to a member.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex cursor-pointer items-center gap-4 p-4 transition-colors hover:bg-secondary',
                    !message.isRead && 'bg-primary/5'
                  )}
                  onClick={() => openMessage(message)}
                >
                  <div className="flex-shrink-0">
                    {message.isRead ? (
                      <MailOpen className="h-5 w-5 text-muted-foreground" />
                    ) : (
                      <Mail className="h-5 w-5 text-primary" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className={cn(
                        'truncate text-foreground',
                        !message.isRead && 'font-semibold'
                      )}>
                        {message.subject}
                      </h3>
                      {!message.isRead && (
                        <Badge className="bg-primary text-primary-foreground">New</Badge>
                      )}
                    </div>
                    <p className="mt-1 truncate text-sm text-muted-foreground">
                      {message.senderId === currentUser.id
                        ? `To: ${message.recipientName}`
                        : `From: ${message.senderName} (${message.senderRole})`}
                    </p>
                    <p className="mt-1 truncate text-sm text-muted-foreground">
                      {message.content.substring(0, 100)}...
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-2 text-sm text-muted-foreground">
                    <span className="hidden sm:inline">{formatDate(message.createdAt)}</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
