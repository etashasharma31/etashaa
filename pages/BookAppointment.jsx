import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 'bridal-consultation',
    icon: 'spa',
    title: 'Bridal Consultation',
    desc: 'One-on-one session with our lead designer to curate your complete bridal trousseau.',
    duration: '90 min',
    price: 'Complimentary'
  },
  {
    id: 'custom-fitting',
    icon: 'straighten',
    title: 'Custom Fitting',
    desc: 'Precision measurements and personalized fitting for your bespoke Etashaa creation.',
    duration: '60 min',
    price: 'Complimentary'
  },
  {
    id: 'trousseau-planning',
    icon: 'calendar_month',
    title: 'Trousseau Planning',
    desc: 'Full wedding outfit planning across all functions — Haldi, Mehendi, Sangeet & Wedding.',
    duration: '120 min',
    price: 'Complimentary'
  },
  {
    id: 'virtual-consultation',
    icon: 'videocam',
    title: 'Virtual Consultation',
    desc: 'Connect with our designers from anywhere in the world via video call.',
    duration: '45 min',
    price: 'Complimentary'
  }
];

const timeSlots = [
  '10:00 AM', '11:00 AM', '12:00 PM',
  '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
];

const testimonials = [
  {
    name: 'Aastha Rajput',
    role: 'Bride, December 2024',
    image: '/images/brides_01_aastha_rajput_becoming_lehenga_A.jpg',
    quote: 'The consultation experience was magical. They understood my vision instantly and created something beyond my dreams.'
  },
  {
    name: 'Komal Ghugare',
    role: 'Bride, November 2024',
    image: '/images/brides_02_komal_ghugare_flare_lehenga_A.jpg',
    quote: 'From the very first appointment, I felt like royalty. Every detail was perfected with such love and care.'
  },
  {
    name: 'Meghna Mahajan',
    role: 'Bride, October 2024',
    image: '/images/brides_07_meghna_mahajan_custom_lehenga_A.jpg',
    quote: 'My custom lehenga was a masterpiece. The fitting sessions were a joy — they truly listened to every wish.'
  }
];

