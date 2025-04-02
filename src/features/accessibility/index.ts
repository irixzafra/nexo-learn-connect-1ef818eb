
// Export all accessibility related components and hooks
export { AccessibilityRoadmap } from './components/AccessibilityRoadmap';
export { useAccessibilityIssueTracker } from '../admin/accessibility/hooks/useAccessibilityIssueTracker';
export type { 
  AccessibilityIssue, 
  AccessibilityIssueType,
  AccessibilityIssueStatus,
  AccessibilityIssuePriority,
  AccessibilityIssueReporter,
  AccessibilityIssueComment
} from '../admin/accessibility/hooks/useAccessibilityIssueTracker';
