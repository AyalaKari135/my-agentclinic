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
