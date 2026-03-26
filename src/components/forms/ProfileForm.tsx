import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../ui/Button';
import { StepIndicator } from '../ui/StepIndicator';
import { ProfileStep1 } from './ProfileStep1';
import { ProfileStep2 } from './ProfileStep2';
import { ProfileStep3 } from './ProfileStep3';
import { ProfileStep4 } from './ProfileStep4';
import { ChevronLeft, ChevronRight, Save, CheckCircle } from 'lucide-react';
import { ROUTES } from '../../lib/constants';

const STEPS = [
  { number: 1, title: 'Informations', description: 'Base' },
  { number: 2, title: 'Style de vie', description: 'Passions' },
  { number: 3, title: 'Description', description: 'Bio' },
  { number: 4, title: 'Validation', description: 'Récap' },
];

interface FormData {
  gender: string;
  seeking_gender: string;
  birthdate: string;
  city: string;
  postal_code: string;
  max_distance_km: number;
  relation_type: string;
  want_kids: string;
  smoking: string;
  lifestyle_tags: string[];
  bio: string;
}

export function ProfileForm() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [attestation, setAttestation] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    gender: '',
    seeking_gender: '',
    birthdate: '',
    city: '',
    postal_code: '',
    max_distance_km: 50,
    relation_type: '',
    want_kids: '',
    smoking: '',
    lifestyle_tags: [],
    bio: '',
  });

  useEffect(() => {
    loadProfile();
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .maybeSingle();

    if (data && !error) {
      setFormData({
        gender: data.gender || '',
        seeking_gender: data.seeking_gender || '',
        birthdate: data.birthdate || '',
        city: data.city || '',
        postal_code: data.postal_code || '',
        max_distance_km: data.max_distance_km || 50,
        relation_type: data.relation_type || '',
        want_kids: data.want_kids || '',
        smoking: data.smoking || '',
        lifestyle_tags: data.lifestyle_tags || [],
        bio: data.bio || '',
      });

      const completed: number[] = [];
      if (data.gender && data.seeking_gender && data.birthdate && data.city && data.postal_code) {
        completed.push(1);
      }
      if (data.relation_type && data.want_kids && data.smoking && data.lifestyle_tags?.length >= 2) {
        completed.push(2);
      }
      if (data.bio && data.bio.length >= 50) {
        completed.push(3);
      }
      setCompletedSteps(completed);
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.gender) newErrors.gender = 'Le genre est requis';
      if (!formData.seeking_gender) newErrors.seeking_gender = 'Ce champ est requis';
      if (!formData.birthdate) {
        newErrors.birthdate = 'La date de naissance est requise';
      } else {
        const age = calculateAge(formData.birthdate);
        if (age < 18) {
          newErrors.birthdate = 'Tu dois avoir au moins 18 ans';
        }
      }
      if (!formData.city) newErrors.city = 'La ville est requise';
      if (!formData.postal_code) {
        newErrors.postal_code = 'Le code postal est requis';
      } else if (!/^\d{5}$/.test(formData.postal_code)) {
        newErrors.postal_code = 'Code postal invalide (5 chiffres)';
      }
    }

    if (step === 2) {
      if (!formData.relation_type) newErrors.relation_type = 'Ce champ est requis';
      if (!formData.want_kids) newErrors.want_kids = 'Ce champ est requis';
      if (!formData.smoking) newErrors.smoking = 'Ce champ est requis';
      if (formData.lifestyle_tags.length < 2) {
        newErrors.lifestyle_tags = 'Sélectionne au moins 2 centres d\'intérêt';
      }
    }

    if (step === 3) {
      if (!formData.bio) {
        newErrors.bio = 'La bio est requise';
      } else if (formData.bio.length < 50) {
        newErrors.bio = `Minimum 50 caractères (${formData.bio.length}/50)`;
      }
    }

    if (step === 4) {
      if (!attestation) {
        newErrors.attestation = 'Tu dois attester que les informations sont exactes';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateAge = (birthdate: string): number => {
    const today = new Date();
    const birth = new Date(birthdate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const saveProgress = async () => {
    if (!user) return;

    setSaving(true);
    setSaveMessage('');

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          gender: formData.gender || null,
          seeking_gender: formData.seeking_gender || null,
          birthdate: formData.birthdate || null,
          city: formData.city || null,
          postal_code: formData.postal_code || null,
          max_distance_km: formData.max_distance_km,
          relation_type: formData.relation_type || null,
          want_kids: formData.want_kids || null,
          smoking: formData.smoking || null,
          lifestyle_tags: formData.lifestyle_tags,
          bio: formData.bio || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      setSaveMessage('Enregistré ✓');
      setTimeout(() => setSaveMessage(''), 2000);
    } catch {
      setSaveMessage('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async () => {
    if (!validateStep(currentStep)) return;

    if (!completedSteps.includes(currentStep)) {
      setCompletedSteps([...completedSteps, currentStep]);
    }

    await saveProgress();

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(4) || !user) return;

    setSubmitting(true);

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          gender: formData.gender,
          seeking_gender: formData.seeking_gender,
          birthdate: formData.birthdate,
          city: formData.city,
          postal_code: formData.postal_code,
          max_distance_km: formData.max_distance_km,
          relation_type: formData.relation_type,
          want_kids: formData.want_kids,
          smoking: formData.smoking,
          lifestyle_tags: formData.lifestyle_tags,
          bio: formData.bio,
          is_profile_complete: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);

      if (error) throw error;

      navigate(ROUTES.DASHBOARD);
    } catch {
      setErrors({ submit: 'Erreur lors de la validation du profil' });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ProfileStep1
            data={formData}
            errors={errors}
            onChange={handleFieldChange}
          />
        );
      case 2:
        return (
          <ProfileStep2
            data={formData}
            errors={errors}
            onChange={handleFieldChange}
          />
        );
      case 3:
        return (
          <ProfileStep3
            data={formData}
            errors={errors}
            onChange={handleFieldChange}
          />
        );
      case 4:
        return (
          <ProfileStep4
            data={formData}
            onEditStep={setCurrentStep}
            attestation={attestation}
            onAttestationChange={setAttestation}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <StepIndicator
        steps={STEPS}
        currentStep={currentStep}
        completedSteps={completedSteps}
      />

      <div className="mt-12">
        <div className="bg-primary/50 rounded-xl p-8 border-2 border-secondary">
          {renderStep()}

          {errors.submit && (
            <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 text-sm">{errors.submit}</p>
            </div>
          )}

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-secondary">
            <div>
              {currentStep > 1 && (
                <Button
                  variant="secondary"
                  onClick={handlePrevious}
                  disabled={saving || submitting}
                >
                  <ChevronLeft size={18} className="mr-2" />
                  Précédent
                </Button>
              )}
            </div>

            <div className="flex items-center gap-4">
              {saveMessage && (
                <span className="text-green-400 text-sm font-medium flex items-center gap-2">
                  <CheckCircle size={16} />
                  {saveMessage}
                </span>
              )}

              {currentStep < 4 ? (
                <Button
                  variant="accent"
                  onClick={handleNext}
                  disabled={saving}
                >
                  {saving ? 'Enregistrement...' : 'Suivant'}
                  <ChevronRight size={18} className="ml-2" />
                </Button>
              ) : (
                <Button
                  variant="accent"
                  onClick={handleSubmit}
                  disabled={submitting || !attestation}
                  size="lg"
                >
                  {submitting ? 'Validation...' : 'Valider mon profil'}
                  <Save size={18} className="ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
