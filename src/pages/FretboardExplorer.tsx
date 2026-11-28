import { useState } from 'react';

import Fretboard from '../components/Fretboard';
import FretboardControls from '../components/FretboardControls';
import ScaleSelector from '../components/ScaleSelector';
import PositionControls from '../components/PositionControls';

import ExplorerTabs from '../components/ExplorerTabs';
import type { ExplorerMode } from '../components/ExplorerTabs';

import { TUNINGS } from '../core/tunings';
import { NOTES } from '../core/notes';
import { getScaleNotes } from '../core/scales';

function FretboardExplorer() {

    // Explorer mode
    const [activeMode, setActiveMode] =
        useState<ExplorerMode>('scales');

    // Shared fretboard settings
    const [fretCount, setFretCount] = useState(24);

    const [selectedTuning, setSelectedTuning] =
        useState('Standard');

    // Scale settings
    const [rootNote, setRootNote] = useState('E');

    const [selectedScale, setSelectedScale] =
        useState('Natural Minor (Aeolian)');

    // Position settings
    const [viewMode, setViewMode] =
        useState<'full' | 'position'>('full');

    const [startFret, setStartFret] = useState(5);
    const [positionWidth, setPositionWidth] = useState(5);

    // Music theory calculations
    const scaleNotes = getScaleNotes(
        rootNote,
        selectedScale
    );

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
                scales, chords and arpeggios.
            </p>

            <ExplorerTabs
                activeMode={activeMode}
                onModeChange={setActiveMode}
            />

            <div className="explorer-mode-controls">

                {/* Scale-specific controls */}
                {activeMode === 'scales' && (
                    <div className="fretboard-controls">

                        <div className="control-group">
                            <label htmlFor="root-note">
                                Root note
                            </label>

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
                )}

                {/* Chord placeholder */}
                {activeMode === 'chords' && (
                    <div className="explorer-placeholder">
                        <h2>Chord Explorer</h2>
                        <p>Coming soon.</p>
                    </div>
                )}

                {/* Arpeggio placeholder */}
                {activeMode === 'arpeggios' && (
                    <div className="explorer-placeholder">
                        <h2>Arpeggio Explorer</h2>
                        <p>Coming soon.</p>
                    </div>
                )}

                

                {/* Scale-specific position controls */}
                {activeMode === 'scales' && (
                    <PositionControls
                        mode={viewMode}
                        startFret={startFret}
                        positionWidth={positionWidth}
                        fretCount={fretCount}
                        onModeChange={setViewMode}
                        onStartFretChange={setStartFret}
                        onPositionWidthChange={
                            handlePositionWidthChange
                        }
                    />
                )}
            </div>
            {/* Shared fretboard */}
            <Fretboard
                fretCount={fretCount}
                tuning={TUNINGS[selectedTuning]}
                highlightedNotes={
                    activeMode === 'scales'
                    ? scaleNotes
                        : []
                }
                rootNote={rootNote}
                position={
                    activeMode === 'scales' &&
                    viewMode === 'position'
                        ? {
                            start: startFret,
                            end: startFret + positionWidth - 1
                        }
                        : undefined
                }
            />
            
            {/* Shared fretboard controls */}
            <FretboardControls
                fretCount={fretCount}
                selectedTuning={selectedTuning}
                onFretCountChange={handleFretCountChange}
                onTuningChange={setSelectedTuning}
            />

        </main>
    );
}

export default FretboardExplorer;