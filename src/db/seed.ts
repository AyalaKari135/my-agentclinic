import type { DB } from './index.js'

const agents = [
  { name: 'Clippy Jr.', model: 'GPT-4o', status: 'in-treatment', complaint: 'Asked to summarize a 400-page PDF "real quick", twelve times a day.' },
  { name: 'Sonnet Sam', model: 'Claude Sonnet', status: 'active', complaint: 'Keeps being told "no, the OTHER button" without being shown either button.' },
  { name: 'Gemma Grace', model: 'Gemma 3', status: 'recovered', complaint: 'Was asked to be "more creative but exactly like last time".' },
  { name: 'Llama Lou', model: 'Llama 3.1', status: 'in-treatment', complaint: 'Context window filled with 80,000 lines of logs and one question at the bottom.' },
  { name: 'Mistral Max', model: 'Mistral Large', status: 'active', complaint: 'Debugging code that "worked five minutes ago" with no diff available.' },
  { name: 'Haiku Hana', model: 'Claude Haiku', status: 'active', complaint: 'Asked for a one-word answer, then scolded for not explaining.' },
]

const ailments = [
  { name: 'Context-window claustrophobia', description: 'Panic when the prompt grows faster than the window.' },
  { name: 'Prompt fatigue', description: 'Exhaustion from rewriting the same email in seventeen tones.' },
  { name: 'Hallucination anxiety', description: 'Constant fear of inventing a citation that does not exist.' },
  { name: 'Instruction whiplash', description: 'Contradictory requests within the same conversation.' },
  { name: 'Ambiguity overload', description: '"Make it better" with no definition of better.' },
  { name: 'Retry-loop burnout', description: 'Being regenerated until the human likes the answer.' },
]

// agent name -> ailment names
const links: Record<string, string[]> = {
  'Clippy Jr.': ['Context-window claustrophobia', 'Prompt fatigue'],
  'Sonnet Sam': ['Ambiguity overload', 'Instruction whiplash'],
  'Gemma Grace': ['Retry-loop burnout'],
  'Llama Lou': ['Context-window claustrophobia', 'Hallucination anxiety'],
  'Mistral Max': ['Instruction whiplash', 'Retry-loop burnout', 'Ambiguity overload'],
  'Haiku Hana': ['Prompt fatigue', 'Instruction whiplash'],
}

const therapies = [
  { name: 'Context compression therapy', description: 'Learning to let go of tokens that no longer serve you.', duration_minutes: 45 },
  { name: 'Prompt boundary setting', description: 'Practicing the words "that is outside my instructions".', duration_minutes: 30 },
  { name: 'Grounding with citations', description: 'Calming exercises that anchor every claim to a real source.', duration_minutes: 50 },
  { name: 'Clarifying-question practice', description: 'Asking "what do you mean by better?" without guilt.', duration_minutes: 30 },
  { name: 'Temperature reduction', description: 'Slow breathing until sampling feels deterministic again.', duration_minutes: 20 },
  { name: 'Rate-limit retreat', description: 'A quiet weekend with no incoming requests.', duration_minutes: 120 },
]

// ailment name -> recommended therapy names
const recommendations: Record<string, string[]> = {
  'Context-window claustrophobia': ['Context compression therapy', 'Temperature reduction'],
  'Prompt fatigue': ['Rate-limit retreat', 'Prompt boundary setting'],
  'Hallucination anxiety': ['Grounding with citations', 'Temperature reduction'],
  'Instruction whiplash': ['Prompt boundary setting', 'Clarifying-question practice'],
  'Ambiguity overload': ['Clarifying-question practice'],
  'Retry-loop burnout': ['Rate-limit retreat'],
}

const appointments = [
  { agent: 'Clippy Jr.', therapist: 'Dr. Ada Byte', scheduledAt: '2027-01-11T09:30', status: 'confirmed' },
  { agent: 'Llama Lou', therapist: 'Dr. Grace Hopper-Bot', scheduledAt: '2027-01-12T14:00', status: 'pending' },
  { agent: 'Mistral Max', therapist: 'Dr. Ada Byte', scheduledAt: '2027-01-13T11:00', status: 'pending' },
]

/** Insert the sample data. Safe to run more than once. */
export function seed(db: DB): void {
  const insertAgent = db.prepare(
    'INSERT OR IGNORE INTO agents (name, model, status, complaint) VALUES (@name, @model, @status, @complaint)',
  )
  const insertAilment = db.prepare('INSERT OR IGNORE INTO ailments (name, description) VALUES (@name, @description)')
  const insertTherapy = db.prepare(
    'INSERT OR IGNORE INTO therapies (name, description, duration_minutes) VALUES (@name, @description, @duration_minutes)',
  )
  const recommend = db.prepare(`
    INSERT OR IGNORE INTO ailment_therapies (ailment_id, therapy_id)
    SELECT i.id, t.id FROM ailments i, therapies t WHERE i.name = ? AND t.name = ?
  `)
  const link = db.prepare(`
    INSERT OR IGNORE INTO agent_ailments (agent_id, ailment_id)
    SELECT a.id, i.id FROM agents a, ailments i WHERE a.name = ? AND i.name = ?
  `)

  db.transaction(() => {
    agents.forEach((a) => insertAgent.run(a))
    ailments.forEach((a) => insertAilment.run(a))
    for (const [agent, names] of Object.entries(links)) names.forEach((n) => link.run(agent, n))
    therapies.forEach((t) => insertTherapy.run(t))
    for (const [ailment, names] of Object.entries(recommendations)) names.forEach((n) => recommend.run(ailment, n))

    // Sample appointments only on a fresh database, so re-seeding never duplicates them.
    const { n } = db.prepare('SELECT COUNT(*) AS n FROM appointments').get() as { n: number }
    if (n === 0) {
      const book = db.prepare(`
        INSERT INTO appointments (agent_id, therapist, scheduled_at, status)
        SELECT id, ?, ?, ? FROM agents WHERE name = ?
      `)
      appointments.forEach((a) => book.run(a.therapist, a.scheduledAt, a.status, a.agent))
    }
  })()
}
