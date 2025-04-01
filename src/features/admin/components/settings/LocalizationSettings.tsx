
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Globe, Languages, Calendar, Clock, Loader2, Shield } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import type { FeaturesConfig } from '@/contexts/features/types';
import { useLanguage, DEFAULT_LANGUAGE, FALLBACK_LANGUAGE, SupportedLanguage } from '@/contexts/LanguageContext';

interface LocalizationSettingsProps {
  featuresConfig: FeaturesConfig;
  onToggleFeature: (feature: keyof FeaturesConfig, value: boolean) => void;
  isLoading?: boolean;
}

export const LocalizationSettings: React.FC<LocalizationSettingsProps> = ({
  featuresConfig,
  onToggleFeature,
  isLoading = false
}) => {
  const { t, supportedLanguages } = useLanguage();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-indigo-500" />
          {t('settings.language')}
        </CardTitle>
        <CardDescription>
          {t('settings.language.description', { default: 'Configura las opciones de idioma, zona horaria y formato' })}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Languages className="h-4 w-4 text-blue-500" />
            {t('settings.language')}
          </h3>
          <div className="space-y-4 ml-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="multiLanguage">{t('settings.multilanguage')}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('settings.multilanguage.description', { default: 'Habilitar soporte para múltiples idiomas' })}
                </p>
              </div>
              <div className="flex items-center">
                {isLoading && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
                )}
                <Switch
                  id="multiLanguage"
                  checked={!!featuresConfig.enableMultiLanguage}
                  onCheckedChange={(value) => onToggleFeature('enableMultiLanguage', value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="defaultLanguage" className="mb-2 block">
                  {t('settings.defaultLanguage', { default: 'Idioma predeterminado' })}
                </Label>
                <Select defaultValue={DEFAULT_LANGUAGE}>
                  <SelectTrigger id="defaultLanguage">
                    <SelectValue placeholder={t('settings.selectLanguage', { default: 'Seleccionar idioma' })} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{t('settings.languages', { default: 'Idiomas' })}</SelectLabel>
                      {supportedLanguages.map(lang => (
                        <SelectItem key={lang} value={lang}>
                          {t(`language.${lang}`, { default: lang })}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="fallbackLanguage" className="mb-2 block">
                  {t('settings.fallbackLanguage', { default: 'Idioma de respaldo' })}
                </Label>
                <Select defaultValue={FALLBACK_LANGUAGE}>
                  <SelectTrigger id="fallbackLanguage">
                    <SelectValue placeholder={t('settings.selectFallbackLanguage', { default: 'Seleccionar idioma de respaldo' })} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{t('settings.languages', { default: 'Idiomas' })}</SelectLabel>
                      {supportedLanguages.map(lang => (
                        <SelectItem key={lang} value={lang}>
                          {t(`language.${lang}`, { default: lang })}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-500" />
            {t('settings.timezone', { default: 'Zona horaria y formato' })}
          </h3>
          <div className="space-y-4 ml-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="timezone" className="mb-2 block">
                  {t('settings.defaultTimezone', { default: 'Zona horaria predeterminada' })}
                </Label>
                <Select defaultValue="america-mexico_city">
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder={t('settings.selectTimezone', { default: 'Seleccionar zona horaria' })} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>{t('settings.america', { default: 'América' })}</SelectLabel>
                      <SelectItem value="america-mexico_city">Ciudad de México (GMT-6)</SelectItem>
                      <SelectItem value="america-bogota">Bogotá (GMT-5)</SelectItem>
                      <SelectItem value="america-buenos_aires">Buenos Aires (GMT-3)</SelectItem>
                      <SelectItem value="america-santiago">Santiago (GMT-4)</SelectItem>
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>{t('settings.europe', { default: 'Europa' })}</SelectLabel>
                      <SelectItem value="europe-madrid">Madrid (GMT+1)</SelectItem>
                      <SelectItem value="europe-london">Londres (GMT+0)</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="dateFormat" className="mb-2 block">
                  {t('settings.dateFormat', { default: 'Formato de fecha' })}
                </Label>
                <Select defaultValue="dd-mm-yyyy">
                  <SelectTrigger id="dateFormat">
                    <SelectValue placeholder={t('settings.selectDateFormat', { default: 'Seleccionar formato de fecha' })} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="dd-mm-yyyy">DD-MM-AAAA</SelectItem>
                      <SelectItem value="mm-dd-yyyy">MM-DD-AAAA</SelectItem>
                      <SelectItem value="yyyy-mm-dd">AAAA-MM-DD</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-500" />
            {t('settings.calendar', { default: 'Calendario' })}
          </h3>
          <div className="space-y-4 ml-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstDayOfWeek" className="mb-2 block">
                  {t('settings.firstDayOfWeek', { default: 'Primer día de la semana' })}
                </Label>
                <Select defaultValue="monday">
                  <SelectTrigger id="firstDayOfWeek">
                    <SelectValue placeholder={t('settings.selectFirstDay', { default: 'Seleccionar primer día' })} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="monday">{t('settings.monday', { default: 'Lunes' })}</SelectItem>
                      <SelectItem value="sunday">{t('settings.sunday', { default: 'Domingo' })}</SelectItem>
                      <SelectItem value="saturday">{t('settings.saturday', { default: 'Sábado' })}</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-blue-500" />
            {t('settings.seo.international', { default: 'SEO Internacional' })}
          </h3>
          <div className="space-y-4 ml-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="hreflangTags">{t('settings.hreflangTags', { default: 'Etiquetas hreflang' })}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('settings.hreflangTags.description', { default: 'Generar automáticamente etiquetas hreflang para SEO internacional' })}
                </p>
              </div>
              <div className="flex items-center">
                {isLoading && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
                )}
                <Switch
                  id="hreflangTags"
                  checked={!!featuresConfig.enableHreflangTags}
                  onCheckedChange={(value) => onToggleFeature('enableHreflangTags', value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="multiRegionSeo">{t('settings.regionalContent', { default: 'Contenido regional' })}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('settings.regionalContent.description', { default: 'Optimizar contenido según región geográfica' })}
                </p>
              </div>
              <div className="flex items-center">
                {isLoading && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
                )}
                <Switch
                  id="multiRegionSeo"
                  checked={!!featuresConfig.enableRegionalContent}
                  onCheckedChange={(value) => onToggleFeature('enableRegionalContent', value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="langURLs">{t('settings.langPrefixUrls', { default: 'URLs con prefijo de idioma' })}</Label>
                <p className="text-sm text-muted-foreground">
                  {t('settings.langPrefixUrls.description', { default: 'Usar prefijos (/es/, /en/) en las URLs para mejor SEO' })}
                </p>
              </div>
              <div className="flex items-center">
                {isLoading && (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin text-muted-foreground" />
                )}
                <Switch
                  id="langURLs"
                  checked={!!featuresConfig.enableLangPrefixUrls}
                  onCheckedChange={(value) => onToggleFeature('enableLangPrefixUrls', value)}
                  disabled={isLoading}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocalizationSettings;
