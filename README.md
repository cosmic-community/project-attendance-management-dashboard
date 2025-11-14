# Project & Attendance Management Dashboard

![App Preview](https://imgix.cosmicjs.com/fc860f40-c11a-11f0-9757-a1b2350abfc3-photo-1460925895917-afdab827c52f-1763098196972.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive project management and attendance tracking dashboard built with Next.js 16 and Cosmic CMS. This application provides real-time visibility into project progress, task management, team attendance, and client relationships.

## Features

- 📊 **Dashboard Analytics** - Real-time overview of projects, tasks, team members, and attendance metrics
- 📋 **Project Management** - Create, view, and manage projects with client associations and status tracking
- ✅ **Task Tracking** - Organize tasks by project with priority levels, status updates, and team assignments
- ⏰ **Attendance System** - Track team member check-ins, check-outs, and daily attendance records
- 👥 **Team Management** - Manage team member profiles with roles and contact information
- 🏢 **Client Portal** - Store and manage client information with company details and logos
- 🔄 **Real-time Updates** - Instant content updates through Cosmic CMS
- 📱 **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI** - Clean, professional interface with Tailwind CSS

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6916bb26e7349beda291c488&clone_repository=6916c00fe7349beda291c523)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Objective: Generate a full-stack Project Management and Attendance Tracking web application for a software company.
> 
> Technology Stack:
> 
> Backend: C# with .NET 8, Entity Framework Core 8, and a RESTful API.
> 
> Database: PostgreSQL (preferred) or SQL Server.
> 
> Frontend: React 18+ with Normal JS.
> 
> Authentication: JWT (JSON Web Tokens) for stateless authentication.
> 
> UI (Frontend): TailwindCSS and Shadcn/UI for modern, responsive components.
> 
> Routing (Frontend): react-router-dom.
> 
> Frontend Design & Animation (UI/UX) -
> 
> 1.Layout & Page Transitions:
> Page Transitions: Wrap the main <Routes> component in AnimatePresence from Framer Motion. Every page component (Dashboard.tsx, ProjectsPage.tsx, etc.) should be a motion.div. On route change, the outgoing page should exit with opacity: 0 and the incoming page should animate in with opacity: 1 and y: 0 from an initial state of y: 20.
> 
> Sidebar Animation: The main sidebar (in Layout.tsx) should be collapsible. When the user clicks the toggle, animate the width of the sidebar smoothly. The navigation links' text should fade out as it collapses, leaving only the icons.
> 
> 2.Key Feature Animations (The "Vibe"):
> 
> Attendance Check-In: This is the most important daily interaction.
> 
> On the DashboardPage or AttendancePage, the "Check In" button should be large and have a subtle, infinite pulse animation (animate={{ scale: [1, 1.02, 1] }}) to draw the user's eye.
> 
> When clicked, the button should provide immediate haptic feedback (e.g., whileTap={{ scale: 0.95 }}).
> 
> Upon a successful API response, use AnimatePresence with mode="wait" to animate the button out (e.g., fade out and scale down) and animate the "Checked-In" status in (e.g., fade in and scale up), showing the check-in time and the new "Check Out" button.
> 
> -Task Completion: When a user drags a task to the "Done" column on the Kanban board or clicks a 'complete' checkbox:
> Animate a strikethrough across the task title.
> Briefly run a "confetti" animation (using a library like canvas-confetti) triggered from the position of the completed task card.
> 
> Data Display & Interaction:
> 
> -Kanban Board (ProjectDetailPage):
> All task cards should be motion.div components with the drag prop enabled.
> Enable dragConstraints so tasks can only be dragged within the main board area.
> Use the Reorder components (Reorder.group and Reorder.item) from Framer Motion to allow for smooth reordering of tasks within a column.
> When a task is dropped into a new column, it should automatically animate to its new position in that list (using layout prop).
> 
> -List Staggering:
> When loading any list of data (e.g., ProjectsPage, ClientsPage, Tasks list), wrap the list in a motion.ul and each item in a motion.li.
> Apply a staggerChildren variant to the parent container (motion.ul) so that each list item animates in (e.g., fades and slides up) one after another, creating a "cascading" effect.
> 
> Micro-Interactions & Feedback:
> -Buttons & Modals:
> All primary and secondary buttons (Shadcn/UI) should have a whileHover={{ scale: 1.03 }} and whileTap={{ scale: 0.97 }} animation.
> When any modal ("New Task," "Log Work") opens, use AnimatePresence. The modal overlay (backdrop) should fade in. The modal panel itself should scale in and fade in (initial={{ scale: 0.9, opacity: 0 }}).
> 
> -Loading States:
> When a form is submitted (e.g., Login, New Project), disable the "Submit" button and replace its text content with an animated spinner (e.g., a motion.svg icon with a repeating rotate: 360 animation).
> 
> -Reports & Charts:
> When generating a report, display a "skeleton" version of the chart or report table. These skeleton loaders should have a shimmering/pulsing animation created with a CSS ::before pseudo-element and a linear-gradient background."

