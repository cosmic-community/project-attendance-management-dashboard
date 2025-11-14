import { createBucketClient } from '@cosmicjs/sdk'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Simple error helper for Cosmic SDK
function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

// Projects
export async function getProjects() {
  try {
    const response = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch projects')
  }
}

export async function getProjectBySlug(slug: string) {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'projects', slug })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.object
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null
    }
    throw new Error('Failed to fetch project')
  }
}

// Tasks
export async function getTasks() {
  try {
    const response = await cosmic.objects
      .find({ type: 'tasks' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch tasks')
  }
}

export async function getTasksByProject(projectId: string) {
  try {
    const response = await cosmic.objects
      .find({ 
        type: 'tasks',
        'metadata.project': projectId
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch tasks')
  }
}

// Team Members
export async function getTeamMembers() {
  try {
    const response = await cosmic.objects
      .find({ type: 'team-members' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch team members')
  }
}

// Attendance Records
export async function getAttendanceRecords() {
  try {
    const response = await cosmic.objects
      .find({ type: 'attendance-records' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    // Manual sorting by work_date (newest first)
    return response.objects.sort((a: any, b: any) => {
      const dateA = new Date(a.metadata?.work_date || '').getTime()
      const dateB = new Date(b.metadata?.work_date || '').getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch attendance records')
  }
}

export async function getTodayAttendance() {
  try {
    const today = new Date().toISOString().split('T')[0]
    const response = await cosmic.objects
      .find({ 
        type: 'attendance-records',
        'metadata.work_date': today
      })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch today attendance')
  }
}

// Clients
export async function getClients() {
  try {
    const response = await cosmic.objects
      .find({ type: 'clients' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    
    return response.objects
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch clients')
  }
}