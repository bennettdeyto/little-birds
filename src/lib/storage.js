import { supabase } from './supabase'

const USER_ID_KEY = 'lb_user_id'
const BIRDS_KEY = 'lb_birds'

export function getUserId() {
  let id = localStorage.getItem(USER_ID_KEY)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(USER_ID_KEY, id)
  }
  return id
}

export function getBirds() {
  return JSON.parse(localStorage.getItem(BIRDS_KEY) || '[]')
}

export function saveBird(text) {
  const birds = getBirds()
  const bird = {
    id: crypto.randomUUID(),
    text,
    created_at: new Date().toISOString(),
  }
  birds.unshift(bird)
  localStorage.setItem(BIRDS_KEY, JSON.stringify(birds))
  return bird
}

export function hasLoggedToday() {
  const birds = getBirds()
  if (!birds.length) return false
  const today = new Date().toDateString()
  return new Date(birds[0].created_at).toDateString() === today
}

export async function syncFromSupabase(userId) {
  if (!supabase) return
  const { data } = await supabase
    .from('birds')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (data && data.length > 0) {
    localStorage.setItem(BIRDS_KEY, JSON.stringify(data))
  }
}

export async function saveAndSync(text) {
  const userId = getUserId()
  const bird = saveBird(text)
  if (supabase) {
    await supabase.from('birds').insert({ ...bird, user_id: userId })
    await supabase.from('posts').insert({ text })
  }
  return bird
}
