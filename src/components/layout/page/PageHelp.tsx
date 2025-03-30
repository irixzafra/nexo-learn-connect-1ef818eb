
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, Link2, ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface HelpLink {
  title: string;
  description?: string;
  href: string;
  external?: boolean;
}

export interface PageHelpProps {
  title?: string;
  description?: string;
  links?: HelpLink[];
  className?: string;
  icon?: React.ReactNode;
}

const PageHelp: React.FC<PageHelpProps> = ({
  title = "¿Necesitas ayuda?",
  description = "Recursos y guías relacionados con esta sección.",
  links = [],
  className,
  icon = <HelpCircle className="h-5 w-5" />,
}) => {
  return (
    <Card className={cn("bg-muted/50", className)}>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <p className="text-muted-foreground">
          {description}
        </p>
        {links.length > 0 && (
          <div className="space-y-2">
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.external ? "_blank" : "_self"}
                rel={link.external ? "noopener noreferrer" : ""}
                className="block"
              >
                <Button variant="ghost" className="w-full justify-start px-2 h-auto py-2">
                  <div className="flex items-start gap-2 text-left">
                    <Link2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="font-medium flex items-center gap-1">
                        {link.title}
                        {link.external && (
                          <ExternalLink className="h-3 w-3" />
                        )}
                      </div>
                      {link.description && (
                        <p className="text-muted-foreground text-xs mt-0.5">
                          {link.description}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 opacity-50" />
                  </div>
                </Button>
              </a>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PageHelp;
