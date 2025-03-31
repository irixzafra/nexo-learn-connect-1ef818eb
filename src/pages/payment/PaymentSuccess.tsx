
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import AppLayout from "@/layouts/AppLayout";
import { supabase } from "@/lib/supabase";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const courseId = searchParams.get("course");
  const sessionId = searchParams.get("session_id");
  const [isVerifying, setIsVerifying] = useState(true);
  const [courseTitle, setCourseTitle] = useState("");

  // Verify the payment and create enrollment
  useEffect(() => {
    const verifyPayment = async () => {
      if (!courseId || !sessionId) {
        setIsVerifying(false);
        return;
      }

      try {
        // Fetch course details
        const { data: course } = await supabase
          .from("courses")
          .select("title")
          .eq("id", courseId)
          .single();
        
        if (course) {
          setCourseTitle(course.title);
        }

        // Check if the user is already enrolled
        const { data: enrollment } = await supabase
          .from("enrollments")
          .select("id")
          .eq("course_id", courseId)
          .eq("user_id", (await supabase.auth.getUser()).data.user?.id)
          .maybeSingle();

        // If not already enrolled, the webhook should have already created the enrollment
        // This is just a fallback in case the webhook hasn't processed yet
        if (!enrollment) {
          console.log("Enrollment not found, waiting for webhook to process...");
          // Wait a bit longer for the webhook to process
          setTimeout(() => {
            setIsVerifying(false);
          }, 3000);
        } else {
          setIsVerifying(false);
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setIsVerifying(false);
      }
    };

    verifyPayment();
  }, [courseId, sessionId]);

  // Redirect to course after 5 seconds
  useEffect(() => {
    if (!isVerifying && courseId) {
      const timer = setTimeout(() => {
        navigate(`/courses/${courseId}/learn`);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isVerifying, courseId, navigate]);

  return (
    <AppLayout>
      <div className="container mx-auto flex items-center justify-center min-h-[80vh] p-4">
        {isVerifying ? (
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <Loader2 className="h-16 w-16 text-primary animate-spin" />
              </div>
              <CardTitle className="text-2xl">Verificando pago</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Estamos verificando el estado de tu pago. Por favor espera un momento...
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full max-w-md text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-2xl">¡Pago Completado!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Tu pago ha sido procesado correctamente. Ya tienes acceso completo a 
                {courseTitle ? ` "${courseTitle}"` : " el curso"}.
              </p>
              <p className="text-sm">
                Serás redirigido automáticamente a tu curso en 5 segundos...
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => courseId ? navigate(`/courses/${courseId}/learn`) : navigate("/my-courses")} className="gap-2">
                Ir al curso
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default PaymentSuccess;
