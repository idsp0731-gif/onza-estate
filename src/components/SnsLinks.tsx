const snsAccounts = [
  {
    name: '投資用Instagram',
    icon: '📸',
    url: 'https://www.instagram.com/onzaestatetoushi',
  },
  {
    name: '賃貸用Instagram',
    icon: '📸',
    url: 'https://www.instagram.com/onzaestate',
  },
  {
    name: '投資用TikTok',
    icon: '🎵',
    url: 'https://www.tiktok.com/@onzaestatefudosantoushi',
  },
  {
    name: '賃貸用TikTok',
    icon: '🎵',
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
              <div className="text-4xl mb-4">{account.icon}</div>
              <p className="font-light text-sm">{account.name}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}