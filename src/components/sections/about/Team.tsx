import React from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

// Toggle this to true when you want to show the team section again
const SHOW_TEAM_SECTION = false;

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  };
}

const Team: React.FC = () => {
  const { t, language } = useLanguage();
  
  const teamMembers: TeamMember[] = [
    {
      name: 'Furkan',
      role: language === 'tr' ? 'Kurucu & CEO' : 'Founder & CEO',
      bio: language === 'tr' 
        ? 'İklim değişikliği konusunda tutkulu bir aktivist. Teknoloji ve sürdürülebilirlik alanlarında deneyimli.'
        : 'A passionate activist on climate change. Experienced in technology and sustainability fields.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face',
      social: {
        linkedin: '#',
        instagram: '#',
      },
    },
    {
      name: language === 'tr' ? 'Elif Yılmaz' : 'Elif Yilmaz',
      role: language === 'tr' ? 'İçerik Direktörü' : 'Content Director',
      bio: language === 'tr'
        ? 'Çevre bilimleri mezunu. İklim iletişimi ve topluluk yönetimi konularında uzman.'
        : 'Environmental sciences graduate. Expert in climate communication and community management.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c4e402f7?w=300&h=300&fit=crop&crop=face',
      social: {
        linkedin: '#',
        twitter: '#',
      },
    },
    {
      name: 'Mehmet Kaya',
      role: language === 'tr' ? 'Teknik Direktör' : 'Technical Director',
      bio: language === 'tr'
        ? 'Full-stack developer ve veri analisti. Sürdürülebilir teknoloji çözümleri geliştirme konusunda deneyimli.'
        : 'Full-stack developer and data analyst. Experienced in developing sustainable technology solutions.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face',
      social: {
        linkedin: '#',
      },
    },
    {
      name: language === 'tr' ? 'Zeynep Özkan' : 'Zeynep Ozkan',
      role: language === 'tr' ? 'Topluluk Yöneticisi' : 'Community Manager',
      bio: language === 'tr'
        ? 'Sosyal medya uzmanı ve genç aktivist. Dijital kampanyalar ve etkinlik organizasyonu alanında tecrübeli.'
        : 'Social media specialist and young activist. Experienced in digital campaigns and event organization.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face',
      social: {
        instagram: '#',
        twitter: '#',
      },
    },
  ];

  return (
    <section className="section-padding bg-secondary-600">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 
            className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-accent-500"
            data-aos="fade-up"
          >
            <span className="text-gradient">{t('about.teamTitle')}</span>
          </h2>
          <p 
            className="text-lg md:text-xl text-accent-500 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t('about.teamDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="card text-center"
              data-aos="fade-up"
              data-aos-delay={300 + index * 100}
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              
              <h3 className="font-montserrat font-bold text-xl mb-2 text-accent-500">
                {member.name}
              </h3>
              
              <p className="text-primary-600 font-semibold mb-4">
                {member.role}
              </p>
              
              <p className="text-accent-500 text-sm mb-6 leading-relaxed">
                {member.bio}
              </p>
              
              <div className="flex justify-center space-x-4">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-primary-500 transition-colors duration-200"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
                
                {member.social.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-primary-500 transition-colors duration-200"
                    aria-label={`${member.name} Twitter`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                )}
                
                {member.social.instagram && (
                  <a
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-primary-500 transition-colors duration-200"
                    aria-label={`${member.name} Instagram`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zm2.48 16.109c-.48.267-1.058.482-1.739.482-1.397 0-2.403-.549-2.848-1.487-.243-.51-.243-1.093-.243-1.676v-3.576c0-.583 0-1.166.243-1.676.445-.938 1.451-1.487 2.848-1.487.681 0 1.259.215 1.739.482.534.297.803.686.803 1.23v.273c0 .686-.455 1.013-1.13 1.013-.675 0-1.08-.327-1.08-1.013v-.273c0-.243-.134-.405-.377-.405-.351 0-.513.216-.513.594v4.049c0 .378.162.594.513.594.243 0 .377-.162.377-.405v-.273c0-.686.405-1.013 1.08-1.013.675 0 1.13.327 1.13 1.013v.273c0 .544-.269.933-.803 1.23z"/>
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div 
            className="bg-black rounded-2xl p-8 max-w-4xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="700"
          >
            <h3 className="font-montserrat font-bold text-2xl mb-4 text-neutral-900">
              🚀 {t('about.joinTeam')}
            </h3>
            <p className="text-neutral-700 mb-6">
              {t('about.joinTeamDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/careers" 
                className="btn-primary"
              >
                {t('about.openPositions')}
              </a>
              <a 
                href="/contact" 
                className="btn-outline"
              >
                {t('common.contactUs')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
