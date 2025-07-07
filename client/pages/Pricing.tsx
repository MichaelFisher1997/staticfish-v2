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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckCircle, X, Star } from "lucide-react";

export default function Pricing() {
  const features = [
    {
      name: "Static Pages",
      starter: "Up to 5",
      growth: "Up to 15",
      scale: "Unlimited",
    },
    {
      name: "Responsive Design",
      starter: true,
      growth: true,
      scale: true,
    },
    {
      name: "Contact Forms",
      starter: "Basic",
      growth: "Advanced",
      scale: "Custom",
    },
    {
      name: "SEO Optimization",
      starter: "Basic",
      growth: "Advanced",
      scale: "Enterprise",
    },
    {
      name: "Blog & CMS",
      starter: false,
      growth: true,
      scale: true,
    },
    {
      name: "E-commerce",
      starter: false,
      growth: false,
      scale: true,
    },
    {
      name: "Custom Integrations",
      starter: false,
      growth: "Limited",
      scale: "Unlimited",
    },
    {
      name: "Analytics",
      starter: "Basic",
      growth: "Advanced",
      scale: "Enterprise",
    },
    {
      name: "Support Level",
      starter: "Email",
      growth: "Priority Email",
      scale: "24/7 Priority",
    },
    {
      name: "SSL Certificate",
      starter: true,
      growth: true,
      scale: true,
    },
    {
      name: "CDN & Hosting",
      starter: true,
      growth: true,
      scale: true,
    },
    {
      name: "Monthly Backups",
      starter: true,
      growth: "Weekly",
      scale: "Daily",
    },
  ];

  const faqs = [
    {
      question: "What does the one-off fee cover?",
      answer:
        "The one-off fee covers the complete design and development of your website, including all features listed in your chosen package. This includes custom design, responsive development, content migration, SEO setup, and initial launch. You own the website completely after payment.",
    },
    {
      question: "Can I upgrade my plan later?",
      answer:
        "Absolutely! You can upgrade to a higher plan at any time. We'll credit the difference between your current plan and the new plan, and implement the additional features. Downgrades are also possible, though some features may be removed.",
    },
    {
      question: "What is the cancellation policy?",
      answer:
        "You can cancel your hosting at any time with 30 days notice. There are no long-term contracts. If you cancel, you keep your website files and can host them elsewhere. We'll even help you migrate to another hosting provider if needed.",
    },
    {
      question: "How long does it take to build my website?",
      answer:
        "Starter packages typically take 1-2 weeks, Growth packages take 2-3 weeks, and Scale packages take 3-6 weeks depending on complexity. Timeline includes design approval, development, content integration, and testing phases.",
    },
    {
      question: "Do you provide ongoing maintenance?",
      answer:
        "Yes! All hosting plans include basic maintenance like security updates, performance monitoring, and technical support. Higher tiers include content updates, feature additions, and priority support.",
    },
    {
      question: "What if I need custom features not listed?",
      answer:
        "We love custom projects! Contact us to discuss your specific needs. We can provide a custom quote for specialized functionality, integrations, or unique design requirements that go beyond our standard packages.",
    },
  ];

  const renderFeatureValue = (value: any) => {
    if (typeof value === "boolean") {
      return value ? (
        <CheckCircle className="h-5 w-5 text-green-500" />
      ) : (
        <X className="h-5 w-5 text-muted-foreground" />
      );
    }
    return <span className="text-sm text-muted-foreground">{value}</span>;
  };

  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center mb-20">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            Pricing Plans
          </h1>
          <p className="text-xl text-muted-foreground leading-8">
            Simple, transparent pricing that grows with your business. All plans
            include fast hosting, SSL certificates, and ongoing support.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {/* Starter */}
          <Card className="relative border-border">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold">Starter</CardTitle>
              <CardDescription className="text-base">
                Perfect for small businesses
              </CardDescription>
              <div className="mt-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    $999
                  </span>
                  <span className="text-sm text-muted-foreground">one-off</span>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-muted-foreground">
                    + $29/month hosting
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Up to 5 pages</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Responsive design</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Contact form</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Basic SEO</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">SSL certificate</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Email support</span>
                </li>
              </ul>
              <Button asChild className="w-full" variant="outline">
                <Link to="/contact">Get Started</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Growth */}
          <Card className="relative border-primary shadow-lg ring-1 ring-primary/20">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-1 bg-primary text-primary-foreground text-sm font-medium px-4 py-1.5 rounded-full">
                <Star className="h-3 w-3" />
                Most Popular
              </div>
            </div>
            <CardHeader className="text-center pb-8 pt-8">
              <CardTitle className="text-2xl font-bold">Growth</CardTitle>
              <CardDescription className="text-base">
                Ideal for growing businesses
              </CardDescription>
              <div className="mt-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    $1,999
                  </span>
                  <span className="text-sm text-muted-foreground">one-off</span>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-muted-foreground">
                    + $49/month hosting
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Everything in Starter</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Up to 15 pages</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Blog & CMS</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Advanced SEO</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Analytics integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Priority support</span>
                </li>
              </ul>
              <Button asChild className="w-full">
                <Link to="/contact">Get Started</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Scale */}
          <Card className="relative border-border">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl font-bold">Scale</CardTitle>
              <CardDescription className="text-base">
                For enterprise needs
              </CardDescription>
              <div className="mt-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold text-foreground">
                    $3,999
                  </span>
                  <span className="text-sm text-muted-foreground">one-off</span>
                </div>
                <div className="mt-2">
                  <span className="text-sm text-muted-foreground">
                    + $99/month hosting
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Everything in Growth</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Unlimited pages</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">E-commerce integration</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Custom integrations</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Enterprise analytics</span>
                </li>
                <li className="flex items-center gap-3">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">24/7 priority support</span>
                </li>
              </ul>
              <Button asChild className="w-full" variant="outline">
                <Link to="/contact">Get Started</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Feature Comparison Table */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Feature Comparison
            </h2>
            <p className="text-lg text-muted-foreground">
              Compare all features across our three packages
            </p>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-6 font-semibold text-foreground">
                      Features
                    </th>
                    <th className="text-center p-6 font-semibold text-foreground">
                      Starter
                    </th>
                    <th className="text-center p-6 font-semibold text-foreground bg-primary/5">
                      Growth
                    </th>
                    <th className="text-center p-6 font-semibold text-foreground">
                      Scale
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr
                      key={index}
                      className="border-b border-border last:border-b-0"
                    >
                      <td className="p-6 font-medium text-foreground">
                        {feature.name}
                      </td>
                      <td className="p-6 text-center">
                        {renderFeatureValue(feature.starter)}
                      </td>
                      <td className="p-6 text-center bg-primary/5">
                        {renderFeatureValue(feature.growth)}
                      </td>
                      <td className="p-6 text-center">
                        {renderFeatureValue(feature.scale)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about our pricing and services
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-7 pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team is here to help you choose the right package and answer any
            questions about our services.
          </p>
          <Button asChild size="lg">
            <Link to="/contact">Contact Us Today</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
