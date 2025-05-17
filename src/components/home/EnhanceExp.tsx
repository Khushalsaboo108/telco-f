import Image from "next/image";
import CertificateIcon from "../../../public/icons/home/certificate.svg";
import LearningIcon from "../../../public/icons/home/learn.svg";
import EnrollIcon from "../../../public/icons/home/enroll.svg";
import AccessIcon from "../../../public/icons/home/access.svg";
import GrowthIcon from "../../../public/icons/home/grow.svg";
import MoneyIcon from "../../../public/icons/home/value.svg";

export default function WhyTLXPSection() {
    const features = [
        {
            title: "Earn Industry-Recognized Certificates",
            description:
                "Complete courses and earn certificates trusted by telecom leaders, showcasing your skills and enhancing your career prospects.",
            icon: CertificateIcon,
        },
        {
            title: "Learn Anytime, Anywhere",
            description:
                "Access our platform 24/7 from any device, allowing you to balance learning with your busy personal and work schedule.",
            icon: LearningIcon,
        },
        {
            title: "Quick and Easy Enrollment",
            description:
                "Enroll in just a few clicks and instantly start exploring our rich library of telecom-specific learning programs and tools.",
            icon: EnrollIcon,
        },
        {
            title: "Year-Long Platform Access",
            description:
                "Enjoy uninterrupted access to all learning resources for a year, empowering you to revisit materials whenever needed.",
            icon: AccessIcon,
        },
        {
            title: "Grow Your Telecom Skills",
            description:
                "Master technical, leadership, and problem-solving skills that are critical for success in the fast-paced telecom industry.",
            icon: GrowthIcon,
        },
        {
            title: "Affordable Learning Solutions",
            description:
                "Benefit from premium-quality learning resources and expert-designed courses at a budget-friendly price tailored for your needs",
            icon: MoneyIcon,
        },
        {
            title: "Engaging & Interactive Learning",
            description:
                "Stay motivated with interactive features like quizzes, challenges, and leaderboards to make learning exciting and rewarding.",
            icon: AccessIcon,
        },
        {
            title: "Advanced Analytics for Progress Tracking",
            description:
                "Monitor your learning journey with detailed insights and reports to ensure you’re always on the right path to success.",
            icon: GrowthIcon,
        },
        {
            title: "Real-Life Case Studies and Simulations",
            description:
                "Learn from industry-specific examples and hands-on simulations to gain practical knowledge that directly applies to your job.",
            icon: MoneyIcon,
        },
    ];

    return (
        <div className="setBackgroundImage">
            <div className="max-w-[1204px] mx-auto py-40 p-commonPadding text-center">
                <p className="gradient-text text-textSizeMobile lg:text-textSizeDesktop font-medium">
                    ENHANCE YOUR CAREER
                </p>
                <h3 className="text-headingSizeMobile lg:text-headingSizeDesktop font-bold mt-2">Why TLXP?</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 bg-background">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="rounded-xl px-6 flex flex-col justify-center py-10 hover:shadow-2xl transition-shadow duration-300 border border-[rgba(0, 3, 45, 0.2)] dark:border-[rgba(239, 240, 239, 0.2)]"
                        >
                            <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4">
                                <Image
                                    src={feature.icon}
                                    alt={feature.title}
                                    width={50}
                                    height={50}
                                    className="dark:invert"
                                />
                            </div>
                            <h4 className="text-2xl font-semibold mb-2">{feature.title}</h4>
                            <p className="text-base text-gray-400">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
