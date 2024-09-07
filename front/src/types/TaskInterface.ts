export interface TaskInterface {
    startDate: string;   // Date de début sous forme de chaîne de caractères
    dueDate: string;     // Date d'échéance sous forme de chaîne de caractères
    title: string;       // Titre de la tâche
    description: string; // Description de la tâche
    priority: 'high' | 'medium' | 'low'; // Priorité de la tâche
}