const InstagramIcon = ({ gradientId }: { gradientId: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
    <defs>
      <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433"/>
        <stop offset="25%" stopColor="#e6683c"/>
        <stop offset="50%" stopColor="#dc2743"/>
        <stop offset="75%" stopColor="#cc2366"/>
        <stop offset="100%" stopColor="#bc1888"/>
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill={`url(#${gradientId})`}/>
    <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="1.5"/>
    <circle cx="17.5" cy="6.5" r="1" fill="white"/>
  </svg>
);

const TikTokIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48">
    <rect width="24" height="24" rx="5" fill="#010101"/>
    <path d="M16.5 5.5c.4 1.7 1.5 2.8 3 3v2.2c-1-.1-2-.4-3-1v4.8c0 2.5-2 4.5-4.5 4.5S7.5 17 7.5 14.5 9.5 10 12 10c.2 0 .3 0 .5.02V12.3c-.17-.03-.33-.05-.5-.05-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2V5.5h2.5z" fill="white"/>
  </svg>
);

const snsAccounts = [
  {
    name: '投資用Instagram',
    icon: <InstagramIcon gradientId="ig-sns-toushi" />,
    url: 'https://www.instagram.com/onzaestatetoushi',
  },
  {
    name: '賃貸用Instagram',
    icon: <InstagramIcon gradientId="ig-sns-chintai" />,
    url: 'https://www.instagram.com/onzaestate',
  },
  {
    name: '投資用TikTok',
    icon: <TikTokIcon />,
    url: 'https://www.tiktok.com/@onzaestatefudosantoushi',
  },
  {
    name: '賃貸用TikTok',
    icon: <TikTokIcon />,
    url: 'https://www.tiktok.com/@onzaestate',
  },
];

export default function SnsLinks() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-12">
          InstagramとTikTokでも発信しています。
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {snsAccounts.map((account, index) => (
            <a
              key={index}
              href={account.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow text-center"
            >
              <div className="flex justify-center mb-4">{account.icon}</div>
              <p className="font-light text-sm">{account.name}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
