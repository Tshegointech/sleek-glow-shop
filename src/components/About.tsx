import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Users, ShieldCheck, Microscope } from 'lucide-react';

const About = () => {
  const features = [
    {
      icon: Microscope,
      title: 'Scientific Research',
      description: 'All our products are backed by extensive scientific research and clinical studies.'
    },
    {
      icon: Award,
      title: 'Dermatologist Approved',
      description: 'Formulated and tested by leading dermatologists and skincare professionals.'
    },
    {
      icon: ShieldCheck,
      title: 'Medical Grade',
      description: 'Hospital-grade ingredients and manufacturing standards for premium quality.'
    },
    {
      icon: Users,
      title: 'Trusted by Thousands',
      description: 'Over 10,000 satisfied customers worldwide trust our skincare solutions.'
    }
  ];

  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <Badge className="mb-4 bg-accent text-accent-foreground">ABOUT ESIHLE SKIN HAIR</Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Where <span className="text-accent">Nature</span> Meets Beauty
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Founded with a passion for natural beauty and skin health, Esihle Skin Hair represents 
                the perfect blend of premium skincare and haircare solutions. Our mission is to provide 
                effective, gentle products that enhance your natural beauty.
              </p>
              <p>
                Every product in our collection is carefully formulated using high-quality ingredients 
                and proven formulations. We believe that healthy skin and beautiful hair are the 
                foundation of confidence, and our products are designed to deliver visible, lasting results.
              </p>
              <p>
                From sourcing the finest ingredients to maintaining strict quality standards, we ensure 
                that every product meets our high specifications for safety, efficacy, and customer 
                satisfaction.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="elegant-transition hover:shadow-lg group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-accent/10 rounded-full flex items-center justify-center group-hover:bg-accent/20 smooth-transition">
                    <feature.icon className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-gradient-subtle rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-center mb-12">
            Trusted by Professionals Worldwide
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-accent mb-2">50+</div>
              <div className="text-muted-foreground">Clinical Studies</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">10K+</div>
              <div className="text-muted-foreground">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">98%</div>
              <div className="text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-accent mb-2">25+</div>
              <div className="text-muted-foreground">Countries Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;