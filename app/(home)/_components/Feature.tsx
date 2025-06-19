import { featureCard } from '@/constants';
import React from 'react';
import { IconType } from 'react-icons/lib';
import { BiCog } from 'react-icons/bi';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function Feature() {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <BiCog className="h-8 w-8 text-primary" />
          <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Powerful Features
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the comprehensive toolkit that makes Neotion the ultimate
          workspace for modern teams
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {featureCard.map((feature, index) => (
          <FeatureBox key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
}

const FeatureBox = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: IconType;
  index: number;
}) => {
  const Icon = icon;

  return (
    <Card className="group relative overflow-hidden border-0 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
            <Icon className="h-6 w-6" />
          </div>
          {index < 2 && (
            <Badge variant="secondary" className="text-xs">
              Popular
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors duration-300">
          {title}
        </CardTitle>
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>

      {/* Animated border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </Card>
  );
};
