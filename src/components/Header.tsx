type HeaderProps = {
  /** Path of the current section, e.g. `/agents`; its nav link gets `aria-current="page"`. */
  section?: string
}

const links = [
  { href: '/', label: 'Home' },
  { href: '/agents', label: 'Agents' },
  { href: '/ailments', label: 'Ailments' },
  { href: '/therapies', label: 'Therapies' },
  { href: '/dashboard', label: 'Dashboard' },
]

export function Header({ section }: HeaderProps) {
  return (
    <header class="site-header">
      <a class="brand" href="/">AgentClinic</a>
      <nav aria-label="Main">
        {links.map((link) => (
          <a href={link.href} aria-current={link.href === section ? 'page' : undefined}>
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  )
}
