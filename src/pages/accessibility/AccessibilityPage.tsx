
import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import { useLocalization } from '@/hooks/useLocalization';
import { useAccessibility } from '@/hooks/useAccessibility';
import { KeyboardShortcutsHelp } from '@/components/accessibility/KeyboardShortcuts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { MoveHorizontal, ZoomIn, PanelLeft, Eye, Keyboard, Volume2, MousePointer2, Monitor } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { LanguageIndicator } from '@/components/LanguageIndicator';

const AccessibilityPage: React.FC = () => {
  const { t } = useLocalization();
  const {
    isHighContrastEnabled,
    isReducedMotionEnabled,
    textSize,
    isScreenReaderOptimized,
    toggleHighContrast,
    toggleReducedMotion,
    setTextSize
  } = useAccessibility();

  return (
    <AppLayout>
      <div className="container max-w-4xl py-8 px-4 md:px-0">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              {t('accessibility.title', { default: 'Accessibility Settings' })}
            </h1>
            <p className="text-muted-foreground">
              {t('accessibility.description', { default: 'Customize how you interact with our platform' })}
            </p>
          </div>
          <LanguageIndicator size="lg" variant="outline" />
        </div>

        <Tabs defaultValue="visual" className="w-full space-y-6">
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="visual" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              <span>{t('accessibility.visual', { default: 'Visual' })}</span>
            </TabsTrigger>
            <TabsTrigger value="interaction" className="flex items-center gap-2">
              <MousePointer2 className="h-4 w-4" />
              <span>{t('accessibility.interaction', { default: 'Interaction' })}</span>
            </TabsTrigger>
            <TabsTrigger value="keyboard" className="flex items-center gap-2">
              <Keyboard className="h-4 w-4" />
              <span>{t('accessibility.keyboard', { default: 'Keyboard' })}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="visual" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('accessibility.visualSettings', { default: 'Visual Settings' })}</CardTitle>
                <CardDescription>
                  {t('accessibility.visualSettingsDesc', { default: 'Customize the visual appearance for better readability' })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="highContrast">
                      {t('accessibility.highContrast', { default: 'High Contrast Mode' })}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('accessibility.highContrastDesc', { default: 'Increase contrast for better visibility' })}
                    </p>
                  </div>
                  <Switch 
                    id="highContrast" 
                    checked={isHighContrastEnabled}
                    onCheckedChange={toggleHighContrast}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="reducedMotion">
                      {t('accessibility.reducedMotion', { default: 'Reduced Motion' })}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('accessibility.reducedMotionDesc', { default: 'Minimize or remove animations' })}
                    </p>
                  </div>
                  <Switch 
                    id="reducedMotion" 
                    checked={isReducedMotionEnabled}
                    onCheckedChange={toggleReducedMotion}
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>
                    {t('accessibility.textSize', { default: 'Text Size' })}
                  </Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    {t('accessibility.textSizeDesc', { default: 'Adjust the size of text throughout the application' })}
                  </p>

                  <RadioGroup 
                    value={textSize}
                    onValueChange={(value) => 
                      setTextSize(value as 'small' | 'normal' | 'large' | 'x-large')
                    }
                    className="grid grid-cols-2 gap-4 pt-2"
                  >
                    <div>
                      <RadioGroupItem 
                        value="small" 
                        id="small" 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor="small"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <ZoomIn className="mb-3 h-6 w-6" />
                        <span className="text-xs">
                          {t('accessibility.textSizeSmall', { default: 'Small' })}
                        </span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem 
                        value="normal" 
                        id="normal" 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor="normal"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <ZoomIn className="mb-3 h-6 w-6" />
                        <span className="text-sm">
                          {t('accessibility.textSizeNormal', { default: 'Normal' })}
                        </span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem 
                        value="large" 
                        id="large" 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor="large"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <ZoomIn className="mb-3 h-6 w-6" />
                        <span className="text-base">
                          {t('accessibility.textSizeLarge', { default: 'Large' })}
                        </span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem 
                        value="x-large" 
                        id="x-large" 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor="x-large"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <ZoomIn className="mb-3 h-6 w-6" />
                        <span className="text-lg">
                          {t('accessibility.textSizeXLarge', { default: 'Extra Large' })}
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="screenReader">
                      {t('accessibility.screenReader', { default: 'Screen Reader Optimization' })}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('accessibility.screenReaderDesc', { default: 'Improve compatibility with screen readers' })}
                    </p>
                  </div>
                  <Switch 
                    id="screenReader" 
                    checked={isScreenReaderOptimized}
                    onCheckedChange={(checked) => {
                      // Implementation would be in the hook
                    }}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>{t('accessibility.colorAdjustments', { default: 'Color Adjustments' })}</CardTitle>
                <CardDescription>
                  {t('accessibility.colorAdjustmentsDesc', { default: 'Additional color settings for visual accessibility' })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="flex flex-col h-auto py-4 gap-2">
                    <span className="text-sm font-normal">
                      {t('accessibility.deuteranopia', { default: 'Deuteranopia Mode' })}
                    </span>
                    <div className="w-full h-2 bg-gradient-to-r from-red-500 to-green-500 rounded-full" />
                  </Button>

                  <Button variant="outline" className="flex flex-col h-auto py-4 gap-2">
                    <span className="text-sm font-normal">
                      {t('accessibility.protanopia', { default: 'Protanopia Mode' })}
                    </span>
                    <div className="w-full h-2 bg-gradient-to-r from-yellow-500 to-blue-500 rounded-full" />
                  </Button>

                  <Button variant="outline" className="flex flex-col h-auto py-4 gap-2">
                    <span className="text-sm font-normal">
                      {t('accessibility.tritanopia', { default: 'Tritanopia Mode' })}
                    </span>
                    <div className="w-full h-2 bg-gradient-to-r from-purple-500 to-green-500 rounded-full" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-4">
                  {t('accessibility.colorModeNote', { default: 'Note: Color modes are in beta and may not work perfectly with all content.' })}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interaction" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('accessibility.interactionSettings', { default: 'Interaction Settings' })}</CardTitle>
                <CardDescription>
                  {t('accessibility.interactionSettingsDesc', { default: 'Configure how you interact with the platform' })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="focusHighlight">
                      {t('accessibility.focusHighlight', { default: 'Enhanced Focus Highlighting' })}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('accessibility.focusHighlightDesc', { default: 'Make focus indicators more visible' })}
                    </p>
                  </div>
                  <Switch id="focusHighlight" />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="clickAssist">
                      {t('accessibility.clickAssist', { default: 'Click Assistance' })}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('accessibility.clickAssistDesc', { default: 'Increase clickable area of buttons and links' })}
                    </p>
                  </div>
                  <Switch id="clickAssist" />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="autoComplete">
                      {t('accessibility.autoComplete', { default: 'Enhanced Auto-Complete' })}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('accessibility.autoCompleteDesc', { default: 'Provide more suggestions when typing in forms' })}
                    </p>
                  </div>
                  <Switch id="autoComplete" />
                </div>

                <Separator />

                <div className="space-y-3">
                  <Label>
                    {t('accessibility.navigationMode', { default: 'Navigation Mode' })}
                  </Label>
                  <p className="text-sm text-muted-foreground mb-2">
                    {t('accessibility.navigationModeDesc', { default: 'Choose your preferred navigation style' })}
                  </p>

                  <RadioGroup defaultValue="standard" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <RadioGroupItem 
                        value="standard" 
                        id="nav-standard" 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor="nav-standard"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <MoveHorizontal className="mb-3 h-6 w-6" />
                        <span className="text-sm">
                          {t('accessibility.navStandard', { default: 'Standard' })}
                        </span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem 
                        value="simplified" 
                        id="nav-simplified" 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor="nav-simplified"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <PanelLeft className="mb-3 h-6 w-6" />
                        <span className="text-sm">
                          {t('accessibility.navSimplified', { default: 'Simplified' })}
                        </span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem 
                        value="textOnly" 
                        id="nav-text-only" 
                        className="peer sr-only" 
                      />
                      <Label
                        htmlFor="nav-text-only"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                      >
                        <Monitor className="mb-3 h-6 w-6" />
                        <span className="text-sm">
                          {t('accessibility.navTextOnly', { default: 'Text Only' })}
                        </span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {t('accessibility.assistiveTechnologies', { default: 'Assistive Technologies' })}
                </CardTitle>
                <CardDescription>
                  {t('accessibility.assistiveTechnologiesDesc', { default: 'Settings for assistive tools and technologies' })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="textToSpeech">
                      {t('accessibility.textToSpeech', { default: 'Text-to-Speech' })}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('accessibility.textToSpeechDesc', { default: 'Enable reading text content aloud' })}
                    </p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Button variant="outline" size="sm">
                      <Volume2 className="h-4 w-4 mr-2" />
                      {t('accessibility.test', { default: 'Test' })}
                    </Button>
                    <Switch id="textToSpeech" />
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dictation">
                      {t('accessibility.dictation', { default: 'Dictation' })}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('accessibility.dictationDesc', { default: 'Use voice commands and dictation for input' })}
                    </p>
                  </div>
                  <Switch id="dictation" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keyboard" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>{t('accessibility.keyboardAccess', { default: 'Keyboard Access' })}</CardTitle>
                <CardDescription>
                  {t('accessibility.keyboardAccessDesc', { default: 'Settings for keyboard navigation and shortcuts' })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="keyboardNavigation">
                      {t('accessibility.keyboardNavigation', { default: 'Enhanced Keyboard Navigation' })}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('accessibility.keyboardNavigationDesc', { default: 'Improve navigation with keyboard' })}
                    </p>
                  </div>
                  <Switch id="keyboardNavigation" defaultChecked />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="stickyKeys">
                      {t('accessibility.stickyKeys', { default: 'Sticky Keys' })}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t('accessibility.stickyKeysDesc', { default: 'Press modifier keys one at a time' })}
                    </p>
                  </div>
                  <Switch id="stickyKeys" />
                </div>

                <Separator />

                <KeyboardShortcutsHelp />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default AccessibilityPage;
