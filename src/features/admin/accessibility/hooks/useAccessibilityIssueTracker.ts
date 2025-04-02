
import { useState, useEffect } from 'react';
import { useUserPreferences } from '@/hooks/useUserPreferences';

export type AccessibilityIssueType = 
  | 'contrast' 
  | 'keyboard' 
  | 'screenReader' 
  | 'motion' 
  | 'focus' 
  | 'textSize' 
  | 'other';

export type AccessibilityIssueStatus = 
  | 'open' 
  | 'in-progress' 
  | 'resolved' 
  | 'wont-fix' 
  | 'duplicate';

export type AccessibilityIssueReporter = 
  | 'user' 
  | 'automated' 
  | 'staff';

export type AccessibilityIssuePriority = 
  | 'critical' 
  | 'high' 
  | 'medium' 
  | 'low';

export interface AccessibilityIssue {
  id: string;
  title: string;
  description: string;
  type: AccessibilityIssueType;
  status: AccessibilityIssueStatus;
  priority: AccessibilityIssuePriority;
  reporter: AccessibilityIssueReporter;
  dateReported: string;
  dateUpdated?: string;
  dateResolved?: string;
  affectedPages?: string[];
  wcagCriteria?: string[];
  comments?: AccessibilityIssueComment[];
  assignedTo?: string;
}

export interface AccessibilityIssueComment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
}

// Mock data for demonstration purposes
const mockIssues: AccessibilityIssue[] = [
  {
    id: 'AI-001',
    title: 'Low contrast in chart legends',
    description: 'The chart legends in analytics dashboards have insufficient contrast ratio.',
    type: 'contrast',
    status: 'open',
    priority: 'high',
    reporter: 'user',
    dateReported: '2023-04-15T10:30:00Z',
    dateUpdated: '2023-04-16T14:22:00Z',
    affectedPages: ['/admin/analytics', '/admin/dashboard'],
    wcagCriteria: ['1.4.3'],
    comments: [
      {
        id: 'c1',
        userId: 'u123',
        userName: 'Maria García',
        content: 'This is affecting multiple users with vision impairments.',
        timestamp: '2023-04-15T14:35:00Z'
      }
    ]
  },
  {
    id: 'AI-002',
    title: 'Modal dialogs not keyboard accessible',
    description: 'Users cannot dismiss modal dialogs using the ESC key.',
    type: 'keyboard',
    status: 'in-progress',
    priority: 'critical',
    reporter: 'staff',
    dateReported: '2023-04-10T09:15:00Z',
    dateUpdated: '2023-04-17T11:42:00Z',
    assignedTo: 'dev-team-a',
    affectedPages: ['/courses', '/settings', '/admin/users'],
    wcagCriteria: ['2.1.2'],
  },
  {
    id: 'AI-003',
    title: 'Missing alt text on course images',
    description: 'Course thumbnail images are missing alternative text.',
    type: 'screenReader',
    status: 'resolved',
    priority: 'high',
    reporter: 'automated',
    dateReported: '2023-03-28T16:20:00Z',
    dateUpdated: '2023-04-05T13:10:00Z',
    dateResolved: '2023-04-05T13:10:00Z',
    affectedPages: ['/courses', '/courses/featured'],
    wcagCriteria: ['1.1.1'],
  },
  {
    id: 'AI-004',
    title: 'Autoplaying videos causing discomfort',
    description: 'Videos autoplay on course pages and cannot be disabled.',
    type: 'motion',
    status: 'open',
    priority: 'medium',
    reporter: 'user',
    dateReported: '2023-04-18T08:45:00Z',
    affectedPages: ['/courses/1234', '/courses/5678'],
    wcagCriteria: ['2.2.2'],
  },
  {
    id: 'AI-005',
    title: 'Focus not visible on interactive elements',
    description: 'Focus indicators are not visible on buttons and form controls.',
    type: 'focus',
    status: 'in-progress',
    priority: 'high',
    reporter: 'staff',
    dateReported: '2023-04-12T11:30:00Z',
    dateUpdated: '2023-04-14T15:20:00Z',
    assignedTo: 'ui-team',
    affectedPages: ['global'],
    wcagCriteria: ['2.4.7'],
  }
];

