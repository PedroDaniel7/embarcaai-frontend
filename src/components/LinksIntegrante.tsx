import type { Integrante } from '../types/integrante'

const CLASSE = 'inline-flex min-h-11 items-center break-all font-medium text-brand-700 underline hover:text-brand-900'

/** Links de contato do integrante (e-mail, GitHub e LinkedIn). */
export default function LinksIntegrante({ integrante }: { integrante: Integrante }) {
  return (
    <ul className="flex flex-col">
      <li>
        <a href={`mailto:${integrante.email}`} className={CLASSE}>
          {integrante.email}
        </a>
      </li>
      <li>
        <a href={`https://github.com/${integrante.github}`} target="_blank" rel="noopener noreferrer" className={CLASSE}>
          GitHub: @{integrante.github}
        </a>
      </li>
      <li>
        <a href={integrante.linkedin} target="_blank" rel="noopener noreferrer" className={CLASSE}>
          LinkedIn
        </a>
      </li>
    </ul>
  )
}
