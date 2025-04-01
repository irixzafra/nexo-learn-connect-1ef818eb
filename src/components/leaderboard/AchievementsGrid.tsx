
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, Award, Zap } from 'lucide-react';
import { ACHIEVEMENT_DATA } from '@/data/achievements';
import { CodeIcon } from '@/components/icons/CodeIcon';
import { BarChart2Icon } from '@/components/icons/BarChart2Icon';
import { PaletteIcon } from '@/components/icons/PaletteIcon';
import { ShieldIcon } from '@/components/icons/ShieldIcon';
import { GraduationCapIcon } from '@/components/icons/GraduationCapIcon';
import { TrendingUp, Users, Flame } from 'lucide-react';

export const AchievementsGrid: React.FC = () => {
  // Function to render the correct icon based on the icon type
  const renderIcon = (iconType: string, className: string) => {
    switch (iconType) {
      case 'Code':
        return <CodeIcon className={className} />;
      case 'BarChart2':
        return <BarChart2Icon className={className} />;
      case 'Palette':
        return <PaletteIcon className={className} />;
      case 'TrendingUp':
        return <TrendingUp className={className} />;
      case 'Shield':
        return <ShieldIcon className={className} />;
      case 'Flame':
        return <Flame className={className} />;
      case 'GraduationCap':
        return <GraduationCapIcon className={className} />;
      case 'Users':
        return <Users className={className} />;
      default:
        return <Award className={className} />;
    }
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar logros..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline" size="sm">
              <Award className="h-4 w-4 mr-2" />
              Rareza
            </Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ACHIEVEMENT_DATA.map(achievement => (
          <Card key={achievement.id}>
            <CardContent className="p-6">
              <div className="flex items-start">
                <div className={`h-14 w-14 rounded-full flex items-center justify-center mr-4 ${
                  achievement.rarity === 'legendary' ? 'bg-yellow-100 dark:bg-yellow-900/20' : 
                  achievement.rarity === 'epic' ? 'bg-purple-100 dark:bg-purple-900/20' : 
                  achievement.rarity === 'rare' ? 'bg-blue-100 dark:bg-blue-900/20' : 
                  'bg-green-100 dark:bg-green-900/20'
                }`}>
                  {renderIcon(achievement.iconType, achievement.iconColor)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{achievement.name}</h3>
                    <Badge variant={
                      achievement.rarity === 'legendary' ? 'default' : 
                      achievement.rarity === 'epic' ? 'secondary' : 
                      achievement.rarity === 'rare' ? 'outline' : 
                      'outline'
                    } className={
                      achievement.rarity === 'legendary' ? 'bg-yellow-600' : 
                      achievement.rarity === 'epic' ? 'bg-purple-600' : 
                      achievement.rarity === 'rare' ? 'border-blue-600 text-blue-600' : 
                      'border-green-600 text-green-600'
                    }>
                      {achievement.rarity === 'legendary' ? 'Legendario' : 
                      achievement.rarity === 'epic' ? 'Épico' : 
                      achievement.rarity === 'rare' ? 'Raro' : 
                      'Común'}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mb-2">{achievement.description}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      <Zap className="h-4 w-4 text-yellow-500 mr-1" />
                      <span>{achievement.points} puntos</span>
                    </div>
                    <div className="text-muted-foreground">
                      Desbloqueado por {(achievement.unlockedBy * 100).toFixed(1)}% de estudiantes
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
