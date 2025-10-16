import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import type {
  Language,
  StylePreference,
  Occasion,
  BudgetRange,
  MetalType,
} from "../types";
import { translate } from "../utils/translations";
import { celebrities } from "../data/mockData";

interface SurveyScreenProps {
  language: Language;
  onComplete: (answers: {
    stylePreference: StylePreference;
    occasion: Occasion;
    budgetRange: BudgetRange;
    metalPreference: MetalType;
    celebrityChoice: string;
  }) => void;
}

export const SurveyScreen = ({ language, onComplete }: SurveyScreenProps) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{
    stylePreference?: StylePreference;
    occasion?: Occasion;
    budgetRange?: BudgetRange;
    metalPreference?: MetalType;
    celebrityChoice?: string;
  }>({});

  const questions = [
    {
      key: "stylePreference",
      question: translate("survey.q1", language),
      options: [
        { value: "minimal", label: translate("style.minimal", language) },
        { value: "bold", label: translate("style.bold", language) },
        { value: "modern", label: translate("style.modern", language) },
        {
          value: "traditional",
          label: translate("style.traditional", language),
        },
      ],
    },
    {
      key: "occasion",
      question: translate("survey.q2", language),
      options: [
        { value: "daily", label: translate("occasion.daily", language) },
        { value: "work", label: translate("occasion.work", language) },
        { value: "party", label: translate("occasion.party", language) },
        { value: "wedding", label: translate("occasion.wedding", language) },
        { value: "gift", label: translate("occasion.gift", language) },
        { value: "festive", label: translate("occasion.festive", language) },
      ],
    },
    {
      key: "budgetRange",
      question: translate("survey.q3", language),
      options: [
        { value: "<5k", label: translate("budget.low", language) },
        { value: "5k-20k", label: translate("budget.mid", language) },
        { value: "20k-50k", label: translate("budget.high", language) },
        { value: "50k+", label: translate("budget.premium", language) },
      ],
    },
    {
      key: "metalPreference",
      question: translate("survey.q4", language),
      options: [
        { value: "gold", label: translate("metal.gold", language) },
        { value: "rose-gold", label: translate("metal.rose-gold", language) },
        { value: "silver", label: translate("metal.silver", language) },
        { value: "platinum", label: translate("metal.platinum", language) },
      ],
    },
  ];

  const currentQuestion = questions[step];
  const isCelebrityStep = step === questions.length;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.key]: value };
    setAnswers(newAnswers);

    if (step < questions.length) {
      setTimeout(() => setStep(step + 1), 300);
    }
  };

  const handleCelebrityChoice = (celebrityId: string) => {
    const finalAnswers = { ...answers, celebrityChoice: celebrityId };
    setTimeout(() => {
      onComplete(finalAnswers as Required<typeof answers>);
    }, 300);
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 p-8 flex items-center justify-center">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.15),transparent_50%)]" />
      </div>

      <div className="relative z-10 w-full max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="ml-auto flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all ${
                  i <= step ? "w-12 bg-amber-500" : "w-8 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-16 shadow-2xl">
          {step > 0 && (
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-white/60 hover:text-white text-2xl transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
              {translate("common.back", language)}
            </button>
          )}
          {!isCelebrityStep ? (
            <div className="animate-fade-in">
              <h2 className="text-5xl font-light text-white mb-16 text-center">
                {currentQuestion.question}
              </h2>

              <div className="grid grid-cols-2 gap-6">
                {currentQuestion.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(option.value)}
                    className="group relative bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/50 rounded-2xl p-12 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="text-3xl text-white font-light">
                      {option.label}
                    </span>
                    <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-fade-in">
              <h2 className="text-5xl font-light text-white mb-16 text-center">
                {translate("survey.q5", language)}
              </h2>

              <div className="grid grid-cols-2 gap-8">
                {celebrities.map((celebrity) => (
                  <button
                    key={celebrity.id}
                    onClick={() => handleCelebrityChoice(celebrity.id)}
                    className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.05] active:scale-[0.98]"
                  >
                    <img
                      src={celebrity.imageUrl}
                      alt={
                        language === "en" ? celebrity.name : celebrity.nameHi
                      }
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-left">
                      <h3 className="text-3xl font-light text-white mb-2">
                        {language === "en" ? celebrity.name : celebrity.nameHi}
                      </h3>
                      <p className="text-xl text-amber-400">
                        {language === "en" ? celebrity.vibe : celebrity.vibeHi}
                      </p>
                    </div>
                    <div className="absolute inset-0 border-4 border-transparent group-hover:border-amber-500 rounded-2xl transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
