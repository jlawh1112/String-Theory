import './PositionControls.css';

interface PositionControlsProps {
    mode: 'full' | 'position';
    startFret: number;
    positionWidth: number;
    fretCount: number;

    onModeChange: (mode: 'full' | 'position') => void;
    onStartFretChange: (fret: number) => void;
    onPositionWidthChange: (width: number) => void;
}

function PositionControls({
    mode,
    startFret,
    positionWidth,
    fretCount,
    onModeChange,
    onStartFretChange,
    onPositionWidthChange
}: PositionControlsProps) {

    return (
        <div className="position-controls">

            <div className="view-mode">
                <button
                    className={mode === 'full' ? 'active' : ''}
                    onClick={() => onModeChange('full')}
                    aria-pressed={mode === 'full'}
                >
                    Full Neck
                </button>

                <button
                    className={mode === 'position' ? 'active' : ''}
                    onClick={() => onModeChange('position')}
                    aria-pressed={mode === 'position'}
                >
                    Position
                </button>
            </div>

            {mode === 'position' && (
                <div className="position-settings">

                    <div className="position-range">
                        <label htmlFor="start-fret">
                            Frets {startFret}–{startFret + positionWidth - 1}
                        </label>

                        <input
                            id="start-fret"
                            type="range"
                            min={0}
                            max={fretCount - positionWidth + 1}
                            value={startFret}
                            onChange={e =>
                                onStartFretChange(Number(e.target.value))
                            }
                        />
                    </div>

                    <div className="control-group">
                        <label htmlFor="position-width">
                            Position width
                        </label>

                        <select
                            id="position-width"
                            value={positionWidth}
                            onChange={e =>
                                onPositionWidthChange(Number(e.target.value))
                            }
                        >
                            {[3, 4, 5, 6, 7].map(width => (
                                <option key={width} value={width}>
                                    {width} frets
                                </option>
                            ))}
                        </select>
                    </div>

                </div>
            )}
        </div>
    );
}

export default PositionControls;