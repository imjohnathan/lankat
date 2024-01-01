import { type Users } from '@/gql/graphql';
import { SOCIAL_LISTS } from '@/lib/constants/socialIcons';

export default function BioSocialLinks({ user }: { user: Partial<Users> }) {
  const { social_links } = user;
  return (
    <div className="flex items-center justify-center gap-5 text-base">
      {Boolean(social_links) &&
        Boolean(social_links.length) &&
        social_links.map(({ service, value }: { service: string; value: string }, index: number) => {
          const findSocial = SOCIAL_LISTS.find((item) => item.value === service);
          const Icon = findSocial?.icon;
          return (
            <a
              key={index}
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg text-gray-500 hover:text-gray-900"
            >
              {findSocial && Icon && <Icon />}
            </a>
          );
        })}
    </div>
  );
}
