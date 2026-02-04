// User Roles
export type UserRole = 'admin' | 'coach' | 'reception' | 'member'

export type IdType = 'passport' | 'national_id' | 'drivers_license'

export type SubscriptionStatus = 'active' | 'expired' | 'pending' | 'cancelled'

export type SubscriptionType = 'monthly' | 'quarterly' | 'yearly' | 'day_pass'

// User
export interface User {
  id: string
  email: string
  fullName: string
  role: UserRole
  avatarUrl?: string
  createdAt: Date
  updatedAt: Date
}

// Member
export interface Member {
  id: string
  fullName: string
  email: string
  phone?: string
  address?: string
  postalCode?: string
  idNumber: string
  idType: IdType
  subscriptionStatus: SubscriptionStatus
  subscriptionType: SubscriptionType
  amountToPayCents: number
  startDate: Date
  endDate?: Date
  ownerId: string
  createdAt: Date
  updatedAt: Date
}

// Coach
export interface Coach {
  id: string
  userId: string
  fullName: string
  email: string
  bio: string
  specializations: string[]
  avatarUrl?: string
  rating: number
  yearsExperience: number
  createdAt: Date
  updatedAt: Date
}

// Class
export interface GymClass {
  id: string
  name: string
  description: string
  coachId: string
  coachName: string
  dayOfWeek: string
  startTime: string
  endTime: string
  maxCapacity: number
  currentEnrollment: number
  location: string
  level: 'beginner' | 'intermediate' | 'advanced' | 'all'
  createdAt: Date
  updatedAt: Date
}

// Product
export interface Product {
  id: string
  name: string
  description: string
  priceCents: number
  category: 'protein' | 'supplements' | 'energy_drinks' | 'apparel' | 'accessories'
  imageUrl?: string
  stock: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// Message
export interface Message {
  id: string
  senderId: string
  senderName: string
  senderRole: UserRole
  recipientId: string
  recipientName: string
  subject: string
  content: string
  isRead: boolean
  createdAt: Date
}

// Class Booking
export interface ClassBooking {
  id: string
  classId: string
  memberId: string
  memberName: string
  status: 'confirmed' | 'cancelled' | 'attended'
  bookedAt: Date
}
