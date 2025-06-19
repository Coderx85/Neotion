import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FaFileAlt,
  FaUsers,
  FaSearch,
  FaMobile,
  FaLock,
  FaPalette,
  FaBolt,
} from 'react-icons/fa';
import { MdShare, MdFolder } from 'react-icons/md';

interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge?: string;
}

const features: Feature[] = [
  {
    icon: FaFileAlt,
    title: 'Rich Block Editor',
    description:
      'Create beautiful documents with our powerful block-based editor. Add headings, lists, images, tables, and more with drag-and-drop simplicity.',
    badge: 'Core',
  },
  {
    icon: MdShare,
    title: 'Real-time Collaboration',
    description:
      'Work together seamlessly with your team. See live cursors, instant changes, and collaborate in real-time across all devices.',
    badge: 'Pro',
  },
  {
    icon: MdFolder,
    title: 'Smart Organization',
    description:
      'Keep all your documents organized with nested pages, tags, and powerful filtering. Create your perfect workspace structure.',
  },
  {
    icon: FaUsers,
    title: 'Team Workspaces',
    description:
      'Create shared workspaces for your team. Manage permissions, invite members, and control access to sensitive content.',
    badge: 'Team',
  },
  {
    icon: FaSearch,
    title: 'Instant Search',
    description:
      'Find anything instantly with full-text search across all your documents, comments, and content. Never lose important information.',
  },
  {
    icon: FaMobile,
    title: 'Cross-Platform Sync',
    description:
      'Access your workspace from anywhere. Native apps for web, mobile, and desktop with seamless synchronization.',
  },
  {
    icon: FaLock,
    title: 'Enterprise Security',
    description:
      'Bank-level encryption, SSO integration, and compliance certifications. Your data is always protected and private.',
    badge: 'Enterprise',
  },
  {
    icon: FaPalette,
    title: 'Beautiful Themes',
    description:
      'Customize your workspace with beautiful themes, custom fonts, and personalized layouts that match your style.',
  },
  {
    icon: FaBolt,
    title: 'Lightning Performance',
    description:
      'Built for speed with modern technology. Experience instant loading, smooth scrolling, and responsive interactions.',
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need for modern documentation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you and your team create,
            collaborate, and organize knowledge more effectively than ever
            before.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="relative">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <feature.icon className="h-8 w-8 text-primary" />
                  {feature.badge && (
                    <Badge variant="secondary" className="text-xs">
                      {feature.badge}
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
