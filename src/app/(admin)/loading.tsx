
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[calc(100vh-10rem)]"> {/* Adjust min-h as needed */}
      <LoadingSpinner size={16} text="Loading admin content..." />
    </div>
  );
}
