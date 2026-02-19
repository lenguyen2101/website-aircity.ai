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
  email: 'hello@aircity.ai',
  phone: '028 3970 6884',
  address: 'Tòa nhà Petrovietnam Landmark - 65 Mai Chí Thọ, Phường Bình Trưng, TP. Hồ Chí Minh',
  social: {
    facebook: 'https://facebook.com/aircity.ai',
    linkedin: 'https://linkedin.com/company/aircity',
    youtube: 'https://youtube.com/@aircity',
  },
};
