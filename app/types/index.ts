export type Exercise = {
    id: string;
    course_id: string;
    next_exercise_id: string | null;
    previous_exercise_id: string | null;
    is_completed: boolean;
    title: string;
    order: number;
    url?: string;
    description?: string;
    hint?: string;
    answers?: {
        id: string;
        answer: string;
        exercise: string;
        resourcetype: string;
    }[];
    lesson: string;
    resourcetype: string;
};

export type Lesson = {
    id: string;
    title: string;
    order: number;
    chapter: string;
    exercises: Exercise[];
};
