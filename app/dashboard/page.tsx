import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Calendar, Package, DollarSign, TrendingUp, TrendingDown } from 'lucide-react'
import { members, gymClasses, products, messages } from '@/lib/mock-data'

const stats = [
  {
    title: 'Total Members',
    value: members.length.toString(),
    change: '+12%',
    trend: 'up',
    icon: Users,
    description: 'vs last month',
  },
  {
    title: 'Active Classes',
    value: gymClasses.length.toString(),
    change: '+3',
    trend: 'up',
    icon: Calendar,
    description: 'new this week',
  },
  {
    title: 'Products',
    value: products.length.toString(),
    change: '2',
    trend: 'neutral',
    icon: Package,
    description: 'low stock alerts',
  },
  {
    title: 'Revenue',
    value: '$12,450',
    change: '+8%',
    trend: 'up',
    icon: DollarSign,
    description: 'vs last month',
  },
]

export default function DashboardPage() {
  const activeMembers = members.filter(m => m.subscriptionStatus === 'active')
  const pendingMembers = members.filter(m => m.subscriptionStatus === 'pending')
  const expiredMembers = members.filter(m => m.subscriptionStatus === 'expired')
  const unreadMessages = messages.filter(m => !m.isRead)

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-border bg-card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                {stat.trend === 'up' && <TrendingUp className="h-3 w-3 text-green-500" />}
                {stat.trend === 'down' && <TrendingDown className="h-3 w-3 text-red-500" />}
                <span className={stat.trend === 'up' ? 'text-green-500' : stat.trend === 'down' ? 'text-red-500' : ''}>
                  {stat.change}
                </span>
                <span>{stat.description}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Members Overview */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Members Overview</CardTitle>
            <CardDescription>Current membership status breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                  <span className="text-sm text-foreground">Active Members</span>
                </div>
                <span className="font-semibold text-foreground">{activeMembers.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-yellow-500" />
                  <span className="text-sm text-foreground">Pending Members</span>
                </div>
                <span className="font-semibold text-foreground">{pendingMembers.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-red-500" />
                  <span className="text-sm text-foreground">Expired Members</span>
                </div>
                <span className="font-semibold text-foreground">{expiredMembers.length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Activity</CardTitle>
            <CardDescription>Latest updates and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">New member registration</p>
                  <p className="text-xs text-muted-foreground">Emma Wilson joined as monthly member</p>
                </div>
                <span className="text-xs text-muted-foreground">2h ago</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">Class booking</p>
                  <p className="text-xs text-muted-foreground">HIIT Burn class is now full</p>
                </div>
                <span className="text-xs text-muted-foreground">4h ago</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/10">
                  <Package className="h-4 w-4 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">Low stock alert</p>
                  <p className="text-xs text-muted-foreground">Pre-Workout Ignite running low</p>
                </div>
                <span className="text-xs text-muted-foreground">1d ago</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Classes */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Upcoming Classes</CardTitle>
            <CardDescription>Classes scheduled for today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {gymClasses.slice(0, 4).map((cls) => (
                <div key={cls.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">{cls.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {cls.startTime} - {cls.endTime} | {cls.coachName}
                    </p>
                  </div>
                  <Badge
                    variant="secondary"
                    className={
                      cls.currentEnrollment >= cls.maxCapacity
                        ? 'bg-red-500/10 text-red-500'
                        : cls.currentEnrollment >= cls.maxCapacity - 3
                        ? 'bg-yellow-500/10 text-yellow-500'
                        : 'bg-green-500/10 text-green-500'
                    }
                  >
                    {cls.currentEnrollment}/{cls.maxCapacity}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Unread Messages */}
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Unread Messages</CardTitle>
            <CardDescription>{unreadMessages.length} messages need attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {unreadMessages.length === 0 ? (
                <p className="text-sm text-muted-foreground">No unread messages</p>
              ) : (
                unreadMessages.slice(0, 3).map((msg) => (
                  <div key={msg.id} className="flex items-start gap-3">
                    <div className="h-2 w-2 mt-2 rounded-full bg-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{msg.subject}</p>
                      <p className="text-xs text-muted-foreground">
                        From {msg.senderName} to {msg.recipientName}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
