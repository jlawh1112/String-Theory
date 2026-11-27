import './Fretboard.css'
import { getNoteAtFret } from '../core/notes';

interface FretboardProps {
    fretCount?: number;
    tuning?: string[];
    highlightedNotes?: readonly string[];
    rootNote?: string;
    position?: {
    start: number;
    end: number;
};
}

function Fretboard({
    fretCount = 24,
    tuning = ['E', 'B', 'G', 'D', 'A', 'E'],
    highlightedNotes = [],
    rootNote = 'E',
    position
}: FretboardProps) {

    const fretWidth = 48;
    const stringSpacing = 32;
    const padding = 40;

    const width = fretCount * fretWidth;
    const height = (tuning.length - 1) * stringSpacing;

    const frets = Array.from(
        { length: fretCount + 1 },
        (_, i) => i
    );

    const markers = [
        3, 5, 7, 9, 12,
        15, 17, 19, 21, 24
    ];

    return (
        <div className="fretboard-container">
            <svg
                className="fretboard"
                viewBox={`0 0 ${width + padding * 2} ${height + padding * 2}`}
            >
                {/* Fretboard background */}
                <rect
                    className="fretboard-surface"
                    x={padding}
                    y={padding - 10}
                    width={width}
                    height={height + 20}
                />

                {/* Fret wires */}
                {frets.map(fret => (
                    <line
                        key={fret}
                        className={fret === 0 ? 'nut' : 'fret'}
                        x1={padding + fret * fretWidth}
                        x2={padding + fret * fretWidth}
                        y1={padding - 10}
                        y2={padding + height + 10}
                    />
                ))}

                {/* Fret numbers */}
                {frets.slice(1).map(fret => (
                    <text
                        key={fret}
                        className="fret-label"
                        x={padding + (fret - 0.5) * fretWidth}
                        y={padding - 22}
                        textAnchor="middle"
                    >
                        {fret}
                    </text>
                ))}

                {/* Fret markers */}
                {markers.filter(fret => fret <= fretCount).map(fret => (
                    <g key={fret}>
                        <circle
                            className="fret-marker"
                            cx={padding + (fret - 0.5) * fretWidth}
                            cy={padding + height + 26}
                            r={3}
                        />

                        {fret % 12 === 0 && (
                            <circle
                                className="fret-marker"
                                cx={padding + (fret - 0.5) * fretWidth}
                                cy={padding + height + 35}
                                r={3}
                            />
                        )}
                    </g>
                ))}

                {/* Strings */}
                {tuning.map((note, index) => (
                    <g key={index}>
                        <line
                            className="guitar-string"
                            x1={padding}
                            x2={padding + width}
                            y1={padding + index * stringSpacing}
                            y2={padding + index * stringSpacing}
                            strokeWidth={1 + index * 0.45}
                        />

                        <text
                            className="string-label"
                            x={padding - 20}
                            y={padding + index * stringSpacing}
                            textAnchor="middle"
                            dominantBaseline="middle"
                        >
                            {note}
                        </text>
                    </g>
                ))}
                {/* Highlighted notes */}
                {tuning.map((openNote, stringIndex) =>
                    frets.map(fret => {
                        const note = getNoteAtFret(openNote, fret);

                        if (!highlightedNotes.includes(note)) {
                            return null;
                        }
                        if (
                            position &&
                            (fret < position.start || fret > position.end)
                        ) {
                            return null;
                        }

                        const x = fret === 0
                            ? padding - 20
                            : padding + (fret - 0.5) * fretWidth;

                        const y = padding + stringIndex * stringSpacing;

                        const isRoot = note === rootNote;

                        return (
                            <g key={`${stringIndex}-${fret}`}>
                                <circle
                                    cx={x}
                                    cy={y}
                                    r={12}
                                    className={
                                        isRoot
                                            ? 'note-circle root-note'
                                            : 'note-circle'
                                    }
                                />

                                <text
                                    x={x}
                                    y={y}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    className={
                                        isRoot
                                            ? 'note-label root-label'
                                            : 'note-label'
                                    }
                                >
                                    {note}
                                </text>
                            </g>
                        );
                    })
                )}
            </svg>
        </div>
    );
}

export default Fretboard;