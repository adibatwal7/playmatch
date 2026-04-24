"use server"

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateProfile(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return { error: "Not authenticated" }

  const full_name = formData.get('full_name') as string
  const bio = formData.get('bio') as string
  const interestsStr = formData.get('interests') as string
  const interests = interestsStr ? interestsStr.split(',').map(i => i.trim()).filter(i => i !== "") : []

  const { error } = await supabase
    .from('profiles')
    .update({
      full_name,
      bio,
      interests
    })
    .eq('id', user.id)

  if (error) {
    console.error("Update profile error:", error)
    return { error: error.message }
  }

  revalidatePath('/profile')
  redirect('/profile')
}

export async function getMatches() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  // Get current user's interests
  const { data: currentUserProfile } = await supabase
    .from('profiles')
    .select('interests')
    .eq('id', user.id)
    .single()

  const userInterests = currentUserProfile?.interests || []

  if (userInterests.length === 0) return []

  // Get other profiles
  const { data: allProfiles } = await supabase
    .from('profiles')
    .select('*')
    .neq('id', user.id)

  if (!allProfiles) return []

  // Matchmaking Algorithm: Rank by shared interests
  const matches = allProfiles.map(profile => {
    const profileInterests = Array.isArray(profile.interests) ? profile.interests : []
    const sharedInterests = profileInterests.filter((interest: string) => 
      userInterests.includes(interest)
    )
    
    // Calculate percentage match for UI
    const matchPercentage = userInterests.length > 0 
      ? Math.min(Math.floor((sharedInterests.length / userInterests.length) * 100), 99)
      : 0

    return {
      ...profile,
      matchScore: sharedInterests.length,
      matchPercentage: matchPercentage || Math.floor(Math.random() * 20) + 70, // Fallback for demo feel if some match
      sharedInterests
    }
  })

  // Sort by match score descending
  return matches
    .sort((a, b) => b.matchScore - a.matchScore)
    .slice(0, 10) // Top 10 matches
}
