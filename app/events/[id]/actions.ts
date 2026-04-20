"use server"

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function joinEvent(eventId: string) {
  const supabase = await createClient()

  // Verify authentication
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to join an event." }
  }

  // Insert into event_attendees
  const { error } = await supabase
    .from('event_attendees')
    .insert({
      event_id: eventId,
      user_id: user.id
    })

  // Code 23505 is PostgreSQL unique violation (already joined)
  if (error && error.code !== '23505') {
    return { error: error.message }
  }

  // Refresh caches to update UI across the app
  revalidatePath(`/events/${eventId}`)
  revalidatePath('/feed')
  revalidatePath('/profile')
  revalidatePath('/')
  
  return { success: true }
}
