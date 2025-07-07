import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Zap,
  Shield,
  DollarSign,
  Globe,
  Search,
  MessageSquare,
  BarChart3,
  ShoppingCart,
  Workflow,
} from "lucide-react";

export default function Services() {
  const features = {
    starter: [
      { icon: Globe, text: "Up to 5 static pages" },
      { icon: CheckCircle, text: "Fully responsive design" },
      { icon: MessageSquare, text: "Contact form integration" },
      { icon: Search, text: "Basic SEO optimization" },
      { icon: Zap, text: "Lightning-fast loading speeds" },
      { icon: Shield, text: "SSL certificate included" },
    ],
    growth: [
      { icon: Globe, text: "Everything in Starter" },
      { icon: BarChart3, text: "Blog & Content Management System" },
      { icon: Search, text: "Advanced SEO & meta optimization" },
      { icon: BarChart3, text: "Google Analytics integration" },
      { icon: Shield, text: "Enhanced security features" },
      { icon: MessageSquare, text: "Newsletter signup forms" },
    ],
    scale: [
      { icon: Globe, text: "Everything in Growth" },
      { icon: ShoppingCart, text: "E-commerce integration" },
      { icon: Workflow, text: "Custom API integrations" },
      { icon: BarChart3, text: "Advanced analytics & tracking" },
      { icon: Shield, text: "Priority support & maintenance" },
      { icon: Zap, text: "Custom performance optimizations" },
    ],
  };

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            Our Services
          </h1>
          <p className="text-xl text-muted-foreground leading-8">
            We specialize in creating high-performance static websites that are
            fast, secure, and built to scale with your business. Choose from our
            three carefully crafted packages designed for different business
            needs.
          </p>
        </div>

        {/* Services Overview */}
        <div className="grid gap-16 lg:gap-24">
          {/* Starter Package */}
          <div className="relative">
            <Card className="overflow-hidden border-border bg-card">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
              <CardHeader className="pb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold">
                      Starter Package
                    </CardTitle>
                    <CardDescription className="text-lg mt-2">
                      Perfect for small businesses just getting started online
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">$999</span>
                  <span className="text-muted-foreground">one-off</span>
                  <span className="text-sm text-muted-foreground ml-4">
                    + $29/month hosting
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <p className="text-muted-foreground leading-7">
                  Our Starter package is ideal for small businesses,
                  freelancers, and entrepreneurs who need a professional online
                  presence without the complexity. Get a beautiful, fast website
                  that showcases your business and converts visitors into
                  customers.
                </p>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    What's Included
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {features.starter.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <feature.icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-muted-foreground">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link to="/contact">Get Started with Starter</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Growth Package */}
          <div className="relative">
            <Card className="overflow-hidden border-primary/50 bg-card ring-1 ring-primary/20">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
              <div className="absolute -top-3 left-8">
                <span className="bg-primary text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-full">
                  Most Popular
                </span>
              </div>
              <CardHeader className="pb-8 pt-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold">
                      Growth Package
                    </CardTitle>
                    <CardDescription className="text-lg mt-2">
                      Ideal for growing businesses that need content management
                      and advanced SEO
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">
                    $1,999
                  </span>
                  <span className="text-muted-foreground">one-off</span>
                  <span className="text-sm text-muted-foreground ml-4">
                    + $49/month hosting
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <p className="text-muted-foreground leading-7">
                  The Growth package is perfect for established businesses ready
                  to scale their online presence. With advanced SEO, content
                  management capabilities, and enhanced analytics, you'll have
                  everything needed to grow your audience and drive conversions.
                </p>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    What's Included
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {features.growth.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <feature.icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-muted-foreground">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link to="/contact">Get Started with Growth</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Scale Package */}
          <div className="relative">
            <Card className="overflow-hidden border-border bg-card">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
              <CardHeader className="pb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <DollarSign className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-3xl font-bold">
                      Scale Package
                    </CardTitle>
                    <CardDescription className="text-lg mt-2">
                      For established businesses ready to take their online
                      presence to the next level
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-primary">
                    $3,999
                  </span>
                  <span className="text-muted-foreground">one-off</span>
                  <span className="text-sm text-muted-foreground ml-4">
                    + $99/month hosting
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <p className="text-muted-foreground leading-7">
                  Our Scale package is designed for businesses that need
                  enterprise-level features and custom integrations. Perfect for
                  e-commerce, complex business processes, and organizations
                  requiring specialized functionality with priority support.
                </p>

                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-6">
                    What's Included
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {features.scale.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <feature.icon className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-muted-foreground">
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link to="/contact">Get Started with Scale</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Not sure which package is right for you? Get in touch and we'll help
            you choose the perfect solution for your business needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/contact">Contact Us</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/pricing">View Detailed Pricing</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
