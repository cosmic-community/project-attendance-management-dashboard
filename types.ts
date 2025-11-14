// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
  bucket?: string
  status?: string
  published_at?: string
  thumbnail?: string
}

// Project type
export interface Project extends CosmicObject {
  type: 'projects'
  metadata: {
    project_name: string
    description?: string
    client?: Client
    status?: {
      key: 'active' | 'on-hold' | 'completed'
      value: 'Active' | 'On Hold' | 'Completed'
    }
    start_date?: string
    end_date?: string
  }
}

// Task type
export interface Task extends CosmicObject {
  type: 'tasks'
  metadata: {
    task_title: string
    description?: string
    project?: Project
    assigned_to?: TeamMember
    status?: {
      key: 'todo' | 'in-progress' | 'done'
      value: 'To Do' | 'In Progress' | 'Done'
    }
    priority?: {
      key: 'low' | 'medium' | 'high'
      value: 'Low' | 'Medium' | 'High'
    }
    due_date?: string
  }
}

// Team Member type
export interface TeamMember extends CosmicObject {
  type: 'team-members'
  metadata: {
    full_name: string
    email: string
    role?: {
      key: 'developer' | 'designer' | 'pm' | 'qa'
      value: 'Developer' | 'Designer' | 'Project Manager' | 'QA Engineer'
    }
    avatar?: {
      url: string
      imgix_url: string
    }
    active?: boolean
  }
}

// Attendance Record type
export interface AttendanceRecord extends CosmicObject {
  type: 'attendance-records'
  metadata: {
    team_member?: TeamMember
    work_date: string
    check_in_time?: string
    check_out_time?: string
    status?: {
      key: 'checked-in' | 'checked-out' | 'absent'
      value: 'Checked In' | 'Checked Out' | 'Absent'
    }
    notes?: string
  }
}

// Client type
export interface Client extends CosmicObject {
  type: 'clients'
  metadata: {
    company_name: string
    contact_person?: string
    email?: string
    phone?: string
    company_logo?: {
      url: string
      imgix_url: string
    }
  }
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
  limit?: number
  skip?: number
}

// Type guards
export function isProject(obj: CosmicObject): obj is Project {
  return obj.type === 'projects'
}

export function isTask(obj: CosmicObject): obj is Task {
  return obj.type === 'tasks'
}

export function isTeamMember(obj: CosmicObject): obj is TeamMember {
  return obj.type === 'team-members'
}

export function isAttendanceRecord(obj: CosmicObject): obj is AttendanceRecord {
  return obj.type === 'attendance-records'
}

export function isClient(obj: CosmicObject): obj is Client {
  return obj.type === 'clients'
}

// Utility types
export type ProjectStatus = 'active' | 'on-hold' | 'completed'
export type TaskStatus = 'todo' | 'in-progress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'
export type AttendanceStatus = 'checked-in' | 'checked-out' | 'absent'
export type TeamRole = 'developer' | 'designer' | 'pm' | 'qa'

// Form data types
export interface CreateProjectData {
  title: string
  project_name: string
  description?: string
  clientId?: string
  status: ProjectStatus
  start_date?: string
  end_date?: string
}

export interface CreateTaskData {
  title: string
  task_title: string
  description?: string
  projectId: string
  assignedToId?: string
  status: TaskStatus
  priority?: TaskPriority
  due_date?: string
}

export interface CreateAttendanceData {
  title: string
  teamMemberId: string
  work_date: string
  check_in_time?: string
  check_out_time?: string
  status: AttendanceStatus
  notes?: string
}

export interface CreateTeamMemberData {
  title: string
  full_name: string
  email: string
  role: TeamRole
  active?: boolean
}

export interface CreateClientData {
  title: string
  company_name: string
  contact_person?: string
  email?: string
  phone?: string
}