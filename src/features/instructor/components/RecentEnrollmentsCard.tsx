
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";

interface Enrollment {
  id: string;
  enrolled_at: string;
  profiles: {
    full_name: string;
  };
  courses: {
    title: string;
  };
}

interface RecentEnrollmentsCardProps {
  enrollments: Enrollment[];
  isLoading?: boolean;
}

export const RecentEnrollmentsCard: React.FC<RecentEnrollmentsCardProps> = ({
  enrollments,
  isLoading = false,
}) => {
  if (isLoading) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>Inscripciones Recientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="flex-1 space-y-1">
                  <Skeleton className="h-4 w-[150px]" />
                  <Skeleton className="h-3 w-[200px]" />
                </div>
                <Skeleton className="h-5 w-[60px]" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Inscripciones Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        {enrollments.length === 0 ? (
          <p className="text-muted-foreground text-sm">
            No hay inscripciones recientes.
          </p>
        ) : (
          <div className="space-y-4">
            {enrollments.map((enrollment) => (
              <div key={enrollment.id} className="flex items-center space-x-4">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>
                    {enrollment.profiles.full_name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .slice(0, 2)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">
                    {enrollment.profiles.full_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Se inscribió en{" "}
                    <span className="font-medium">{enrollment.courses.title}</span>
                  </p>
                </div>
                <Badge variant="outline">
                  {format(new Date(enrollment.enrolled_at), "d MMM", {
                    locale: es,
                  })}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
