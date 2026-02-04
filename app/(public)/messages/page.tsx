'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Mail, MailOpen, ChevronRight, ArrowLeft } from 'lucide-react'
import { messages } from '@/lib/mock-data'
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

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  // Filter messages for the current member (demo: showing all messages)
  const memberMessages = messages

  if (selectedMessage) {
    return (
      <div className="py-12 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            className="mb-6"
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
                  <p className="mt-2 text-sm text-muted-foreground">
                    From: <span className="text-foreground">{selectedMessage.senderName}</span>
                    <Badge variant="secondary" className="ml-2 capitalize">
                      {selectedMessage.senderRole}
                    </Badge>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    To: {selectedMessage.recipientName}
                  </p>
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
      </div>
    )
  }

  return (
    <div className="py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Messages
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Stay connected with your coaches and receive important updates.
          </p>
        </div>

        {/* Messages List */}
        <div className="mt-12 space-y-4">
          {memberMessages.length === 0 ? (
            <Card className="border-border bg-card">
              <CardContent className="py-12 text-center">
                <Mail className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">No messages yet</h3>
                <p className="mt-2 text-muted-foreground">
                  Messages from your coaches will appear here.
                </p>
              </CardContent>
            </Card>
          ) : (
            memberMessages.map((message) => (
              <Card
                key={message.id}
                className={cn(
                  'cursor-pointer border-border bg-card transition-colors hover:bg-secondary',
                  !message.isRead && 'border-l-4 border-l-primary'
                )}
                onClick={() => setSelectedMessage(message)}
              >
                <CardContent className="flex items-center gap-4 py-4">
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
                      From {message.senderName} ({message.senderRole})
                    </p>
                  </div>
                  <div className="flex flex-shrink-0 items-center gap-2 text-sm text-muted-foreground">
                    <span className="hidden sm:inline">{formatDate(message.createdAt)}</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
