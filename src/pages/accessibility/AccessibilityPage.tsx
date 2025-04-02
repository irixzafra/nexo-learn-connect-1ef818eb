
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAccessibility } from '@/hooks/useAccessibility';
import { useLocalization } from '@/hooks/useLocalization';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/ui/page-header';
import { Eye, MousePointer2, VolumeX, Type, Monitor, Braces } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SafeLink from '@/components/SafeLink';

const AccessibilityPage: React.FC = () => {
  const { 
    isHighContrastEnabled, 
    isReducedMotionEnabled, 
    textSize,
    toggleHighContrast,
    toggleReducedMotion,
    setTextSize
  } = useAccessibility();
  
  const { t } = useLocalization();

  return (
    <div className="container mx-auto py-6">
      <PageHeader
        title={t('accessibility.title', { default: 'Accessibility Settings' })}
        description={t('accessibility.description', { 
          default: 'Customize accessibility options to make the platform work better for you.' 
        })}
        actions={
          <SafeLink to="/accessibility/roadmap">
            <Button variant="outline">
              {t('accessibility.viewRoadmap', { default: 'View Roadmap' })}
            </Button>
          </SafeLink>
        }
      />
      
      <Tabs defaultValue="visual" className="w-full mt-6">
        <TabsList className="grid grid-cols-4 w-full max-w-xl mb-6">
          <TabsTrigger value="visual" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            <span>{t('accessibility.tabs.visual', { default: 'Visual' })}</span>
          </TabsTrigger>
          <TabsTrigger value="motion" className="flex items-center gap-2">
            <MousePointer2 className="h-4 w-4" />
            <span>{t('accessibility.tabs.motion', { default: 'Motion' })}</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Type className="h-4 w-4" />
            <span>{t('accessibility.tabs.content', { default: 'Content' })}</span>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="flex items-center gap-2">
            <Braces className="h-4 w-4" />
            <span>{t('accessibility.tabs.advanced', { default: 'Advanced' })}</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="visual">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="h-5 w-5 text-primary" />
                  {t('accessibility.visual.contrast.title', { default: 'Display Settings' })}
                </CardTitle>
                <CardDescription>
                  {t('accessibility.visual.contrast.description', {
                    default: 'Adjust contrast and visual appearance'
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="high-contrast" className="flex flex-col">
                      <span>{t('accessibility.visual.contrast.highContrast', { default: 'High Contrast Mode' })}</span>
                      <span className="text-xs text-muted-foreground">
                        {t('accessibility.visual.contrast.highContrastDescription', {
                          default: 'Increases contrast for better visibility'
                        })}
                      </span>
                    </Label>
                    <Switch
                      id="high-contrast"
                      checked={isHighContrastEnabled}
                      onCheckedChange={toggleHighContrast}
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <Label htmlFor="text-size" className="flex flex-col">
                      <span>{t('accessibility.visual.textSize.title', { default: 'Text Size' })}</span>
                      <span className="text-xs text-muted-foreground">
                        {t('accessibility.visual.textSize.description', {
                          default: 'Adjust the size of text throughout the interface'
                        })}
                      </span>
                    </Label>
                    <Select
                      value={textSize}
                      onValueChange={(value) => setTextSize(value as any)}
                    >
                      <SelectTrigger id="text-size" className="w-full">
                        <SelectValue placeholder={t('accessibility.visual.textSize.select', { default: 'Select text size' })} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">
                          {t('accessibility.visual.textSize.small', { default: 'Small' })}
                        </SelectItem>
                        <SelectItem value="normal">
                          {t('accessibility.visual.textSize.normal', { default: 'Normal' })}
                        </SelectItem>
                        <SelectItem value="large">
                          {t('accessibility.visual.textSize.large', { default: 'Large' })}
                        </SelectItem>
                        <SelectItem value="x-large">
                          {t('accessibility.visual.textSize.xLarge', { default: 'Extra Large' })}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-primary" />
                  {t('accessibility.visual.focus.title', { default: 'Focus Indicators' })}
                </CardTitle>
                <CardDescription>
                  {t('accessibility.visual.focus.description', {
                    default: 'Customize how focus is displayed on screen'
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="focus-outline" className="flex flex-col">
                      <span>{t('accessibility.visual.focus.enhanced', { default: 'Enhanced Focus Indicators' })}</span>
                      <span className="text-xs text-muted-foreground">
                        {t('accessibility.visual.focus.enhancedDescription', {
                          default: 'Makes focus indicators more visible'
                        })}
                      </span>
                    </Label>
                    <Switch
                      id="focus-outline"
                      defaultChecked={false}
                    />
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-2">
                    <Label htmlFor="focus-thickness" className="flex flex-col">
                      <span>{t('accessibility.visual.focus.thickness', { default: 'Focus Outline Thickness' })}</span>
                      <span className="text-xs text-muted-foreground">
                        {t('accessibility.visual.focus.thicknessDescription', {
                          default: 'Adjust the thickness of focus outlines'
                        })}
                      </span>
                    </Label>
                    <Slider
                      id="focus-thickness"
                      defaultValue={[2]}
                      max={5}
                      step={1}
                      className="mt-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{t('accessibility.visual.focus.thin', { default: 'Thin' })}</span>
                      <span>{t('accessibility.visual.focus.thick', { default: 'Thick' })}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="motion">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MousePointer2 className="h-5 w-5 text-primary" />
                {t('accessibility.motion.title', { default: 'Motion & Animations' })}
              </CardTitle>
              <CardDescription>
                {t('accessibility.motion.description', {
                  default: 'Control motion and animations on the platform'
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="reduce-motion" className="flex flex-col">
                    <span>{t('accessibility.motion.reduceMotion', { default: 'Reduce Motion' })}</span>
                    <span className="text-xs text-muted-foreground">
                      {t('accessibility.motion.reduceMotionDescription', {
                        default: 'Minimize animations throughout the interface'
                      })}
                    </span>
                  </Label>
                  <Switch
                    id="reduce-motion"
                    checked={isReducedMotionEnabled}
                    onCheckedChange={toggleReducedMotion}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="reduce-auto-play" className="flex flex-col">
                    <span>{t('accessibility.motion.disableAutoplay', { default: 'Disable Autoplay' })}</span>
                    <span className="text-xs text-muted-foreground">
                      {t('accessibility.motion.disableAutoplayDescription', {
                        default: 'Prevent videos from playing automatically'
                      })}
                    </span>
                  </Label>
                  <Switch
                    id="reduce-auto-play"
                    defaultChecked={false}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="animation-speed" className="flex flex-col">
                    <span>{t('accessibility.motion.animationSpeed', { default: 'Animation Speed' })}</span>
                    <span className="text-xs text-muted-foreground">
                      {t('accessibility.motion.animationSpeedDescription', {
                        default: 'Adjust the speed of animations'
                      })}
                    </span>
                  </Label>
                  <Slider
                    id="animation-speed"
                    defaultValue={[100]}
                    max={200}
                    step={25}
                    disabled={isReducedMotionEnabled}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>{t('accessibility.motion.slower', { default: 'Slower' })}</span>
                    <span>{t('accessibility.motion.normal', { default: 'Normal' })}</span>
                    <span>{t('accessibility.motion.faster', { default: 'Faster' })}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="h-5 w-5 text-primary" />
                {t('accessibility.content.title', { default: 'Content Preferences' })}
              </CardTitle>
              <CardDescription>
                {t('accessibility.content.description', {
                  default: 'Customize how content is presented'
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="screen-reader" className="flex flex-col">
                    <span>{t('accessibility.content.screenReader', { default: 'Screen Reader Optimization' })}</span>
                    <span className="text-xs text-muted-foreground">
                      {t('accessibility.content.screenReaderDescription', {
                        default: 'Optimize content for screen readers'
                      })}
                    </span>
                  </Label>
                  <Switch
                    id="screen-reader"
                    defaultChecked={false}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="image-descriptions" className="flex flex-col">
                    <span>{t('accessibility.content.imageDescriptions', { default: 'Always Show Image Descriptions' })}</span>
                    <span className="text-xs text-muted-foreground">
                      {t('accessibility.content.imageDescriptionsDescription', {
                        default: 'Display alt text descriptions for images'
                      })}
                    </span>
                  </Label>
                  <Switch
                    id="image-descriptions"
                    defaultChecked={false}
                  />
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <Label htmlFor="content-density" className="flex flex-col">
                    <span>{t('accessibility.content.contentDensity', { default: 'Content Density' })}</span>
                    <span className="text-xs text-muted-foreground">
                      {t('accessibility.content.contentDensityDescription', {
                        default: 'Adjust spacing between elements'
                      })}
                    </span>
                  </Label>
                  <Select defaultValue="default">
                    <SelectTrigger id="content-density">
                      <SelectValue placeholder={t('accessibility.content.selectDensity', { default: 'Select density' })} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="compact">
                        {t('accessibility.content.compact', { default: 'Compact' })}
                      </SelectItem>
                      <SelectItem value="default">
                        {t('accessibility.content.default', { default: 'Default' })}
                      </SelectItem>
                      <SelectItem value="comfortable">
                        {t('accessibility.content.comfortable', { default: 'Comfortable' })}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Braces className="h-5 w-5 text-primary" />
                {t('accessibility.advanced.title', { default: 'Advanced Settings' })}
              </CardTitle>
              <CardDescription>
                {t('accessibility.advanced.description', {
                  default: 'Additional accessibility settings for advanced users'
                })}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <Label htmlFor="keyboard-navigation" className="flex flex-col">
                    <span>{t('accessibility.advanced.keyboardNavigation', { default: 'Enhanced Keyboard Navigation' })}</span>
                    <span className="text-xs text-muted-foreground">
                      {t('accessibility.advanced.keyboardNavigationDescription', {
                        default: 'Enables additional keyboard shortcuts'
                      })}
                    </span>
                  </Label>
                  <Switch
                    id="keyboard-navigation"
                    defaultChecked={false}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="audio-cues" className="flex flex-col">
                    <span>{t('accessibility.advanced.audioCues', { default: 'Audio Cues' })}</span>
                    <span className="text-xs text-muted-foreground">
                      {t('accessibility.advanced.audioCuesDescription', {
                        default: 'Plays sounds for important events'
                      })}
                    </span>
                  </Label>
                  <Switch
                    id="audio-cues"
                    defaultChecked={false}
                  />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="custom-stylesheets" className="flex flex-col">
                    <span>{t('accessibility.advanced.customStylesheets', { default: 'Custom Stylesheets' })}</span>
                    <span className="text-xs text-muted-foreground">
                      {t('accessibility.advanced.customStylesheetsDescription', {
                        default: 'Allow custom CSS for personalization'
                      })}
                    </span>
                  </Label>
                  <Switch
                    id="custom-stylesheets"
                    defaultChecked={false}
                  />
                </div>
                
                <Separator />
                
                <Button variant="outline" className="w-full">
                  {t('accessibility.advanced.exportSettings', { default: 'Export Settings Configuration' })}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AccessibilityPage;
