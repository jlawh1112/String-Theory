export const NOTES = [
    'C', 'C#', 'D', 'D#',
    'E', 'F', 'F#', 'G',
    'G#', 'A', 'A#', 'B'
] as const;

export type Note = typeof NOTES[number];

export function getNoteIndex(note: string): number {
    const index = NOTES.findIndex(n => n === note);

    if (index === -1) {
        throw new Error(`Invalid note: ${note}`);
    }

    return index;
}

export function getNoteAtFret(
    openString: string,
    fret: number
): Note {
    const openIndex = getNoteIndex(openString);

    return NOTES[(openIndex + fret) % 12];
}

export function getInterval(
    root: string,
    note: string
): number {
    return (
        getNoteIndex(note) -
        getNoteIndex(root) + 12
    ) % 12;
}