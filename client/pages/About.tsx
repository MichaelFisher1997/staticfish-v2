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
  Zap,
  Shield,
  DollarSign,
  Users,
  Globe,
  Award,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Zap,
      title: "Speed First",
      description:
        "We prioritize performance above all else. Every website we build is optimized for lightning-fast loading times that keep visitors engaged.",
    },
    {
      icon: Shield,
      title: "Security & Reliability",
      description:
        "Your website should be a fortress. We implement industry-best security practices and ensure 99.9% uptime with reliable hosting infrastructure.",
    },
    {
      icon: DollarSign,
      title: "Affordable Excellence",
      description:
        "Quality web development shouldn't break the bank. We offer transparent, fair pricing that delivers exceptional value for small businesses.",
    },
  ];

  const teamMembers = [
    {
      name: "Jane Doe",
      role: "Founder & Lead Developer",
      bio: "With over 8 years of experience in web development and a passion for static site architecture, Jane founded Staticfish to help small businesses compete online with fast, secure websites.",
      avatar: "/placeholder.svg",
      expertise: ["React", "Next.js", "Performance Optimization", "JAMstack"],
      social: {
        github: "#",
        linkedin: "#",
        email: "jane@staticfish.com",
      },
      gradient: "from-blue-500/20 to-indigo-500/20",
    },
    {
      name: "John Smith",
      role: "UI/UX Designer",
      bio: "John brings creative vision and user-centered design thinking to every project. His designs are not just beautiful—they're strategically crafted to convert visitors into customers.",
      avatar: "/placeholder.svg",
      expertise: [
        "UI/UX Design",
        "Figma",
        "User Research",
        "Conversion Optimization",
      ],
      social: {
        github: "#",
        linkedin: "#",
        email: "john@staticfish.com",
      },
      gradient: "from-purple-500/20 to-pink-500/20",
    },
  ];

  const stats = [
    { number: "50+", label: "Websites Launched" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "2.5s", label: "Average Load Time" },
    { number: "3 Years", label: "In Business" },
  ];

  const milestones = [
    {
      year: "2022",
      title: "Staticfish Founded",
      description:
        "Started with a mission to make fast, affordable websites accessible to small businesses.",
    },
    {
      year: "2023",
      title: "20+ Successful Projects",
      description:
        "Reached our first milestone of 20 successful website launches with measurable results.",
    },
    {
      year: "2024",
      title: "50+ Websites Delivered",
      description:
        "Expanded our team and refined our processes to deliver even better results for clients.",
    },
    {
      year: "2025",
      title: "Looking Forward",
      description:
        "Continuing to innovate with new technologies and expanding our service offerings.",
    },
  ];

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            About Staticfish
          </h1>
          <p className="text-xl text-muted-foreground leading-8">
            We're on a mission to level the playing field for small businesses
            by providing them with the same high-performance web technology that
            enterprise companies use.
          </p>
        </div>

        {/* Our Story */}
        <section className="mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-muted-foreground leading-7">
                <p>
                  Staticfish was born from a simple observation: small
                  businesses were being left behind in the digital age. While
                  large corporations invested millions in fast, secure websites,
                  small business owners were stuck with slow, outdated solutions
                  that hurt their ability to compete online.
                </p>
                <p>
                  We founded Staticfish in 2022 with a clear mission: to provide
                  fast, secure, and affordable static websites that give small
                  businesses the competitive edge they deserve. Every website we
                  build leverages modern static site technology to deliver
                  enterprise-level performance at a fraction of the cost.
                </p>
                <p>
                  Today, we've helped over 50 small businesses transform their
                  online presence, resulting in measurable increases in traffic,
                  conversions, and revenue. But we're just getting started.
                </p>
              </div>
            </div>
            <div className="relative">
              <Card className="border-border bg-gradient-to-br from-primary/10 to-accent/10">
                <CardContent className="p-8">
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                      <Globe className="h-8 w-8 text-primary" />
                    </div>
                    <blockquote className="text-lg font-medium text-foreground">
                      "Fast websites shouldn't be a luxury reserved for big
                      corporations. Every business deserves to compete online
                      with confidence."
                    </blockquote>
                    <div className="text-sm text-muted-foreground">
                      — Jane Doe, Founder
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core principles guide everything we do and every decision we
              make for our clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="border-border text-center">
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-6">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="mb-24">
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-12">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Our Team */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet the passionate individuals behind Staticfish who are
              dedicated to your success.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="border-border overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div
                    className={`w-full sm:w-32 h-32 bg-gradient-to-br ${member.gradient} flex items-center justify-center`}
                  >
                    <Users className="h-12 w-12 text-primary/60" />
                  </div>
                  <div className="flex-1 p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-primary font-medium">{member.role}</p>
                    </div>
                    <p className="text-muted-foreground text-sm leading-6 mb-4">
                      {member.bio}
                    </p>
                    <div className="mb-4">
                      <div className="text-xs text-muted-foreground mb-2">
                        Expertise
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {member.expertise.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Github className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                        <Mail className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Timeline */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Our Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From a simple idea to helping dozens of businesses succeed online.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex items-start gap-6">
                  <div className="w-16 h-16 bg-primary/10 border-4 border-background rounded-full flex items-center justify-center relative z-10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-bold text-primary">
                        {milestone.year}
                      </span>
                      <h3 className="text-xl font-semibold text-foreground">
                        {milestone.title}
                      </h3>
                    </div>
                    <p className="text-muted-foreground leading-6">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We'd love to learn about your business and discuss how we can help
            you succeed online with a fast, secure website.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link to="/contact">Start Your Project</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/portfolio">View Our Work</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
