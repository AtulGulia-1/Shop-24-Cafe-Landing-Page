import { MapPin, Phone, Camera, MessageCircle } from "lucide-react";

export default function LocationSection() {
  return (
    <section className="bg-brand-dark min-h-screen w-full flex flex-col md:flex-row border-t border-white/10 relative z-10">
      
      {/* Left Column - Contact Details */}
      <div className="w-full md:w-1/2 p-10 md:p-24 flex flex-col justify-center">
        <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 text-white">
          VISIT <span className="text-brand-lime">US.</span>
        </h3>
        
        <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-md leading-relaxed">
          Experience the finest coffee right in the heart of Bahadurgarh. Open 24/7 for all your cravings. Whether you need an early morning boost, a midday escape, or a late-night chill spot, Shop 24 Seven Cafe is your ultimate destination for explosive flavor and premium vibes.
        </p>

        <div className="space-y-8">
          <div className="flex items-center group cursor-pointer">
            <div className="bg-white/5 p-4 rounded-full mr-6 group-hover:bg-brand-lime transition-colors">
              <MapPin className="w-8 h-8 text-brand-lime group-hover:text-brand-dark transition-colors" />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Location</p>
              <p className="text-white text-xl">Bahadurgarh, Haryana</p>
            </div>
          </div>

          <a href="tel:+919899888611" className="flex items-center group cursor-pointer hover:opacity-80 transition-opacity">
            <div className="bg-white/5 p-4 rounded-full mr-6 group-hover:bg-brand-lime transition-colors">
              <Phone className="w-8 h-8 text-brand-lime group-hover:text-brand-dark transition-colors" />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Phone</p>
              <p className="text-white text-xl">+91 9899888611</p>
            </div>
          </a>

          <a href="https://wa.me/919899888611" target="_blank" rel="noopener noreferrer" className="flex items-center group cursor-pointer hover:opacity-80 transition-opacity">
            <div className="bg-white/5 p-4 rounded-full mr-6 group-hover:bg-brand-lime transition-colors">
              <MessageCircle className="w-8 h-8 text-brand-lime group-hover:text-brand-dark transition-colors" />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">WhatsApp</p>
              <p className="text-white text-xl">+91 9899888611</p>
            </div>
          </a>

          <a href="https://instagram.com/shop24seven.cafebahadurgarh" target="_blank" rel="noopener noreferrer" className="flex items-center group cursor-pointer hover:opacity-80 transition-opacity">
            <div className="bg-white/5 p-4 rounded-full mr-6 group-hover:bg-brand-lime transition-colors">
              <Camera className="w-8 h-8 text-brand-lime group-hover:text-brand-dark transition-colors" />
            </div>
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-1">Instagram</p>
              <p className="text-white text-base sm:text-xl break-all sm:break-normal">@shop24seven.cafebahadurgarh</p>
            </div>
          </a>
        </div>

        <div className="mt-16 flex flex-col sm:flex-row gap-6">
          <a 
            href="https://maps.app.goo.gl/nfUPxydqsYXxgYV58?g_st=ic" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block text-center bg-transparent border-2 border-brand-lime text-brand-lime hover:bg-brand-lime hover:text-black font-bold text-lg md:text-xl px-10 py-5 rounded-full transition-all hover:scale-105 active:scale-95"
          >
            GET DIRECTIONS
          </a>
          <a 
            href="/menu.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block text-center bg-brand-lime border-2 border-brand-lime text-black hover:bg-[#a3ff00] hover:border-[#a3ff00] font-bold text-lg md:text-xl px-10 py-5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(145,230,0,0.3)]"
          >
            VIEW MENU
          </a>
        </div>
      </div>

      {/* Right Column - Map */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative bg-[#111]">
        {/* Dark overlay to ensure it blends seamlessly */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay bg-brand-dark/20 z-10" />
        
        <iframe
          title="Google Map Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112102.73177651815!2d76.85244195150531!3d28.673891465203303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0eb305c750b3%3A0xc47e3a968bdff6c8!2sBahadurgarh%2C%20Haryana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
          className="w-full h-full border-0 filter grayscale invert contrast-100 opacity-80 mix-blend-luminosity"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Credit Footer */}
      <div className="absolute bottom-6 w-full flex justify-center z-20 pointer-events-none">
        <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <p className="text-gray-300 text-xs md:text-sm tracking-widest font-mono">
            DESIGNED BY ATUL GULIA <span className="text-red-500">❤️</span>
          </p>
        </div>
      </div>

    </section>
  );
}
