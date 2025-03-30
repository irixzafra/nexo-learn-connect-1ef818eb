
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

interface HelpSectionProps {
  title: string;
  description: string;
  links: Array<{ text: string; href: string }>;
}

export const HelpSection: React.FC<HelpSectionProps> = ({ title, description, links }) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="space-y-2">
          {links.map((link, index) => (
            <Link 
              key={index} 
              to={link.href} 
              className="flex items-center justify-between p-2 text-sm hover:bg-accent rounded-md transition-colors"
            >
              <span>{link.text}</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
