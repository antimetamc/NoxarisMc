import { base44 } from "@/api/base44Client";
import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

const ROLES = ["Moderatore", "Helper", "Developer", "Builder", "Content Creator"];

const EMPTY = { name: "", requested_role: "", experience: "" };

export default function StaffApplication() {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.requested_role || !form.experience.trim()) {
      setError("Compila tutti i campi prima di inviare la candidatura.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await base44.entities.StaffApplication.create({
        name: form.name.trim(),
        requested_role: form.requested_role,
        experience: form.experience.trim(),
        status: "pending",
      });
      setForm(EMPTY);
      setSubmitted(true);
    } catch {
      setError("Qualcosa è andato storto. Riprova tra poco.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="staff" className="relative py-24 sm:py-32 bg-gradient-to-b from-[#1A0B2E] to-[#0F0A1A] overflow-hidden">
      <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-[#4C1D95]/15 blur-[120px] pointer-events-none" />

      <div className="relative max-w-3xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold tracking-[0.3em] text-[#C084FC] uppercase">Candidature</span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-extrabold text-white">
            Entra nello <span className="text-[#C084FC]">Staff</span>
          </h2>
          <p className="mt-4 text-[#E0D4FF]/80 max-w-xl mx-auto">
            Ti piacerebbe far parte del team di NoxarisMc? Compila il modulo: valuteremo ogni candidatura con
            attenzione.
          </p>
        </div>

        <div className="p-6 sm:p-8 rounded-2xl border border-[#4C1D95]/40 bg-[#1A0B2E]/60 backdrop-blur-sm">
          {submitted ? (
            <div className="text-center py-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#8B5CF6]/15 border border-[#8B5CF6]/50 mb-5 glow-purple">
                <CheckCircle2 className="text-[#C084FC]" size={30} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Candidatura inviata!</h3>
              <p className="text-[#E0D4FF]/80 mb-6">
                Grazie per il tuo interesse. Lo Staff esaminerà la tua richiesta e ti contatterà su Discord.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                className="bg-[#8B5CF6] hover:bg-[#A855F7] text-white"
              >
                Invia un'altra candidatura
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[#E0D4FF]">Nome (IGN / Nickname)</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Il tuo nome in gioco"
                  className="bg-[#0F0A1A]/60 border-[#4C1D95]/50 text-white placeholder:text-[#E0D4FF]/40"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#E0D4FF]">Ruolo richiesto</Label>
                <Select
                  value={form.requested_role}
                  onValueChange={(v) => update("requested_role", v)}
                >
                  <SelectTrigger className="bg-[#0F0A1A]/60 border-[#4C1D95]/50 text-white">
                    <SelectValue placeholder="Seleziona un ruolo" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1A0B2E] border-[#4C1D95]/50 text-white">
                    {ROLES.map((r) => (
                      <SelectItem key={r} value={r} className="focus:bg-[#8B5CF6]/20 focus:text-white">
                        {r}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience" className="text-[#E0D4FF]">Esperienza precedente</Label>
                <Textarea
                  id="experience"
                  value={form.experience}
                  onChange={(e) => update("experience", e.target.value)}
                  placeholder="Raccontaci la tua esperienza su altri server o progetti..."
                  rows={5}
                  className="bg-[#0F0A1A]/60 border-[#4C1D95]/50 text-white placeholder:text-[#E0D4FF]/40 resize-none"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-sm text-[#FCA5A5]">
                  <AlertCircle size={16} />
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#8B5CF6] hover:bg-[#A855F7] text-white font-semibold glow-purple"
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 animate-spin" size={18} />
                    Invio in corso...
                  </>
                ) : (
                  <>
                    <UserPlus className="mr-2" size={18} />
                    Invia candidatura
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}