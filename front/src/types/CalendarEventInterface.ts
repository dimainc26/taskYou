export interface CalendarEventInterface {
    start: string;      // Date de début formatée en chaîne
    end: string;        // Date de fin formatée en chaîne
    title: string;      // Titre de l'événement
    content: string;    // Description de l'événement
    class?: string;     // Classe CSS optionnelle pour le style
}