import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://myksobarbwbzdnjckvtp.supabase.co";

const supabaseKey = "sb_publishable_HDyUSIs1osCF2Fkcz0tvsw_0I100o-1";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);