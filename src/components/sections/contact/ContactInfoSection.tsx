import { Icon } from "@iconify/react";
import { FadeUp } from "@/components/animations";

const CONTACT_CHANNELS = [
  {
    icon: "solar:letter-bold-duotone",
    iconColor: "text-accent",
    bgColor: "bg-accent/10",
    title: "Email Us",
    subtitle: "Our team will respond within 24 hours",
    items: [
      { label: "General & Support", value: "support@zaby.io", href: "mailto:support@zaby.io" },
      { label: "Sales", value: "sales@zaby.io", href: "mailto:sales@zaby.io" },
      { label: "Partnerships", value: "partners@zaby.io", href: "mailto:partners@zaby.io" },
    ],
    note: null,
  },
  {
    icon: "solar:phone-bold-duotone",
    iconColor: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    title: "Call Us",
    subtitle: "Speak with our team directly",
    items: [
      { label: null, value: "+91-8523871114", href: "tel:+918523871114" },
    ],
    note: "Monday – Friday, 9 AM – 6 PM IST",
  },
  {
    icon: "solar:map-point-bold-duotone",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-500/10",
    title: "Visit Us",
    subtitle: "Our headquarters",
    items: [
      {
        label: null,
        value: "Plot No.25, Srujana, Lakshmi Nagar Colony, Ameenpur, Ramachandrapuram, Medak – 502032, Telangana, India",
        href: "https://maps.google.com/?q=Ameenpur,Ramachandrapuram,Medak,Telangana",
      },
    ],
    note: null,
  },
] as const;

export function ContactInfoSection() {
  return (
    <section className="relative py-16 md:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <FadeUp>
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
              Contact{" "}
              <span className="bg-linear-to-br from-accent via-[#c026d3] to-accent-soft bg-clip-text text-transparent">
                Information
              </span>
            </h2>
            <p className="mt-3 text-base font-light text-text-secondary">
              Choose the best way to reach us based on your needs.
            </p>
          </div>
        </FadeUp>

        {/* Cards */}
        <div className="grid gap-5 md:grid-cols-3">
          {CONTACT_CHANNELS.map((channel) => (
            <FadeUp key={channel.title}>
              <div className="flex h-full flex-col rounded-2xl border border-white/60 bg-white/60 p-6 backdrop-blur-md transition-shadow duration-200 hover:shadow-lg hover:shadow-purple-100/30">
                {/* Icon + Title */}
                <div className="mb-4 flex items-start gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${channel.bgColor}`}
                  >
                    <Icon
                      icon={channel.icon}
                      width={20}
                      height={20}
                      className={channel.iconColor}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary">
                      {channel.title}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {channel.subtitle}
                    </p>
                  </div>
                </div>

                {/* Divider */}
                <div className="my-3 border-t border-white/60" />

                {/* Items */}
                <div className="flex flex-col gap-2">
                  {channel.items.map((item) => (
                    <div key={item.value} className="flex flex-col gap-0.5">
                      {item.label && (
                        <span className="text-xs font-medium text-text-secondary/70">
                          {item.label}:
                        </span>
                      )}
                      <a
                        href={item.href}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="wrap-break-word text-sm font-medium text-accent transition-colors hover:text-accent/80"
                      >
                        {item.value}
                      </a>
                    </div>
                  ))}
                </div>

                {/* Note badge */}
                {channel.note && (
                  <div className="mt-4 rounded-lg bg-white/50 px-3 py-2 text-xs text-text-secondary">
                    {channel.note}
                  </div>
                )}
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