const BookAppointment = () => {
  const [selectedService, setSelectedService] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', weddingDate: '', message: '', mode: 'In-Person' });
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedService || !selectedSlot || !selectedDate) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const canProceed = () => {
    if (step === 1) return selectedService !== '';
    if (step === 2) return selectedDate !== '' && selectedSlot !== '';
    if (step === 3) return form.name && form.email && form.phone;
    return true;
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-surface flex items-center justify-center px-4 pt-24">
        <div className="text-center max-w-lg mx-auto">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8 animate-pulse">
            <span className="material-symbols-outlined text-5xl text-primary">favorite</span>
          </div>
          <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-4 block">Confirmed</span>
          <h1 className="font-noto-serif text-4xl italic mb-6 text-on-surface">Your Appointment is Booked</h1>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-4 font-jakarta-sans">
            Thank you, <strong>{form.name}</strong>. We've reserved your <strong>{services.find(s => s.id === selectedService)?.title}</strong> on <strong>{selectedDate}</strong> at <strong>{selectedSlot}</strong>.
          </p>
          <p className="text-on-surface-variant text-sm leading-relaxed mb-10 font-jakarta-sans">
            A confirmation will be sent to <strong>{form.email}</strong>. Our team will reach out within 24 hours to confirm your appointment.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-premium">
              <span>Back to Home</span>
            </Link>
            <Link to="/bridal-collection" className="btn-premium-outline">
              <span>Explore Collections</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-surface">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden flex items-end">
        <img
          src="/images/brides_07_meghna_mahajan_custom_lehenga_B.jpg"
          alt="Book an Appointment"
          className="absolute inset-0 w-full h-full object-cover object-top scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a00]/80 via-[#1a0a00]/30 to-transparent" />
        <div className="relative z-10 max-w-custom mx-auto px-6 md:px-12 pb-16 w-full">
          <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary/80 font-bold mb-3 block">Private Atelier</span>
          <h1 className="font-noto-serif text-5xl md:text-6xl italic text-white leading-tight mb-3">
            Book Your Appointment
          </h1>
          <p className="text-white/70 font-jakarta-sans text-sm max-w-lg">
            Begin your bridal journey with a private session at the Etashaa atelier. Every bride deserves her own story.
          </p>
        </div>
      </section>

      {/* Step Indicator */}
      <div className="sticky top-16 z-30 bg-surface/95 backdrop-blur-md border-b border-outline-variant/10">
        <div className="max-w-custom mx-auto px-6 md:px-12 py-4 flex items-center gap-0">
          {['Choose Service', 'Select Date & Time', 'Your Details'].map((label, idx) => {
            const stepNum = idx + 1;
            const isActive = step === stepNum;
            const isDone = step > stepNum;
            return (
              <React.Fragment key={label}>
                <button
                  onClick={() => isDone && setStep(stepNum)}
                  className={`flex items-center gap-3 py-2 transition-all ${isDone ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                    isDone ? 'bg-primary text-white' : isActive ? 'bg-on-surface text-white' : 'bg-outline-variant/20 text-outline'
                  }`}>
                    {isDone ? <span className="material-symbols-outlined text-[14px]">check</span> : stepNum}
                  </div>
                  <span className={`hidden md:block font-jakarta-sans text-[10px] uppercase tracking-widest font-bold transition-colors ${
                    isActive ? 'text-on-surface' : isDone ? 'text-primary' : 'text-outline/50'
                  }`}>{label}</span>
                </button>
                {idx < 2 && <div className={`flex-1 h-px mx-4 transition-all ${step > idx + 1 ? 'bg-primary' : 'bg-outline-variant/20'}`} />}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      <div className="max-w-custom mx-auto px-6 md:px-12 py-16">
        <form onSubmit={handleSubmit}>

          {/* STEP 1: Choose Service */}
          {step === 1 && (
            <div className="animate-fade-in">
              <div className="mb-12">
                <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-2 block">Step 1 of 3</span>
                <h2 className="font-noto-serif text-3xl italic text-on-surface mb-3">Choose Your Service</h2>
                <p className="text-on-surface-variant text-sm font-jakarta-sans">Select the type of appointment that best fits your needs.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map(service => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => setSelectedService(service.id)}
                    className={`text-left p-8 border-2 transition-all duration-300 group relative overflow-hidden ${
                      selectedService === service.id
                        ? 'border-primary bg-primary/5 shadow-lg'
                        : 'border-outline-variant/20 hover:border-primary/40 hover:shadow-md'
                    }`}
                  >
                    {selectedService === service.id && (
                      <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-[14px]">check</span>
                      </div>
                    )}
                    <span className={`material-symbols-outlined text-4xl mb-6 block transition-colors ${selectedService === service.id ? 'text-primary' : 'text-outline/40 group-hover:text-primary/60'}`}>
                      {service.icon}
                    </span>
                    <h3 className="font-noto-serif text-xl italic mb-2 text-on-surface">{service.title}</h3>
                    <p className="text-on-surface-variant text-xs font-jakarta-sans leading-relaxed mb-6">{service.desc}</p>
                    <div className="flex items-center gap-6 text-[10px] uppercase tracking-widest font-jakarta-sans font-bold">
                      <span className="text-outline/60"><span className="material-symbols-outlined text-[14px] mr-1 align-middle">schedule</span>{service.duration}</span>
                      <span className="text-primary">{service.price}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Date & Time */}
          {step === 2 && (
            <div className="animate-fade-in">
              <div className="mb-12">
                <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-2 block">Step 2 of 3</span>
                <h2 className="font-noto-serif text-3xl italic text-on-surface mb-3">Select Date & Time</h2>
                <p className="text-on-surface-variant text-sm font-jakarta-sans">Choose a convenient date and time slot for your appointment.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Date Picker */}
                <div>
                  <label className="font-jakarta-sans text-[10px] uppercase tracking-[0.3em] text-outline font-bold block mb-4">Select Date *</label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={e => setSelectedDate(e.target.value)}
                    className="w-full border border-outline-variant/30 bg-transparent px-5 py-4 font-jakarta-sans text-sm focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                {/* Time Slots */}
                <div>
                  <label className="font-jakarta-sans text-[10px] uppercase tracking-[0.3em] text-outline font-bold block mb-4">Select Time *</label>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedSlot(slot)}
                        className={`py-3 border text-[10px] uppercase tracking-widest font-bold font-jakarta-sans transition-all ${
                          selectedSlot === slot
                            ? 'border-primary bg-primary text-white'
                            : 'border-outline-variant/30 text-on-surface/60 hover:border-primary hover:text-primary'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {/* Mode Selection */}
              <div className="mt-12">
                <label className="font-jakarta-sans text-[10px] uppercase tracking-[0.3em] text-outline font-bold block mb-4">Appointment Mode *</label>
                <div className="flex gap-4">
                  {['In-Person', 'Virtual'].map(mode => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, mode }))}
                      className={`flex items-center gap-3 px-6 py-3 border text-[10px] uppercase tracking-widest font-bold font-jakarta-sans transition-all ${
                        form.mode === mode
                          ? 'border-primary bg-primary text-white'
                          : 'border-outline-variant/30 text-on-surface/60 hover:border-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">{mode === 'In-Person' ? 'location_on' : 'videocam'}</span>
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Personal Details */}
          {step === 3 && (
            <div className="animate-fade-in">
              <div className="mb-12">
                <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-2 block">Step 3 of 3</span>
                <h2 className="font-noto-serif text-3xl italic text-on-surface mb-3">Your Details</h2>
                <p className="text-on-surface-variant text-sm font-jakarta-sans">Tell us a little about yourself so we can prepare for your visit.</p>
              </div>

              {/* Summary Card */}
              <div className="mb-10 p-6 bg-primary/5 border border-primary/20 flex flex-wrap gap-6">
                {[
                  { label: 'Service', value: services.find(s => s.id === selectedService)?.title },
                  { label: 'Date', value: selectedDate },
                  { label: 'Time', value: selectedSlot },
                  { label: 'Mode', value: form.mode }
                ].map(item => (
                  <div key={item.label}>
                    <span className="font-jakarta-sans text-[9px] uppercase tracking-widest text-outline font-bold block mb-1">{item.label}</span>
                    <span className="font-jakarta-sans text-sm text-on-surface font-bold">{item.value}</span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { name: 'name', label: 'Full Name *', type: 'text', placeholder: 'Your full name' },
                  { name: 'email', label: 'Email Address *', type: 'email', placeholder: 'your@email.com' },
                  { name: 'phone', label: 'Phone Number *', type: 'tel', placeholder: '+91 00000 00000' },
                  { name: 'weddingDate', label: 'Wedding Date (Optional)', type: 'date', placeholder: '' }
                ].map(field => (
                  <div key={field.name} className="relative group">
                    <label className="font-jakarta-sans text-[10px] uppercase tracking-[0.3em] text-outline font-bold block mb-3">{field.label}</label>
                    <input
                      name={field.name}
                      type={field.type}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="w-full border border-outline-variant/30 bg-transparent px-5 py-4 font-jakarta-sans text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-outline/40"
                    />
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-focus-within:w-full" />
                  </div>
                ))}
                <div className="md:col-span-2 relative group">
                  <label className="font-jakarta-sans text-[10px] uppercase tracking-[0.3em] text-outline font-bold block mb-3">Special Requests or Vision (Optional)</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Share your bridal vision, color preferences, occasions to dress for..."
                    className="w-full border border-outline-variant/30 bg-transparent px-5 py-4 font-jakarta-sans text-sm focus:outline-none focus:border-primary transition-colors placeholder:text-outline/40 resize-none"
                  />
                  <div className="absolute bottom-0 left-0 w-0 h-px bg-primary transition-all duration-300 group-focus-within:w-full" />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="mt-12 flex items-center justify-between">
            <button
              type="button"
              onClick={() => setStep(s => Math.max(1, s - 1))}
              className={`font-jakarta-sans text-[10px] uppercase tracking-widest font-bold flex items-center gap-2 transition-all hover:text-primary ${step === 1 ? 'invisible' : ''}`}
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span> Back
            </button>
            {step < 3 ? (
              <button
                type="button"
                onClick={() => canProceed() && setStep(s => s + 1)}
                disabled={!canProceed()}
                className={`btn-premium min-w-[200px] transition-all ${!canProceed() ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                <span>Continue</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!canProceed()}
                className={`btn-premium min-w-[200px] !bg-primary transition-all ${!canProceed() ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                <span>Confirm Appointment</span>
                <span className="material-symbols-outlined text-[16px]">favorite</span>
              </button>
            )}
          </div>
        </form>

        {/* Testimonials */}
        <section className="mt-32 pt-16 border-t border-outline-variant/10">
          <div className="text-center mb-14">
            <span className="font-jakarta-sans text-[10px] uppercase tracking-[0.4em] text-primary font-bold mb-3 block">Real Experiences</span>
            <h2 className="font-noto-serif text-3xl italic text-on-surface">Brides Who Visited Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {testimonials.map(t => (
              <div key={t.name} className="group">
                <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <p className="font-noto-serif text-base italic text-on-surface/80 leading-relaxed mb-4">"{t.quote}"</p>
                <div>
                  <span className="font-jakarta-sans text-[11px] font-bold text-on-surface uppercase tracking-widest block">{t.name}</span>
                  <span className="font-jakarta-sans text-[10px] text-primary uppercase tracking-widest">{t.role}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default BookAppointment;
