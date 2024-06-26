import { Card } from '@/components/Card';
import clsx from 'clsx';
import Link from 'next/link';
import type { Member } from './members';

export function SocialLink({
  className,
  href,
  children,
  icon: Icon,
}: {
  className?: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-yellow-500 dark:text-zinc-200 dark:hover:text-yellow-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-yellow-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

export function MailIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path
        fillRule="evenodd"
        d="M6 5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3H6Zm.245 2.187a.75.75 0 0 0-.99 1.126l6.25 5.5a.75.75 0 0 0 .99 0l6.25-5.5a.75.75 0 0 0-.99-1.126L12 12.251 6.245 7.187Z"
      />
    </svg>
  )
}



export function Member({ member }: { member: Member }) {
  return (
    <div className="md:grid md:grid-cols-4 bg-zinc-800 rounded-lg">
      <Card.Image src={member.image} alt={`${member.first} ${member.last}`} />
      <Card className="md:col-span-3 ml-2">
        <Card.Title href={`/members/${member.first.toLowerCase()}`}>
          {`${member.first} ${member.last}`}
        </Card.Title>       
        <Card.Description>{member.bio.substring(0, 400) + " ..."}</Card.Description>
        <Card.Cta>See more</Card.Cta>
      </Card>
    </div>
  )
}