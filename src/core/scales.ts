import { NOTES, getNoteIndex } from './notes';

function generateMode(intervals: number[], mode: number): number[] {
    const root = intervals[mode - 1];

    return intervals
        .map(interval => (interval - root + 12) % 12)
        .sort((a, b) => a - b);
}

// Parent scale formulas
const major = [0, 2, 4, 5, 7, 9, 11];
const harmonicMinor = [0, 2, 3, 5, 7, 8, 11];
const melodicMinor = [0, 2, 3, 5, 7, 9, 11];
const harmonicMajor = [0, 2, 4, 5, 7, 8, 11];
const pentatonic = [0, 2, 4, 7, 9];

export const SCALE_CATEGORIES: Record<
    string,
    Record<string, number[]>
> = {
    'Major & Modes': {
        'Major (Ionian)': major,
        'Dorian': generateMode(major, 2),
        'Phrygian': generateMode(major, 3),
        'Lydian': generateMode(major, 4),
        'Mixolydian': generateMode(major, 5),
        'Natural Minor (Aeolian)': generateMode(major, 6),
        'Locrian': generateMode(major, 7)
    },

    'Harmonic Minor': {
        'Harmonic Minor': harmonicMinor,
        'Locrian Natural 6': generateMode(harmonicMinor, 2),
        'Ionian Augmented': generateMode(harmonicMinor, 3),
        'Dorian #4': generateMode(harmonicMinor, 4),
        'Phrygian Dominant': generateMode(harmonicMinor, 5),
        'Lydian #2': generateMode(harmonicMinor, 6),
        'Ultralocrian': generateMode(harmonicMinor, 7)
    },

    'Melodic Minor': {
        'Melodic Minor': melodicMinor,
        'Dorian b2': generateMode(melodicMinor, 2),
        'Lydian Augmented': generateMode(melodicMinor, 3),
        'Lydian Dominant': generateMode(melodicMinor, 4),
        'Mixolydian b6': generateMode(melodicMinor, 5),
        'Locrian Natural 2': generateMode(melodicMinor, 6),
        'Altered': generateMode(melodicMinor, 7)
    },

    'Harmonic Major': {
        'Harmonic Major': harmonicMajor,
        'Dorian b5': generateMode(harmonicMajor, 2),
        'Phrygian b4': generateMode(harmonicMajor, 3),
        'Lydian b3': generateMode(harmonicMajor, 4),
        'Mixolydian b2': generateMode(harmonicMajor, 5),
        'Lydian Augmented #2': generateMode(harmonicMajor, 6),
        'Locrian bb7': generateMode(harmonicMajor, 7)
    },

    'Pentatonic': {
        'Major Pentatonic': pentatonic,
        'Suspended Pentatonic': generateMode(pentatonic, 2),
        'Pentatonic Mode 3': generateMode(pentatonic, 3),
        'Pentatonic Mode 4': generateMode(pentatonic, 4),
        'Minor Pentatonic': generateMode(pentatonic, 5)
    },

    'Blues': {
        'Major Blues': [0, 2, 3, 4, 7, 9],
        'Minor Blues': [0, 3, 5, 6, 7, 10]
    },

    'Symmetrical': {
        'Chromatic': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        'Whole Tone': [0, 2, 4, 6, 8, 10],
        'Half-Whole Diminished': [0, 1, 3, 4, 6, 7, 9, 10],
        'Whole-Half Diminished': [0, 2, 3, 5, 6, 8, 9, 11],
        'Augmented': [0, 3, 4, 7, 8, 11]
    },

    'Other Scales': {
        'Hungarian Minor': [0, 2, 3, 6, 7, 8, 11],
        'Double Harmonic Major': [0, 1, 4, 5, 7, 8, 11],
        'Hirajoshi': [0, 2, 3, 7, 8],
        'Insen': [0, 1, 5, 7, 10],
        'Iwato': [0, 1, 5, 6, 10],
        'Persian': [0, 1, 4, 5, 6, 8, 11],
        'Enigmatic': [0, 1, 4, 6, 8, 10, 11],
        'Neapolitan Major': [0, 1, 3, 5, 7, 9, 11],
        'Neapolitan Minor': [0, 1, 3, 5, 7, 8, 11]
    }
};

// Flatten the categories into one searchable scale collection.
export const SCALES: Record<string, number[]> =
    Object.assign({}, ...Object.values(SCALE_CATEGORIES));

export function getScaleNotes(
    root: string,
    scaleName: string
) {
    const rootIndex = getNoteIndex(root);
    const intervals = SCALES[scaleName];

    if (!intervals) {
        throw new Error(`Invalid scale: ${scaleName}`);
    }

    return intervals.map(
        interval => NOTES[(rootIndex + interval) % 12]
    );
}