export type AgentStatus = 'active' | 'in-treatment' | 'recovered'

export type Agent = {
  id: number
  name: string
  model: string
  status: AgentStatus
  complaint: string
}

export type Ailment = {
  id: number
  name: string
  description: string
}

export type AilmentWithCount = Ailment & { agentCount: number }

export type Therapy = {
  id: number
  name: string
  description: string
  duration_minutes: number
}

export type TherapyWithAilments = Therapy & { ailments: string[] }

export type AilmentWithTherapies = AilmentWithCount & { therapies: string[] }

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled'

export type Appointment = {
  id: number
  agent_id: number
  therapist: string
  scheduled_at: string
  status: AppointmentStatus
  notes: string
  created_at: string
}

export type AppointmentWithAgent = Appointment & { agent_name: string }