export const useAccessibilityIssueTracker = () => {
  const [issues, setIssues] = useState<AccessibilityIssue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { preferences } = useUserPreferences();
  
  useEffect(() => {
    // Simulate API call to load issues
    const loadIssues = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would be a fetch call to an API
        // await fetch('/api/accessibility/issues')
        
        // For demo purposes, we'll simulate a network delay and return mock data
        await new Promise(resolve => setTimeout(resolve, 800));
        setIssues(mockIssues);
      } catch (error) {
        console.error('Error loading accessibility issues:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadIssues();
  }, []);
  
  const addIssue = async (newIssue: Omit<AccessibilityIssue, 'id' | 'dateReported'>) => {
    try {
      // In a real implementation, this would post to an API
      // const response = await fetch('/api/accessibility/issues', { method: 'POST', body: JSON.stringify(newIssue) })
      
      // For demo purposes, we'll simulate and add to local state
      const issueToAdd: AccessibilityIssue = {
        ...newIssue,
        id: `AI-${(issues.length + 1).toString().padStart(3, '0')}`,
        dateReported: new Date().toISOString(),
      };
      
      setIssues(prev => [...prev, issueToAdd]);
      return true;
    } catch (error) {
      console.error('Error adding accessibility issue:', error);
      return false;
    }
  };
  
  const updateIssue = async (id: string, updates: Partial<AccessibilityIssue>) => {
    try {
      // In a real implementation, this would be a PUT/PATCH to an API
      // await fetch(`/api/accessibility/issues/${id}`, { method: 'PATCH', body: JSON.stringify(updates) })
      
      // For demo purposes, update local state
      setIssues(prev => 
        prev.map(issue => 
          issue.id === id 
            ? { 
                ...issue, 
                ...updates, 
                dateUpdated: new Date().toISOString(),
                ...(updates.status === 'resolved' ? { dateResolved: new Date().toISOString() } : {})
              } 
            : issue
        )
      );
      return true;
    } catch (error) {
      console.error('Error updating accessibility issue:', error);
      return false;
    }
  };
  
  const addComment = async (issueId: string, content: string) => {
    try {
      // Mock user data - in a real app would come from auth context
      const userId = 'current-user';
      const userName = preferences?.name || 'Current User';
      
      const newComment: AccessibilityIssueComment = {
        id: `comment-${Date.now()}`,
        userId,
        userName,
        content,
        timestamp: new Date().toISOString()
      };
      
      // In a real implementation, this would be a POST to an API
      // await fetch(`/api/accessibility/issues/${issueId}/comments`, { method: 'POST', body: JSON.stringify({ content }) })
      
      // For demo purposes, update local state
      setIssues(prev => 
        prev.map(issue => 
          issue.id === issueId 
            ? { 
                ...issue, 
                comments: [...(issue.comments || []), newComment],
                dateUpdated: new Date().toISOString() 
              } 
            : issue
        )
      );
      return true;
    } catch (error) {
      console.error('Error adding comment to accessibility issue:', error);
      return false;
    }
  };
  
  return {
    issues,
    isLoading,
    addIssue,
    updateIssue,
    addComment,
    // Filter helpers
    openIssues: issues.filter(issue => issue.status === 'open' || issue.status === 'in-progress'),
    resolvedIssues: issues.filter(issue => issue.status === 'resolved'),
    byPriority: (priority: AccessibilityIssuePriority) => issues.filter(issue => issue.priority === priority),
    byType: (type: AccessibilityIssueType) => issues.filter(issue => issue.type === type)
  };
};
