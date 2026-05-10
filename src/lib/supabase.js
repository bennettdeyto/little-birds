import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

const configured =
  typeof url === 'string' &&
  url.startsWith('http') &&
  typeof key === 'string' &&
  key.length > 0

export const supabase = configured ? createClient(url, key) : null
