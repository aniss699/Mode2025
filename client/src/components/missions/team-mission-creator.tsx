
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Users, Plus, Trash2, Edit, DollarSign, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeamRequirement {
  profession: string;
  description: string;
  required_skills: string[];
  estimated_budget: number;
  estimated_days: number;
  min_experience: number;
  is_lead_role: boolean;
  importance: 'high' | 'medium' | 'low';
}

interface TeamMissionCreatorProps {
  onComplete: (missionData: any) => void;
  onCancel: () => void;
}

export function TeamMissionCreator({ onComplete, onCancel }: TeamMissionCreatorProps) {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isTeamMode, setIsTeamMode] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    budget: '',
    location: ''
  });
  const [teamRequirements, setTeamRequirements] = useState<TeamRequirement[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleProceedToTeamBuilder = () => {
    if (!formData.title.trim() || !formData.description.trim()) {
      toast({
        title: "Champs obligatoires manquants",
        description: "Veuillez remplir au moins le titre et la description.",
        variant: "destructive"
      });
      return;
    }

    // Créer une équipe par défaut avec 2 professions suggérées
    const defaultTeam: TeamRequirement[] = [
      {
        profession: 'Chef de projet',
        description: 'Coordination et pilotage du projet',
        required_skills: ['Gestion de projet', 'Communication'],
        estimated_budget: Math.round((formData.budget ? Number(formData.budget) * 0.3 : 1000)),
        estimated_days: 10,
        min_experience: 3,
        is_lead_role: true,
        importance: 'high'
      },
      {
        profession: 'Développeur',
        description: 'Développement technique',
        required_skills: ['JavaScript', 'React', 'Node.js'],
        estimated_budget: Math.round((formData.budget ? Number(formData.budget) * 0.7 : 2000)),
        estimated_days: 15,
        min_experience: 2,
        is_lead_role: false,
        importance: 'high'
      }
    ];

    setTeamRequirements(defaultTeam);
    setStep(3);
    toast({
      title: "Équipe suggérée",
      description: "Vous pouvez modifier, ajouter ou supprimer des rôles selon vos besoins."
    });
  };

  const updateRequirement = (index: number, field: string, value: any) => {
    const updated = [...teamRequirements];
    updated[index] = { ...updated[index], [field]: value };
    setTeamRequirements(updated);
  };

  const removeRequirement = (index: number) => {
    setTeamRequirements(prev => prev.filter((_, i) => i !== index));
  };

  const addCustomRequirement = () => {
    const newReq: TeamRequirement = {
      profession: '',
      description: '',
      required_skills: [],
      estimated_budget: 1000,
      estimated_days: 5,
      min_experience: 1,
      is_lead_role: false,
      importance: 'medium'
    };
    setTeamRequirements(prev => [...prev, newReq]);
  };

  const handleCreateProject = async () => {
    if (teamRequirements.length === 0) {
      toast({
        title: "Équipe vide",
        description: "Veuillez ajouter au moins une profession à votre équipe.",
        variant: "destructive"
      });
      return;
    }

    console.log('🚀 Création projet équipe - Données envoyées:', {
      projectData: { 
        ...formData, 
        isTeamMode: true,
        location: formData.location || 'Remote'
      },
      teamRequirements
    });

    try {
      const response = await fetch('/api/team/create-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          projectData: { 
            title: formData.title,
            description: formData.description,
            category: formData.category || 'Autre',
            budget: formData.budget || '0',
            location: formData.location || 'Remote',
            isTeamMode: true
          },
          teamRequirements: teamRequirements.map(req => ({
            profession: req.profession,
            description: req.description,
            required_skills: req.required_skills,
            estimated_budget: req.estimated_budget,
            estimated_days: req.estimated_days,
            min_experience: req.min_experience,
            is_lead_role: req.is_lead_role,
            importance: req.importance
          }))
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Erreur serveur' }));
        throw new Error(errorData.error || errorData.details || `Erreur ${response.status}`);
      }

      const result = await response.json();
      console.log('📥 Réponse serveur:', result);

      toast({
        title: "Projet créé avec succès !",
        description: `Votre projet a été divisé en ${result.subMissions?.length || teamRequirements.length} missions spécialisées.`
      });
      
      onComplete({ 
        ...formData, 
        isTeamMode: true, 
        teamRequirements,
        projectId: result.project?.id,
        subMissions: result.subMissions
      });
    } catch (error) {
      console.error('❌ Erreur création projet équipe:', error);
      toast({
        title: "Erreur de création",
        description: error instanceof Error ? error.message : "Impossible de créer le projet.",
        variant: "destructive"
      });
    }
  };

  const renderStep1 = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Informations générales
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="title">Titre du projet</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Ex: Développement d'une plateforme e-commerce"
          />
        </div>
        
        <div>
          <Label htmlFor="description">Description détaillée</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Décrivez votre projet en détail..."
            rows={6}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="category">Catégorie</Label>
            <Input
              id="category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              placeholder="Ex: Développement web"
            />
          </div>
          <div>
            <Label htmlFor="budget">Budget total</Label>
            <Input
              id="budget"
              value={formData.budget}
              onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
              placeholder="Ex: 5000€"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="team-mode"
            checked={isTeamMode}
            onCheckedChange={setIsTeamMode}
          />
          <Label htmlFor="team-mode">Mode équipe - Diviser le projet en plusieurs spécialités</Label>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={onCancel}>
            Annuler
          </Button>
          <Button 
            onClick={() => isTeamMode ? handleProceedToTeamBuilder() : onComplete(formData)}
            disabled={!formData.title.trim() || !formData.description.trim()}
          >
            {isTeamMode ? 'Composer l\'équipe' : 'Créer le projet'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card>
      <CardHeader>
        <CardTitle>Composition de l'équipe</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center space-y-4">
          <p className="text-gray-600">
            Définissez les rôles et compétences nécessaires pour votre projet d'équipe.
          </p>
          <p className="text-sm text-gray-500">
            Vous pourrez ajouter, modifier ou supprimer des rôles à l'étape suivante.
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Composition de l'équipe
            <Button variant="outline" size="sm" onClick={addCustomRequirement} data-testid="button-add-role">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter un rôle
            </Button>
          </CardTitle>
          <p className="text-sm text-gray-500 mt-2">
            Personnalisez les rôles selon vos besoins. Vous pouvez modifier les budgets, compétences et durées.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {teamRequirements.map((req, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 flex-1">
                    <Input
                      value={req.profession}
                      onChange={(e) => updateRequirement(index, 'profession', e.target.value)}
                      className="font-semibold"
                      placeholder="Nom de la profession"
                      data-testid={`input-profession-${index}`}
                    />
                    {req.is_lead_role && <Badge variant="secondary">Lead</Badge>}
                    <Badge variant={req.importance === 'high' ? 'destructive' : 'secondary'}>
                      {req.importance}
                    </Badge>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => removeRequirement(index)}
                    data-testid={`button-remove-role-${index}`}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>

                <Textarea
                  value={req.description}
                  onChange={(e) => updateRequirement(index, 'description', e.target.value)}
                  placeholder="Description du rôle..."
                  rows={2}
                  className="mb-3"
                  data-testid={`textarea-description-${index}`}
                />

                <div className="grid grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <Input
                      type="number"
                      value={req.estimated_budget}
                      onChange={(e) => updateRequirement(index, 'estimated_budget', Number(e.target.value))}
                      placeholder="Budget"
                      data-testid={`input-budget-${index}`}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <Input
                      type="number"
                      value={req.estimated_days}
                      onChange={(e) => updateRequirement(index, 'estimated_days', Number(e.target.value))}
                      placeholder="Jours"
                      data-testid={`input-days-${index}`}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={req.min_experience}
                      onChange={(e) => updateRequirement(index, 'min_experience', Number(e.target.value))}
                      placeholder="Exp. (années)"
                      data-testid={`input-experience-${index}`}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mt-3">
                  {req.required_skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          <div className="flex gap-2 mt-6">
            <Button variant="outline" onClick={() => setStep(1)} data-testid="button-back">
              Retour
            </Button>
            <Button onClick={handleCreateProject} data-testid="button-create-team-project">
              Créer le projet équipe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>1</div>
          <div className="h-px bg-gray-300 flex-1"></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}>2</div>
        </div>
        <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
          <span>Informations</span>
          <span>Équipe</span>
        </div>
      </div>

      {step === 1 && renderStep1()}
      {step === 3 && renderStep3()}
    </div>
  );
}
