import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Verified Customer",
      content: "The Vitamin C serum completely transformed my skin. I've never had such clear, glowing skin before. The results were visible within just two weeks!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Dr. Michael Chen",
      role: "Dermatologist",
      content: "As a dermatologist, I'm impressed by the quality and efficacy of DermaLux products. I regularly recommend them to my patients with confidence.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Emma Rodriguez",
      role: "Verified Customer",
      content: "The night cream is absolutely amazing! My skin feels so much smoother and hydrated. I wake up with baby-soft skin every morning.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-accent text-accent-foreground">TESTIMONIALS</Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            What Our <span className="text-accent">Customers</span> Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real results from real people who trust DermaLux for their skincare needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg smooth-transition">
              <CardContent className="p-6">
                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-accent fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.content}"
                </p>

                {/* Customer Info */}
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="mt-20 bg-gradient-subtle rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-3xl font-bold mb-4">
            Stay Updated with Skincare Tips
          </h3>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get expert skincare advice, product updates, and exclusive offers delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-input bg-background focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button className="bg-accent text-accent-foreground px-8 py-3 rounded-full font-semibold hover:bg-accent/90 smooth-transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;