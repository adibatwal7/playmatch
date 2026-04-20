"use server"

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function createEvent(formData: FormData) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: "You must be logged in to create an event." }
  }

  const title = formData.get('title') as string
  const sport = formData.get('sport') as string
  const dateStr = formData.get('date') as string
  const timeStr = formData.get('time') as string
  const location = formData.get('location') as string
  const price = parseFloat(formData.get('price') as string) || 0
  const capacity = parseInt(formData.get('capacity') as string) || 10

  if (!title || !sport || !dateStr || !timeStr || !location) {
    return { error: "Please fill out all required fields." }
  }

  // Combine date and time
  const fullDateTime = new Date(`${dateStr}T${timeStr}`)

  const { error } = await supabase
    .from('events')
    .insert({
      title,
      sport,
      date: fullDateTime.toISOString(),
      location,
      price,
      capacity,
      host_id: user.id
    })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/feed')
  revalidatePath('/')
  redirect('/feed')
}
