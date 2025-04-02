
import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { AccessibilityRoadmap } from '@/features/accessibility/components/AccessibilityRoadmap';
import { useLocalization } from '@/hooks/useLocalization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Lightbulb, Goal } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const AccessibilityRoadmapPage: React.FC = () => {
  const { t } = useLocalization();

  return (
    <div className="container mx-auto py-6 space-y-8">
      <PageHeader
        title={t('accessibility.roadmap.pageTitle', { default: 'Accessibility Roadmap' })}
        description={t('accessibility.roadmap.pageDescription', { 
          default: 'Our plan and timeline for implementing accessibility features and improvements.' 
        })}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Goal className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">
                {t('accessibility.roadmap.mission.title', { default: 'Our Mission' })}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-foreground/80">
              {t('accessibility.roadmap.mission.description', { 
                default: 'We are committed to creating an inclusive platform that can be used by everyone, regardless of ability or disability. We believe that accessibility is not just a feature but a fundamental aspect of good design.' 
              })}
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-500" />
              <CardTitle className="text-lg">
                {t('accessibility.roadmap.approach.title', { default: 'Our Approach' })}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-foreground/80">
              {t('accessibility.roadmap.approach.description', { 
                default: 'We follow WCAG 2.1 AA guidelines as our baseline and strive to exceed these standards where possible. We regularly test with assistive technologies and work with users who have disabilities.' 
              })}
            </CardDescription>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <CardTitle className="text-lg">
                {t('accessibility.roadmap.feedback.title', { default: 'We Need Your Feedback' })}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-foreground/80">
              {t('accessibility.roadmap.feedback.description', { 
                default: 'Our roadmap is guided by user feedback. If you encounter any accessibility barriers or have suggestions for improvement, please share them with our team.' 
              })}
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      
      <Separator className="my-8" />
      
      <AccessibilityRoadmap />
    </div>
  );
};

export default AccessibilityRoadmapPage;
