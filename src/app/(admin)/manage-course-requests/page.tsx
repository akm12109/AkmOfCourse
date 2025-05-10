"use client";

import { useState, useEffect } from "react";
import type { CourseRequest } from "@/types";
import { getCourseRequests } from "@/services/courseService";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Loader2, FileQuestion, Mail, CalendarDays } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Added Skeleton

const TableSkeletonRow = () => (
  <TableRow>
    <TableCell><Skeleton className="h-5 w-full" /></TableCell>
    <TableCell><Skeleton className="h-5 w-full" /></TableCell>
    <TableCell><Skeleton className="h-5 w-3/4" /></TableCell>
    <TableCell className="text-right"><Skeleton className="h-6 w-24 ml-auto rounded-full" /></TableCell>
  </TableRow>
);

export default function ManageCourseRequestsPage() {
  const [requests, setRequests] = useState<CourseRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        const courseRequests = await getCourseRequests();
        setRequests(courseRequests);
      } catch (error) {
        toast({ title: "Error fetching course requests", description: (error as Error).message, variant: "destructive" });
      } finally {
        setIsLoading(false);
      }
    };
    fetchRequests();
  }, [toast]);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="text-3xl flex items-center">
            <FileQuestion className="mr-3 h-8 w-8 text-primary" />
            Manage Course Requests ({isLoading ? '...' : requests.length})
          </CardTitle>
          <CardDescription>
            Review course suggestions submitted by users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Suggested Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Requester Email</TableHead>
                    <TableHead className="text-right">Requested On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[...Array(5)].map((_, i) => <TableSkeletonRow key={i} />)}
                </TableBody>
              </Table>
            </div>
          ) : requests.length === 0 ? (
            <p className="text-center text-muted-foreground text-lg py-10">
              No course requests submitted yet.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Suggested Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Requester Email</TableHead>
                    <TableHead className="text-right">Requested On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.courseTitle}</TableCell>
                      <TableCell className="max-w-sm truncate">
                        {request.description || <span className="text-muted-foreground italic">No description</span>}
                      </TableCell>
                      <TableCell>
                        <a href={`mailto:${request.email}`} className="text-primary hover:underline flex items-center">
                          <Mail className="mr-1.5 h-3.5 w-3.5" /> {request.email}
                        </a>
                      </TableCell>
                      <TableCell className="text-right">
                        {request.requestedAt ? (
                           <Badge variant="outline" className="flex items-center w-fit ml-auto">
                             <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
                             {format(parseISO(request.requestedAt as string), 'MMM d, yyyy')}
                           </Badge>
                        ) : (
                          <span className="text-muted-foreground italic">N/A</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
