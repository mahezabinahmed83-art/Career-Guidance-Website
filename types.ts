export enum AppState {
    ASSESSMENT = 'ASSESSMENT',
    QUIZ = 'QUIZ',
    LOADING = 'LOADING',
    RESULTS = 'RESULTS',
}

export enum LearningStyle {
    VISUAL = 'Visual',
    AUDITORY = 'Auditory',
    KINESTHETIC = 'Kinesthetic',
    READING_WRITING = 'Reading/Writing',
}

export interface UserData {
    interests: string;
    skills: string;
    learningStyle: LearningStyle;
    name: string;
    age: string;
    dreamCareer: string;
    collegePreference: string;
    degreeGoals: string;
    abroadGoals: 'Yes' | 'No' | 'Maybe';
    percentage: string;
    techPreference: string[];
    workEnvironment: string[];
}

export interface LearningResource {
    title: string;
    url: string;
    type: string;
}

export interface LearningStep {
    step: number;
    title: string;
    description: string;
    resources: LearningResource[];
}

export interface CareerPath {
    careerTitle: string;
    justification: string;
    requiredSkills: string[];
    skillGaps: string[];
    learningRoadmap: LearningStep[];
}
