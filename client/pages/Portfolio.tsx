import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ExternalLink,
  TrendingUp,
  Clock,
  Users,
  ShoppingCart,
  Calendar,
  Coffee,
  Wrench,
  Palette,
  Heart,
  Building,
  Zap,
} from "lucide-react";

export default function Portfolio() {
  const projects = [
    {
      title: "Artisan Coffee Co.",
      description:
        "A modern e-commerce website for a local coffee roastery, featuring online ordering, subscription services, and a blog about coffee culture.",
      image: "/portfolio-artisan-coffee.png",
      category: "E-commerce",
      package: "E Commerce Site",
      impact: "50% increase in online orders",
      timeline: "4 weeks",
      features: ["E-commerce", "Subscription System", "Blog", "Mobile App"],
      icon: Coffee,
      gradient: "from-amber-500/20 to-orange-500/20",
    },
    {
      title: "TechFix Solutions",
      description:
        "Professional services website for an IT repair company, with appointment booking, service catalog, and customer testimonials.",
      image: "/portfolio-techfix.png",
      category: "Professional Services",
      package: "CMS Site",
      impact: "200% increase in bookings",
      timeline: "3 weeks",
      features: ["Booking System", "Service Catalog", "Testimonials", "SEO"],
      icon: Wrench,
      gradient: "from-blue-500/20 to-indigo-500/20",
    },
    {
      title: "Bloom & Co. Florist",
      description:
        "Beautiful showcase website for a premium florist, featuring a portfolio gallery, custom arrangement quotes, and seasonal collections.",
      image: "/portfolio-bloom.png",
      category: "Creative/Retail",
      package: "CMS Site",
      impact: "75% increase in inquiries",
      timeline: "2 weeks",
      features: ["Gallery", "Quote System", "Seasonal Updates", "Social Media"],
      icon: Heart,
      gradient: "from-pink-500/20 to-rose-500/20",
    },
    {
      title: "Metro Design Studio",
      description:
        "Portfolio website for an architecture firm, showcasing projects with interactive galleries, team profiles, and a modern design aesthetic.",
      image: "/portfolio-metro-design.png",
      category: "Professional Portfolio",
      package: "CMS Site",
      impact: "90% increase in project inquiries",
      timeline: "3 weeks",
      features: [
        "Project Gallery",
        "Team Profiles",
        "Interactive Design",
        "Awards",
      ],
      icon: Building,
      gradient: "from-slate-500/20 to-gray-500/20",
    },
    {
      title: "Wellness Haven Spa",
      description:
        "Serene and calming website for a luxury spa, featuring service menus, online booking, membership programs, and wellness blog.",
      image: "/portfolio-wellness-haven.png",
      category: "Health & Wellness",
      package: "E Commerce Site",
      impact: "150% increase in bookings",
      timeline: "5 weeks",
      features: ["Online Booking", "Membership Portal", "Blog", "Gift Cards"],
      icon: Palette,
      gradient: "from-green-500/20 to-emerald-500/20",
    },
    {
      title: "Lightning Electric",
      description:
        "Professional website for an electrical contractor, featuring emergency services, project galleries, and easy contact options.",
      image: "/portfolio-lightning-electric.png",
      category: "Contractor Services",
      package: "Static Site",
      impact: "120% increase in calls",
      timeline: "1 week",
      features: [
        "Emergency Contact",
        "Project Gallery",
        "Service Areas",
        "Reviews",
      ],
      icon: Zap,
      gradient: "from-yellow-500/20 to-orange-500/20",
    },
  ];

  const categories = [
    "All",
    "E-commerce",
    "Professional Services",
    "Creative/Retail",
    "Health & Wellness",
    "Contractor Services",
  ];

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            Our Work
          </h1>
          <p className="text-xl text-muted-foreground leading-8">
            Take a look at some of the beautiful, high-performance websites
            we've created for our clients. Each project showcases our commitment
            to speed, design, and results.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-16">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={category === "All" ? "default" : "secondary"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2"
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300 hover:border-primary/50"
            >
              {/* Project Image */}
              <div
                className={`relative h-48 bg-gradient-to-br ${project.gradient} flex items-center justify-center`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="text-xs">
                    {project.package}
                  </Badge>
                </div>
              </div>

              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-1">
                      {project.category}
                    </CardDescription>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors opacity-0 group-hover:opacity-100" />
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Key Results */}
                <div className="grid grid-cols-2 gap-4 py-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-green-500" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Impact
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {project.impact}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Timeline
                      </div>
                      <div className="text-sm font-medium text-foreground">
                        {project.timeline}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <div className="text-xs text-muted-foreground mb-2">
                    Key Features
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.features.map((feature, featureIndex) => (
                      <Badge
                        key={featureIndex}
                        variant="outline"
                        className="text-xs px-2 py-1"
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Results Section */}
        <div className="mb-20">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Results That Speak for Themselves
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Our websites don't just look great—they deliver measurable
                  results for our clients' businesses.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    150%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average increase in conversions
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    2.5s
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average page load time
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    98%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Client satisfaction rate
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">
                    50+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Successful projects delivered
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Client Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it—hear from our satisfied clients
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center">
                    <Coffee className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      Sarah Chen
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Owner, Artisan Coffee Co.
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "Staticfish transformed our online presence completely. The
                  new website is not only beautiful but has increased our online
                  sales by 50%. The team was professional and delivered exactly
                  what we needed."
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full flex items-center justify-center">
                    <Wrench className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      Mike Rodriguez
                    </div>
                    <div className="text-sm text-muted-foreground">
                      CEO, TechFix Solutions
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "The booking system integration was seamless, and we've seen a
                  200% increase in online bookings. The website loads incredibly
                  fast and looks great on all devices. Highly recommended!"
                </p>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      Emma Thompson
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Founder, Bloom & Co. Florist
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "Working with Staticfish was a pleasure. They captured the
                  essence of our brand perfectly, and the gallery showcase has
                  helped us attract higher-end clients. The results speak for
                  themselves."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a website that drives real
            results for your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/contact">Start Your Project</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/pricing">View Our Packages</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
