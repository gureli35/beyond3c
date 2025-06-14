import React, { useState } from 'react';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/context/LanguageContext';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 3000);
  };

  return (
    <section className="section-padding bg-secondary-600">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 
            className="font-montserrat font-bold text-4xl md:text-5xl mb-6 text-accent-500"
            data-aos="fade-up"
          >
            <span className="text-gradient">{t('about.contact')}</span>
          </h2>
          <p 
            className="text-lg md:text-xl text-accent-500 max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {t('about.contactDescription')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div data-aos="fade-right">
            <div className="card">
              <h3 className="font-montserrat font-bold text-2xl mb-6 text-accent-500">
                {t('contact.formTitle')}
              </h3>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-accent-500 text-lg font-medium">
                    {t('contact.successMessage')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-accent-500 mb-2">
                      {t('contact.name')} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="form-input w-full"
                      placeholder={t('contact.namePlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-accent-500 mb-2">
                      {t('contact.email')} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="form-input w-full"
                      placeholder={t('contact.emailPlaceholder')}
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-accent-500 mb-2">
                      {t('contact.subject')} *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="form-select w-full"
                    >
                      <option value="">{t('contact.selectSubject')}</option>
                      <option value="general">{t('contact.subjects.general')}</option>
                      <option value="collaboration">{t('contact.subjects.collaboration')}</option>
                      <option value="resource">{t('contact.subjects.resource')}</option>
                      <option value="story">{t('contact.subjects.story')}</option>
                      <option value="media">{t('contact.subjects.media')}</option>
                      <option value="volunteer">{t('contact.subjects.volunteer')}</option>
                      <option value="feedback">{t('contact.subjects.feedback')}</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-accent-500 mb-2">
                      {t('contact.message')} *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="form-textarea w-full"
                      placeholder={t('contact.messagePlaceholder')}
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t('contact.sending') : t('contact.sendMessage')}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div data-aos="fade-left">
            <div className="space-y-8">
              {/* Email */}
              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-lg mb-2 text-neutral-100">
                      {t('common.email')}
                    </h3>
                    <p className="text-neutral-100 mb-2">
                      {t('contact.emailDescription')}
                    </p>
                    <a href="mailto:info@beyond2c.org" className="text-primary-500 hover:text-primary-400 font-medium">
                      info@beyond2c.org
                    </a>
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-secondary-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-lg mb-2 text-neutral-100">
                      {t('contact.headquarters')}
                    </h3>
                    <p className="text-red-600">
                      {t('contact.location')}<br />
                      {t('contact.locationDescription')}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="card">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-montserrat font-semibold text-lg mb-2 text-neutral-100">
                      {t('about.globalMovement')}
                    </h3>
                    <p className="text-neutral-100 mb-4">
                      {t('about.globalMovementDescription')}
                    </p>
                    <div className="flex space-x-4">
                      <a 
                        href="#" 
                        className="text-primary-500 hover:text-primary-400 font-medium"
                      >
                        {t('about.followOnInstagram')}
                      </a>
                      <a 
                        href="#" 
                        className="text-primary-500 hover:text-primary-400 font-medium"
                      >
                        {t('about.followOnTwitter')}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
