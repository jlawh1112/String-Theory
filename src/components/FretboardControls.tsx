import { TUNINGS } from '../core/tunings';
import './FretboardControls.css';

interface FretboardControlsProps {
    fretCount: number;
    selectedTuning: string;
    onFretCountChange: (count: number) => void;
    onTuningChange: (tuning: string) => void;
}

function FretboardControls({
    fretCount,
    selectedTuning,
    onFretCountChange,
    onTuningChange
}: FretboardControlsProps) {

    return (
        <div className="fretboard-controls">

            <div className="control-group">
                <label htmlFor="tuning">Tuning</label>

                <select
                    id="tuning"
                    value={selectedTuning}
                    onChange={e => onTuningChange(e.target.value)}
                >
                    {Object.keys(TUNINGS).map(tuning => (
                        <option key={tuning} value={tuning}>
                            {tuning}
                        </option>
                    ))}
                </select>
            </div>

            <div className="control-group">
                <label htmlFor="fret-count">Fret count</label>

                <select
                    id="fret-count"
                    value={fretCount}
                    onChange={e =>
                        onFretCountChange(Number(e.target.value))
                    }
                >
                    {[12, 15, 19, 21, 22, 24].map(count => (
                        <option key={count} value={count}>
                            {count} frets
                        </option>
                    ))}
                </select>
            </div>

        </div>
    );
}

export default FretboardControls;