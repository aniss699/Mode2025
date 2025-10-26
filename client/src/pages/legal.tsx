import { useLanguage } from '@/hooks/use-language';

export default function Legal() {
  const { t } = useLanguage();
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
          {t('legal.title')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('legal.lastUpdate')} : {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('legal.editor.title')}</h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-2">
            <p><strong>{t('legal.editor.company')} :</strong> FashionHub</p>
            <p><strong>{t('legal.editor.address')} :</strong> À définir</p>
            <p><strong>{t('legal.editor.email')} :</strong> contact@fashionhub.fr</p>
            <p><strong>{t('legal.editor.director')} :</strong> À définir</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('legal.hosting.title')}</h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-2">
            <p><strong>{t('legal.hosting.host')} :</strong> Replit</p>
            <p><strong>{t('legal.hosting.address')} :</strong> San Francisco, CA, USA</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('legal.data.title')}</h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-4">
            <p>{t('legal.data.intro')}</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('legal.data.name')}</li>
              <li>{t('legal.data.email')}</li>
              <li>{t('legal.data.photos')}</li>
              <li>{t('legal.data.profile')}</li>
              <li>{t('legal.data.navigation')}</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('legal.usage.title')}</h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-4">
            <p>{t('legal.usage.intro')}</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('legal.usage.account')}</li>
              <li>{t('legal.usage.wardrobe')}</li>
              <li>{t('legal.usage.share')}</li>
              <li>{t('legal.usage.recommendations')}</li>
              <li>{t('legal.usage.improve')}</li>
              <li>{t('legal.usage.notifications')}</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('legal.rights.title')}</h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-4">
            <p>{t('legal.rights.intro')}</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>{t('legal.rights.access')}</li>
              <li>{t('legal.rights.rectification')}</li>
              <li>{t('legal.rights.erasure')}</li>
              <li>{t('legal.rights.portability')}</li>
              <li>{t('legal.rights.objection')}</li>
            </ul>
            <p className="mt-4">
              {t('legal.rights.contact')}
              <a href="mailto:contact@fashionhub.fr" className="text-pink-600 hover:underline ml-1">
                contact@fashionhub.fr
              </a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('legal.terms.title')}</h2>
          <div className="text-gray-700 dark:text-gray-300 space-y-4">
            <h3 className="text-lg font-semibold">{t('legal.terms.article1.title')}</h3>
            <p>{t('legal.terms.article1.content')}</p>

            <h3 className="text-lg font-semibold mt-6">{t('legal.terms.article2.title')}</h3>
            <p>{t('legal.terms.article2.intro')}</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>{t('legal.terms.article2.service1')}</li>
              <li>{t('legal.terms.article2.service2')}</li>
              <li>{t('legal.terms.article2.service3')}</li>
              <li>{t('legal.terms.article2.service4')}</li>
              <li>{t('legal.terms.article2.service5')}</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6">{t('legal.terms.article3.title')}</h3>
            <p>{t('legal.terms.article3.content')}</p>

            <h3 className="text-lg font-semibold mt-6">{t('legal.terms.article4.title')}</h3>
            <p>{t('legal.terms.article4.content')}</p>

            <h3 className="text-lg font-semibold mt-6">{t('legal.terms.article5.title')}</h3>
            <p>{t('legal.terms.article5.content')}</p>

            <h3 className="text-lg font-semibold mt-6">{t('legal.terms.article6.title')}</h3>
            <p>{t('legal.terms.article6.content')}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('legal.cookies.title')}</h2>
          <div className="text-gray-700 dark:text-gray-300">
            <p>{t('legal.cookies.content')}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('legal.ip.title')}</h2>
          <div className="text-gray-700 dark:text-gray-300">
            <p>{t('legal.ip.content')}</p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('legal.contact.title')}</h2>
          <div className="text-gray-700 dark:text-gray-300">
            <p>
              {t('legal.contact.content')}
              <a href="mailto:contact@fashionhub.fr" className="text-pink-600 hover:underline ml-1">
                contact@fashionhub.fr
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
