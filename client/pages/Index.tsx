import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Zap, Shield, DollarSign } from "lucide-react";
import React from "react";

export default function Index() {
  const heroImages = [
    "/hero-1.png",
    "/hero-2.png",
    "/hero-3.png",
    "/hero-4.png",
    "/hero-5.png",
  ];

  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1,
      );
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[500px] sm:h-[600px] lg:h-[700px] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          {heroImages.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`Hero image ${index + 1}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "opacity 1s ease-in-out",
                opacity: index === currentImageIndex ? 1 : 0,
                zIndex: 10,
              }}
            />
          ))}
          <div
            className="absolute inset-0 bg-black"
            style={{ opacity: 0.6, zIndex: 20 }}
          />
        </div>
        <div
          className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          style={{ zIndex: 30 }}
        >
          <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Fast, static sites for{" "}
              <span className="text-primary">small businesses</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300 sm:text-xl">
              We build blazing-fast, secure, and reliable websites that just
              work. No bloat, no hassle—just performance that drives results.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="text-base px-8 py-3">
                <Link to="/pricing">
                  View Pricing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="text-base px-8 py-3 border-gray-400 text-white hover:bg-white hover:text-black"
              >
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-24 sm:py-32 bg-muted/50">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Our Packages
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose the perfect package for your business needs. All plans
              include fast hosting and ongoing support.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
            {/* Starter Package */}
            <Card className="relative bg-background border-primary shadow-lg ring-1 ring-primary/20">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <CardTitle>Static Site</CardTitle>
                </div>
                <CardDescription>
                  Perfect for small businesses just getting started online.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">
                      £149
                    </span>
                    <span className="text-sm text-muted-foreground">
                      one-off
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className="text-sm text-muted-foreground">
                      + £50/month hosting
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    Up to 4 pages (£10 per additional page)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    Responsive design (Mobile and Desktop)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    Contact form integration (1000 requests per month)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    CSP & SSL (Content Security Policy & Secure Sockets Layer)
                  </li>
                </ul>
                <Button asChild className="w-full">
                  <Link to="/pricing">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Growth Package */}
            <Card className="relative bg-background border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <CardTitle>CMS Site</CardTitle>
                </div>
                <CardDescription>
                  Ideal for small businesses that need a content management
                  system.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">
                      £249
                    </span>
                    <span className="text-sm text-muted-foreground">
                      one-off
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className="text-sm text-muted-foreground">
                      + £50/month hosting
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    Everything in Static Site (No page limit)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    Blog & CMS ( Admin Login )
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />2
                    Login Admin Users ( Publish and Update content )
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    Manage your website content via sanity cms ( easy to use )
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/pricing">Learn More</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Scale Package */}
            <Card className="relative bg-background border-border hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <CardTitle>E Commerce Site</CardTitle>
                </div>
                <CardDescription>
                  For established businesses ready to take their store online.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-bold text-foreground">
                      £399
                    </span>
                    <span className="text-sm text-muted-foreground">
                      one-off
                    </span>
                  </div>
                  <div className="mt-1">
                    <span className="text-sm text-muted-foreground">
                      + £50/month hosting
                    </span>
                  </div>
                </div>
                <ul className="space-y-3 text-sm text-muted-foreground mb-6">
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    Everything in CMS Site ( excluding CMS )
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    CMS (optional +£80 )
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    E-commerce integration (Shopify, WooCommerce, etc.)
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    Multiple payment options (Stripe, PayPal, etc.)
                  </li>
                </ul>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/pricing">Learn More</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
