import { useState } from 'react';
import Fretboard from '../components/Fretboard';
import FretboardControls from '../components/FretboardControls';
import { TUNINGS } from '../core/tunings';

function FretboardExplorer() {

    const [fretCount, setFretCount] = useState(24);
    const [selectedTuning, setSelectedTuning] = useState('Standard');

    return (
        <main className="explorer">
            <h1>Fretboard Explorer</h1>

            <p>
                Explore the relationships between notes,
                scales and chords.
            </p>

            <FretboardControls
                fretCount={fretCount}
                selectedTuning={selectedTuning}
                onFretCountChange={setFretCount}
                onTuningChange={setSelectedTuning}
            />

            <Fretboard
                fretCount={fretCount}
                tuning={TUNINGS[selectedTuning]}
            />
        </main>
    );
}

export default FretboardExplorer;