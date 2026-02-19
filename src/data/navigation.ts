// Navigation items are built dynamically in Header.astro via i18n utils.
// This file only exports company info used by Footer and contact pages.

export interface SocialLinks {
  facebook: string;
  linkedin: string;
  youtube: string;
}

export interface CompanyInfo {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  address: string;
  social: SocialLinks;
}

export const companyInfo: CompanyInfo = {
  name: 'AirCity',
  tagline: 'Smart Building. Smart Living.',
  description: 'Nền tảng quản lý tòa nhà thông minh hàng đầu Việt Nam, ứng dụng AI & IoT để tối ưu vận hành và nâng cao trải nghiệm cư dân.',
  email: 'contact@aircity.ai',
  phone: '+84 28 1234 5678',
  address: 'Tầng 12, Tòa nhà ABC Tower, Quận 1, TP. Hồ Chí Minh',
  social: {
    facebook: 'https://facebook.com/aircity.ai',
    linkedin: 'https://linkedin.com/company/aircity',
    youtube: 'https://youtube.com/@aircity',
  },
};
