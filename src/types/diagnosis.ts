export interface DiagnosisInput {
  taskDescription: string
  jobRole: string
  frequency: 'daily' | 'weekly' | 'monthly'
}

export interface RecommendedTool {
  name: string
  category: string
  reason: string
  url?: string
}

export interface DiagnosisReport {
  summary: string
  recommendedTools: RecommendedTool[]
  timeSavingHoursPerMonth: number
  automationFlow: string[]
  coachComment: string
  rawMarkdown: string
  createdAt: string
}