### Code Generation Prompt

> "Create a React dashboard that displays and manages my existing content"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **CMS**: Cosmic
- **Styling**: Tailwind CSS
- **Package Manager**: Bun
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account with your content configured

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file in the root directory with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Projects with Client Data

```typescript
import { cosmic } from '@/lib/cosmic'

export async function getProjects() {
  try {
    const { objects: projects } = await cosmic.objects
      .find({ type: 'projects' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1) // Includes connected client data
    
    return projects as Project[]
  } catch (error) {
    if (error.status === 404) {
      return []
    }
    throw new Error('Failed to fetch projects')
  }
}
```

### Creating a New Task

```typescript
export async function createTask(data: CreateTaskData) {
  try {
    const response = await cosmic.objects.insertOne({
      type: 'tasks',
      title: data.title,
      metadata: {
        task_title: data.title,
        description: data.description || '',
        project: data.projectId, // Object ID reference
        assigned_to: data.assignedToId, // Object ID reference
        status: data.status, // 'todo', 'in-progress', or 'done'
        priority: data.priority, // 'low', 'medium', or 'high'
        due_date: data.dueDate || ''
      }
    })
    
    return response.object as Task
  } catch (error) {
    throw new Error('Failed to create task')
  }
}
```

### Updating Attendance Status

```typescript
export async function updateAttendanceStatus(
  recordId: string, 
  status: 'checked-in' | 'checked-out' | 'absent'
) {
  try {
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
    
    const updateData: any = { metadata: { status } }
    
    if (status === 'checked-in') {
      updateData.metadata.check_in_time = currentTime
    } else if (status === 'checked-out') {
      updateData.metadata.check_out_time = currentTime
    }
    
    const response = await cosmic.objects.updateOne(recordId, updateData)
    return response.object as AttendanceRecord
  } catch (error) {
    throw new Error('Failed to update attendance status')
  }
}
```

## Cosmic CMS Integration

This application uses Cosmic as a headless CMS with the following object types:

### Projects
- **project_name**: Text (required)
- **description**: Textarea
- **client**: Object relationship to Clients
- **status**: Select dropdown (Active, On Hold, Completed)
- **start_date**: Date
- **end_date**: Date

### Tasks
- **task_title**: Text (required)
- **description**: Textarea
- **project**: Object relationship to Projects (required)
- **assigned_to**: Object relationship to Team Members
- **status**: Select dropdown (To Do, In Progress, Done)
- **priority**: Select dropdown (Low, Medium, High)
- **due_date**: Date

### Team Members
- **full_name**: Text (required)
- **email**: Text with email validation (required)
- **role**: Select dropdown (Developer, Designer, Project Manager, QA Engineer)
- **avatar**: File (image)
- **active**: Switch (true/false)

### Attendance Records
- **team_member**: Object relationship to Team Members (required)
- **work_date**: Date (required)
- **check_in_time**: Text
- **check_out_time**: Text
- **status**: Select dropdown (Checked In, Checked Out, Absent)
- **notes**: Textarea

### Clients
- **company_name**: Text (required)
- **contact_person**: Text
- **email**: Text with email validation
- **phone**: Text
- **company_logo**: File (image)

## Deployment

### Deploy to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)

2. Import your repository to Vercel:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository

3. Configure environment variables in Vercel:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`

4. Deploy! Vercel will automatically build and deploy your application.

### Environment Variables

Make sure to set these environment variables in your deployment platform:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

<!-- README_END -->