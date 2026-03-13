import { Button } from "@/app/_components/ui/Button";
import Input from "@/app/_components/ui/Input";
import { contact } from "@/constants/home";

export default function ContactPage() {
  return (
    <div id="contact-section" className="container p-4 md:py-32">
      <div className="text-center mb-5 md:mb-16">
        <h2 className="text-2xl md:text-5xl text-text font-bold mb-3 md:mb-8">
          Contact Dream Future
        </h2>
        <p className="md:text-xl leading-5 md:leading-6 px-3">
          Have any questions or suggestions? Feel free to contact us.
        </p>
      </div>

      {/* Contact Section */}
      <section className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>

          {contact.map((contact) => (
            <div
              key={contact.label}
              className="p-5 rounded-xl border border-primary"
            >
              <p className="text-gray-400">{contact.label}</p>
              <p>{contact.info}</p>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="p-8 rounded-2xl border border-primary">
          <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>

          <form className="space-y-4">
            <Input
              type="text"
              placeholder="Full Name"
              className="w-full p-3"
            />

            <Input
              type="email"
              placeholder="Email Address"
              className="w-full p-3"
            />

            <Input
              type="text"
              placeholder="Phone Number"
              className="w-full p-3"
            />

            <Input
              type="text"
              placeholder="Subject"
              className="w-full p-3"
            />

            <textarea
              rows={4}
              placeholder="Your Message"
              className="w-full p-3 rounded-lg border border-gray-700"
            ></textarea>

            <Button
              type="submit"
              className="w-full py-3"
            >
              Send Message
            </Button>
          </form>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Our Location
        </h2>

        <div className="w-full h-87.5 rounded-xl overflow-hidden border border-gray-800">
          <iframe
            src="https://maps.google.com/maps?q=jatrabari&t=&z=13&ie=UTF8&iwloc=&output=embed"
            className="w-full h-full"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
