import { useState, useEffect, useRef } from 'react';
import { SCALE_CATEGORIES } from '../core/scales';
import './ScaleSelector.css';

interface ScaleSelectorProps {
    selectedScale: string;
    onScaleChange: (scale: string) => void;
}

function ScaleSelector({
    selectedScale,
    onScaleChange
}: ScaleSelectorProps) {

    const [isOpen, setIsOpen] = useState(false);

    const category = Object.keys(SCALE_CATEGORIES).find(
        name => selectedScale in SCALE_CATEGORIES[name]
    ) ?? 'Major & Modes';

    const containerRef = useRef<HTMLDivElement>(null);

    // Close the panel when clicking outside or pressing Escape.
    useEffect(() => {
        function handleOutsideClick(event: PointerEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        }

        document.addEventListener('pointerdown', handleOutsideClick);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handleOutsideClick);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    function handleCategoryChange(newCategory: string) {
        const firstScale = Object.keys(
            SCALE_CATEGORIES[newCategory]
        )[0];

        onScaleChange(firstScale);
    }

    return (
        <div
            className="scale-selector control-group"
            ref={containerRef}
        >
            <label id="scale-selector-label">Scale</label>

            <button
                type="button"
                className="scale-trigger"
                aria-expanded={isOpen}
                aria-labelledby="scale-selector-label selected-scale"
                aria-controls="scale-panel"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span id="selected-scale">{selectedScale}</span>
                <span aria-hidden="true">
                    {isOpen ? '▴' : '▾'}
                </span>
            </button>

            {isOpen && (
                <div className="scale-panel" id="scale-panel">

                    <div className="control-group">
                        <label htmlFor="scale-category">
                            Scale family
                        </label>

                        <select
                            id="scale-category"
                            value={category}
                            onChange={e =>
                                handleCategoryChange(e.target.value)
                            }
                        >
                            {Object.keys(SCALE_CATEGORIES).map(name => (
                                <option key={name} value={name}>
                                    {name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="control-group">
                        <label htmlFor="scale-option">
                            Scale / Mode
                        </label>

                        <select
                            id="scale-option"
                            value={selectedScale}
                            onChange={e =>
                                onScaleChange(e.target.value)
                            }
                        >
                            {Object.keys(
                                SCALE_CATEGORIES[category]
                            ).map(scale => (
                                <option key={scale} value={scale}>
                                    {scale}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        type="button"
                        className="scale-done"
                        onClick={() => setIsOpen(false)}
                    >
                        Done
                    </button>

                </div>
            )}
        </div>
    );
}

export default ScaleSelector;