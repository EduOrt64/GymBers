'use client'

import { useState } from 'react'
import { Plus, Search, Edit, Trash2, MoreHorizontal, Clock, MapPin, Users } from 'lucide-react'
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { gymClasses as initialClasses, coaches } from '@/lib/mock-data'
import type { GymClass } from '@/lib/types'
import { cn } from '@/lib/utils'

type ClassLevel = GymClass['level']

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export default function ClassesAdminPage() {
  const [classes, setClasses] = useState<GymClass[]>(initialClasses)
  const [search, setSearch] = useState('')
  const [dayFilter, setDayFilter] = useState<string>('all')
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingClass, setEditingClass] = useState<GymClass | null>(null)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    coachId: '',
    dayOfWeek: 'Monday',
    startTime: '09:00',
    endTime: '10:00',
    maxCapacity: 20,
    location: '',
    level: 'all' as ClassLevel,
  })

  const filteredClasses = classes.filter((cls) => {
    const matchesSearch = cls.name.toLowerCase().includes(search.toLowerCase())
    const matchesDay = dayFilter === 'all' || cls.dayOfWeek === dayFilter
    return matchesSearch && matchesDay
  })

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      coachId: '',
      dayOfWeek: 'Monday',
      startTime: '09:00',
      endTime: '10:00',
      maxCapacity: 20,
      location: '',
      level: 'all',
    })
  }

  const handleAddClass = () => {
    const coach = coaches.find(c => c.id === formData.coachId)
    const newClass: GymClass = {
      id: `class-${Date.now()}`,
      ...formData,
      coachName: coach?.fullName || 'TBA',
      currentEnrollment: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setClasses([...classes, newClass])
    setIsAddDialogOpen(false)
    resetForm()
  }

  const handleEditClass = () => {
    if (!editingClass) return
    const coach = coaches.find(c => c.id === formData.coachId)
    setClasses(
      classes.map((c) =>
        c.id === editingClass.id
          ? { ...c, ...formData, coachName: coach?.fullName || c.coachName, updatedAt: new Date() }
          : c
      )
    )
    setEditingClass(null)
    resetForm()
  }

  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter((c) => c.id !== id))
  }

  const openEditDialog = (gymClass: GymClass) => {
    const coach = coaches.find(c => c.fullName === gymClass.coachName)
    setFormData({
      name: gymClass.name,
      description: gymClass.description,
      coachId: coach?.id || '',
      dayOfWeek: gymClass.dayOfWeek,
      startTime: gymClass.startTime,
      endTime: gymClass.endTime,
      maxCapacity: gymClass.maxCapacity,
      location: gymClass.location,
      level: gymClass.level,
    })
    setEditingClass(gymClass)
  }

  const ClassForm = ({ onSubmit, submitLabel }: { onSubmit: () => void; submitLabel: string }) => (
    <div className="grid gap-4 py-4">
      <div className="space-y-2">
        <Label htmlFor="name">Class Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="HIIT Burn"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Class description..."
          rows={2}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="coachId">Coach</Label>
          <Select
            value={formData.coachId}
            onValueChange={(value) => setFormData({ ...formData, coachId: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select coach" />
            </SelectTrigger>
            <SelectContent>
              {coaches.map((coach) => (
                <SelectItem key={coach.id} value={coach.id}>
                  {coach.fullName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="dayOfWeek">Day</Label>
          <Select
            value={formData.dayOfWeek}
            onValueChange={(value) => setFormData({ ...formData, dayOfWeek: value })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {daysOfWeek.map((day) => (
                <SelectItem key={day} value={day}>
                  {day}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="startTime">Start Time</Label>
          <Input
            id="startTime"
            type="time"
            value={formData.startTime}
            onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endTime">End Time</Label>
          <Input
            id="endTime"
            type="time"
            value={formData.endTime}
            onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            placeholder="Studio 1"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxCapacity">Max Capacity</Label>
          <Input
            id="maxCapacity"
            type="number"
            value={formData.maxCapacity}
            onChange={(e) => setFormData({ ...formData, maxCapacity: parseInt(e.target.value) || 0 })}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="level">Level</Label>
        <Select
          value={formData.level}
          onValueChange={(value: ClassLevel) => setFormData({ ...formData, level: value })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="beginner">Beginner</SelectItem>
            <SelectItem value="intermediate">Intermediate</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={onSubmit}>
          {submitLabel}
        </Button>
      </DialogFooter>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Classes</h2>
          <p className="text-muted-foreground">Manage gym classes and schedules</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Add Class
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Class</DialogTitle>
              <DialogDescription>
                Create a new fitness class.
              </DialogDescription>
            </DialogHeader>
            <ClassForm onSubmit={handleAddClass} submitLabel="Add Class" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card className="border-border bg-card">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search classes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={dayFilter} onValueChange={setDayFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Days</SelectItem>
                {daysOfWeek.map((day) => (
                  <SelectItem key={day} value={day}>
                    {day}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Classes Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredClasses.map((cls) => {
          const spotsLeft = cls.maxCapacity - cls.currentEnrollment
          const isFull = spotsLeft === 0
          const isAlmostFull = spotsLeft <= 3

          return (
            <Card key={cls.id} className="border-border bg-card">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg text-foreground">{cls.name}</CardTitle>
                    <p className="text-sm text-primary">with {cls.coachName}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openEditDialog(cls)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => handleDeleteClass(cls.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className={cn(
                      'capitalize',
                      cls.level === 'beginner' && 'bg-green-500/10 text-green-500',
                      cls.level === 'intermediate' && 'bg-yellow-500/10 text-yellow-500',
                      cls.level === 'advanced' && 'bg-red-500/10 text-red-500',
                      cls.level === 'all' && 'bg-primary/10 text-primary'
                    )}
                  >
                    {cls.level}
                  </Badge>
                  {isFull ? (
                    <Badge variant="destructive">Full</Badge>
                  ) : isAlmostFull ? (
                    <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-500">
                      {spotsLeft} spots left
                    </Badge>
                  ) : null}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">{cls.description}</p>

                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{cls.dayOfWeek} • {cls.startTime} - {cls.endTime}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{cls.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{cls.currentEnrollment}/{cls.maxCapacity} enrolled</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredClasses.length === 0 && (
        <Card className="border-border bg-card">
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No classes found matching your filters.</p>
          </CardContent>
        </Card>
      )}

      {/* Edit Dialog */}
      <Dialog open={!!editingClass} onOpenChange={(open) => !open && setEditingClass(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
            <DialogDescription>
              Update the class information.
            </DialogDescription>
          </DialogHeader>
          <ClassForm onSubmit={handleEditClass} submitLabel="Save Changes" />
        </DialogContent>
      </Dialog>
    </div>
  )
}
