import { useState } from 'react';
import Fretboard from '../components/Fretboard';
import FretboardControls from '../components/FretboardControls';
import { TUNINGS } from '../core/tunings';
import { NOTES } from '../core/notes';
import { getScaleNotes } from '../core/scales';
import ScaleSelector from '../components/ScaleSelector';
import PositionControls from '../components/PositionControls';

function FretboardExplorer() {

    const [fretCount, setFretCount] = useState(24);
    const [selectedTuning, setSelectedTuning] =
        useState('Standard');

    const [rootNote, setRootNote] = useState('E');

    const [selectedScale, setSelectedScale] =
        useState('Natural Minor (Aeolian)');

    const scaleNotes = getScaleNotes(
        rootNote,
        selectedScale);

    const [viewMode, setViewMode] =
        useState<'full' | 'position'>('full');

    const [startFret, setStartFret] = useState(5);

    const [positionWidth, setPositionWidth] = useState(5);
    
    function handleFretCountChange(count: number) {
        setFretCount(count);

        setStartFret(previous =>
            Math.min(previous, count - positionWidth + 1)
        );
    }

    function handlePositionWidthChange(width: number) {
        setPositionWidth(width);

        setStartFret(previous =>
            Math.min(previous, fretCount - width + 1)
        );
    }
    return (
        <main className="explorer">
            <h1>Fretboard Explorer</h1>

            <p>
                Explore the relationships between notes,
                scales and chords.
            </p>

            <div className="fretboard-controls">
                <div className="control-group">
                    <label htmlFor="root-note">Root note</label>

                    <select
                        id="root-note"
                        value={rootNote}
                        onChange={e =>
                            setRootNote(e.target.value)
                        }
                    >
                        {NOTES.map(note => (
                            <option key={note} value={note}>
                                {note}
                            </option>
                        ))}
                    </select>
                </div>

                <ScaleSelector
                    selectedScale={selectedScale}
                    onScaleChange={setSelectedScale}
                />
            </div>

            <FretboardControls
                fretCount={fretCount}
                selectedTuning={selectedTuning}
                onFretCountChange={handleFretCountChange}
                onTuningChange={setSelectedTuning}
            />

            <PositionControls
                mode={viewMode}
                startFret={startFret}
                positionWidth={positionWidth}
                fretCount={fretCount}
                onModeChange={setViewMode}
                onStartFretChange={setStartFret}
                onPositionWidthChange={handlePositionWidthChange}
            />

            <Fretboard
                fretCount={fretCount}
                tuning={TUNINGS[selectedTuning]}
                highlightedNotes={scaleNotes}
                rootNote={rootNote}
                position={
                    viewMode === 'position'
                        ? {
                            start: startFret,
                            end: startFret + positionWidth - 1
                        }
                        : undefined
                }
            />
        </main>
    );
}

export default FretboardExplorer;