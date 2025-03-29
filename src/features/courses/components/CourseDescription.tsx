
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CourseDescriptionProps {
  description: string;
}

export const CourseDescription: React.FC<CourseDescriptionProps> = ({
  description,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sobre este curso</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="whitespace-pre-line">{description}</p>
      </CardContent>
    </Card>
  );
};
