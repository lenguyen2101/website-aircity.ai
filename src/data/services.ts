export interface Service {
    id: string;
    icon: string;
    title: string;
    description: string;
    features: string[];
}

const servicesData: Record<string, Service[]> = {
    vi: [
        {
            id: 'smart-building',
            icon: 'building',
            title: 'Quản lý Tòa nhà Thông minh',
            description: 'Hệ thống quản lý tòa nhà AI-powered, tự động hóa vận hành từ A-Z với chi phí tối ưu.',
            features: [
                'AI dự đoán bảo trì thiết bị',
                'Tự động hóa quy trình vận hành',
                'Dashboard quản lý real-time',
                'Tích hợp IoT sensors',
            ],
        },
        {
            id: 'face-recognition',
            icon: 'scan-face',
            title: 'Nhận diện Khuôn mặt AI',
            description: 'Hệ thống kiểm soát ra vào bằng nhận diện khuôn mặt, chính xác 99.9%, hoạt động 24/7.',
            features: [
                'Nhận diện real-time < 0.3s',
                'Kiểm soát cổng tự động',
                'Giám sát an ninh 24/7',
                'Chống giả mạo (Anti-spoofing)',
            ],
        },
        {
            id: 'resident-app',
            icon: 'smartphone',
            title: 'Ứng dụng Cư dân',
            description: 'App di động tiện ích cho cư dân: thanh toán, yêu cầu dịch vụ, thông báo tòa nhà.',
            features: [
                'Thanh toán tiện ích online',
                'Đặt dịch vụ vệ sinh, sửa chữa',
                'Thông báo & tin tức tòa nhà',
                'Quản lý khách ra vào',
            ],
        },
        {
            id: 'iot-platform',
            icon: 'cpu',
            title: 'Nền tảng IoT',
            description: 'Kết nối và quản lý hàng nghìn thiết bị IoT trong tòa nhà trên một nền tảng duy nhất.',
            features: [
                'Giám sát năng lượng real-time',
                'Kiểm soát chiếu sáng tự động',
                'Cảnh báo sự cố tức thì',
                'Phân tích dữ liệu & báo cáo',
            ],
        },
        {
            id: 'digital-payment',
            icon: 'credit-card',
            title: 'Thanh toán Số',
            description: 'Giải pháp thanh toán đa kênh tích hợp VietQR, chuyển khoản tự động và đối soát.',
            features: [
                'VietQR thanh toán nhanh',
                'Tự động gửi hóa đơn qua Zalo',
                'Đối soát tự động 24/7',
                'Dashboard doanh thu real-time',
            ],
        },
        {
            id: 'consulting',
            icon: 'lightbulb',
            title: 'Dịch vụ Tư vấn',
            description: 'Đội ngũ chuyên gia tư vấn chiến lược chuyển đổi số cho bất động sản và tòa nhà.',
            features: [
                'Khảo sát & đánh giá hiện trạng',
                'Lộ trình chuyển đổi theo giai đoạn',
                'Đào tạo & chuyển giao',
                'Hỗ trợ kỹ thuật 24/7',
            ],
        },
    ],
    en: [
        {
            id: 'smart-building',
            icon: 'building',
            title: 'Smart Building Management',
            description: 'AI-powered building management system, automating operations from A-Z with optimized costs.',
            features: [
                'AI equipment maintenance prediction',
                'Operational process automation',
                'Real-time management dashboard',
                'IoT sensors integration',
            ],
        },
        {
            id: 'face-recognition',
            icon: 'scan-face',
            title: 'AI Face Recognition',
            description: 'Face recognition access control system, 99.9% accurate, operating 24/7.',
            features: [
                'Real-time recognition < 0.3s',
                'Automated gate control',
                '24/7 security monitoring',
                'Anti-spoofing technology',
            ],
        },
        {
            id: 'resident-app',
            icon: 'smartphone',
            title: 'Resident Application',
            description: 'Utility mobile app for residents: payments, service requests, building notifications.',
            features: [
                'Online utility payments',
                'Cleaning & repair service booking',
                'Building news & notifications',
                'Visitor management',
            ],
        },
        {
            id: 'iot-platform',
            icon: 'cpu',
            title: 'IoT Platform',
            description: 'Connect and manage thousands of IoT devices in the building on a single platform.',
            features: [
                'Real-time energy monitoring',
                'Automated lighting control',
                'Instant incident alerts',
                'Data analysis & reporting',
            ],
        },
        {
            id: 'digital-payment',
            icon: 'credit-card',
            title: 'Digital Payment',
            description: 'Multi-channel payment solution integrating VietQR, automated transfers, and reconciliation.',
            features: [
                'Fast VietQR payment',
                'Automated invoices via Zalo',
                '24/7 automated reconciliation',
                'Real-time revenue dashboard',
            ],
        },
        {
            id: 'consulting',
            icon: 'lightbulb',
            title: 'Digital Transformation Consulting',
            description: 'Team of experts providing digital transformation strategy for real estate and buildings.',
            features: [
                'Survey & current state assessment',
                'Phase-based transformation roadmap',
                'Training & technology transfer',
                '24/7 technical support',
            ],
        },
    ],
};

export function getServices(lang: string = 'vi'): Service[] {
    return servicesData[lang] || servicesData.vi;
}

// Backward compatibility exports
export const services = servicesData.vi;
export const servicesEn = servicesData.en;
