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

/** Insert the sample data. Safe to run more than once. */
export function seed(db: DB): void {
  const insertAgent = db.prepare(
    'INSERT OR IGNORE INTO agents (name, model, status, complaint) VALUES (@name, @model, @status, @complaint)',
  )
  const insertAilment = db.prepare('INSERT OR IGNORE INTO ailments (name, description) VALUES (@name, @description)')
  const link = db.prepare(`
    INSERT OR IGNORE INTO agent_ailments (agent_id, ailment_id)
    SELECT a.id, i.id FROM agents a, ailments i WHERE a.name = ? AND i.name = ?
  `)

  db.transaction(() => {
    agents.forEach((a) => insertAgent.run(a))
    ailments.forEach((a) => insertAilment.run(a))
    for (const [agent, names] of Object.entries(links)) names.forEach((n) => link.run(agent, n))
  })()
}
