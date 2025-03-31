export interface MapTheme {
    mapThemeId: string;
    name: string;
    description?: string | null;
    mapStyle: string;
    previewUrl: string;
    isPremium: boolean;
    createdAt: Date;
}