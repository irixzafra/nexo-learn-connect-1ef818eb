
import React from "react";
import { Course } from "@/features/admin/hooks/useCoursesManagement";

interface CourseFormProps {
  data: Course | null;
  onChange: (data: Course) => void;
}

const CourseForm = React.forwardRef<HTMLDivElement, CourseFormProps>(
  ({ data, onChange }, ref) => {
    return (
      <div className="space-y-4" ref={ref}>
        <div className="space-y-2">
          <label className="text-sm font-medium">Título del curso</label>
          <input
            type="text"
            className="w-full p-2 border rounded-md"
            value={data?.title || ""}
            onChange={(e) => onChange({ ...data, title: e.target.value } as Course)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Descripción</label>
          <textarea
            className="w-full p-2 border rounded-md"
            value={data?.description || ""}
            onChange={(e) => onChange({ ...data, description: e.target.value } as Course)}
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Precio</label>
          <input
            type="number"
            className="w-full p-2 border rounded-md"
            value={data?.price || 0}
            onChange={(e) => onChange({ ...data, price: parseFloat(e.target.value) } as Course)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Nivel</label>
          <select
            className="w-full p-2 border rounded-md"
            value={data?.level || ""}
            onChange={(e) => onChange({ ...data, level: e.target.value } as Course)}
          >
            <option value="">Seleccione un nivel</option>
            <option value="beginner">Principiante</option>
            <option value="intermediate">Intermedio</option>
            <option value="advanced">Avanzado</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="is_published"
            checked={data?.is_published || false}
            onChange={(e) => onChange({ ...data, is_published: e.target.checked } as Course)}
            className="rounded"
          />
          <label htmlFor="is_published" className="text-sm font-medium">Publicado</label>
        </div>
      </div>
    );
  }
);

CourseForm.displayName = "CourseForm";

export default CourseForm;
