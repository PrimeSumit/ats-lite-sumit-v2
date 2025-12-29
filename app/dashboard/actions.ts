"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// --- 1. ADD NEW JOB ---
export async function addJobApplication(formData: FormData) {
  const supabase = await createClient(); // Fixed: Added await
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You must be logged in to add a job.");
  }

  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const location = formData.get("location") as string;
  const salary = formData.get("salary") as string;
  const status = formData.get("status") as string;
  const jobUrl = formData.get("jobUrl") as string;
  const notes = formData.get("notes") as string;
  const date = formData.get("date") as string;

  await supabase.from("job_applications").insert({
    user_id: user.id,
    company_name: company,
    position: role,
    location: location,
    salary_range: salary,
    status: status || "saved",
    job_url: jobUrl,
    notes: notes,
    // If user didn't pick a date, use 'now'
    created_at: date ? new Date(date).toISOString() : new Date().toISOString(),
  });

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/applications");
}

// --- 2. UPDATE EXISTING JOB ---
export async function updateJobApplication(formData: FormData) {
  const supabase = await createClient(); // Fixed: Added await
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  const id = formData.get("id") as string;
  const company = formData.get("company") as string;
  const role = formData.get("role") as string;
  const location = formData.get("location") as string;
  const salary = formData.get("salary") as string;
  const jobUrl = formData.get("jobUrl") as string;
  const notes = formData.get("notes") as string;

  // We do NOT update 'status' here because the Kanban Board drag-and-drop handles that separately.
  // We do NOT update 'created_at' to keep the original application date.
  await supabase
    .from("job_applications")
    .update({
      company_name: company,
      position: role,
      location: location,
      salary_range: salary,
      job_url: jobUrl,
      notes: notes,
    })
    .eq("id", id)
    .eq("user_id", user.id); // Security: Ensure user owns the job

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/applications");
  return { success: true };
}

// --- 3. DELETE JOB ---
export async function deleteJobApplication(id: string) {
  const supabase = await createClient(); // Fixed: Added await
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Unauthorized");

  await supabase
    .from("job_applications")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id); // Security check

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/applications");
  return { success: true };
}
