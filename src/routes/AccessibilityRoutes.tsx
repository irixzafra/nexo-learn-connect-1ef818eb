
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AccessibilityPage from '@/pages/accessibility/AccessibilityPage';
import AccessibilityRoadmapPage from '@/pages/accessibility/RoadmapPage';
import PlaceholderPage from '@/pages/placeholder/PlaceholderPage';
import { useFeature } from '@/hooks/useFeature';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocalization } from '@/hooks/useLocalization';
import SafeLink from '@/components/SafeLink';

const AccessibilityRoutes: React.FC = () => {
  const enableAccessibility = useFeature('enableAccessibility');
  const enableAdvancedAccessibility = useFeature('enableAdvancedAccessibility');
  const { t } = useLocalization();

  if (!enableAccessibility) {
    return (
      <Routes>
        <Route path="/*" element={
          <div className="container mx-auto py-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500" />
                  <CardTitle>{t('accessibility.feature.disabled', { default: 'Accessibility Features Disabled' })}</CardTitle>
                </div>
                <CardDescription>
                  {t('accessibility.feature.needsEnabled', { 
                    default: 'Accessibility features are currently disabled in the system settings.' 
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-muted-foreground">
                  {t('accessibility.feature.enableInstructions', { 
                    default: 'To enable accessibility features, please go to Settings > Features and enable the "Accessibility" toggle.' 
                  })}
                </p>
                <SafeLink to="/admin/settings/features">
                  <Button variant="default">
                    {t('accessibility.feature.goToSettings', { default: 'Go to Settings' })}
                  </Button>
                </SafeLink>
              </CardContent>
            </Card>
          </div>
        } />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<AccessibilityPage />} />
      <Route path="/roadmap" element={<AccessibilityRoadmapPage />} />
      
      {/* Visual accessibility features */}
      <Route path="/visual" element={
        <PlaceholderPage 
          title={t('accessibility.pages.visual.title', { default: 'Visual Accessibility' })}
          subtitle={t('accessibility.pages.visual.subtitle', { default: 'Settings for visual accessibility features' })}
        />
      } />
      
      {/* Keyboard accessibility features */}
      <Route path="/keyboard" element={
        <PlaceholderPage 
          title={t('accessibility.pages.keyboard.title', { default: 'Keyboard Accessibility' })}
          subtitle={t('accessibility.pages.keyboard.subtitle', { default: 'Settings for keyboard accessibility features' })}
        />
      } />
      
      {/* Content accessibility features */}
      <Route path="/content" element={
        <PlaceholderPage 
          title={t('accessibility.pages.content.title', { default: 'Content Accessibility' })}
          subtitle={t('accessibility.pages.content.subtitle', { default: 'Settings for content accessibility features' })}
        />
      } />
      
      {/* Performance accessibility features */}
      <Route path="/performance" element={
        <PlaceholderPage 
          title={t('accessibility.pages.performance.title', { default: 'Performance Accessibility' })}
          subtitle={t('accessibility.pages.performance.subtitle', { default: 'Settings for performance accessibility features' })}
        />
      } />
      
      {/* Analytics for accessibility usage */}
      <Route path="/analytics" element={
        enableAdvancedAccessibility ? (
          <PlaceholderPage 
            title={t('accessibility.pages.analytics.title', { default: 'Accessibility Analytics' })}
            subtitle={t('accessibility.pages.analytics.subtitle', { default: 'Usage analytics for accessibility features' })}
          />
        ) : (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <CardTitle>{t('accessibility.feature.advancedDisabled', { default: 'Advanced Accessibility Disabled' })}</CardTitle>
              </div>
              <CardDescription>
                {t('accessibility.feature.advancedNeeded', { 
                  default: 'Advanced accessibility features are required to access analytics.' 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
                {t('accessibility.feature.enableAdvancedInstructions', { 
                  default: 'To enable advanced accessibility features, please go to Settings > Features and enable the "Advanced Accessibility" toggle.' 
                })}
              </p>
              <SafeLink to="/admin/settings/features">
                <Button variant="default">
                  {t('accessibility.feature.goToSettings', { default: 'Go to Settings' })}
                </Button>
              </SafeLink>
            </CardContent>
          </Card>
        )
      } />
      
      {/* Fallback for unknown routes */}
      <Route path="*" element={
        <PlaceholderPage 
          title={t('common.notFound', { default: 'Page Not Found' })}
          subtitle={t('common.notFoundMessage', { default: 'The page you are looking for does not exist.' })}
        />
      } />
    </Routes>
  );
};

export default AccessibilityRoutes;
